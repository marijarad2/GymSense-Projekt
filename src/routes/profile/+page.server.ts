import { redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/db';

export async function load({ locals }: { locals: App.Locals }) {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const db = await getDb();

	const user = await db.collection('users').findOne(
		{ _id: new ObjectId(locals.user.id) },
		{ projection: { favoriteExercise: 1, weeklyGoal: 1 } }
	);

	const workouts = await db
		.collection('workouts')
		.find({ userId: locals.user.id })
		.sort({ date: -1 })
		.toArray();

	const calendarEntriesRaw = await db
		.collection('calendarEntries')
		.find({ userId: locals.user.id })
		.toArray();

	const calendarEntries = calendarEntriesRaw.map((entry) => ({
		id: entry._id.toString(),
		userId: entry.userId,
		date: entry.date,
		type: entry.type,
		note: entry.note ?? ''
	}));

	const totalWorkouts = workouts.length;
	const lastWorkout = workouts[0] ?? null;

	const exerciseStats = new Map();

	for (const workout of workouts) {
		for (const exercise of workout.exercises ?? []) {
			const current = exerciseStats.get(exercise.name) ?? {
				name: exercise.name,
				count: 0,
				maxWeight: 0
			};

			current.count += 1;

			for (const set of exercise.sets ?? []) {
				const weight = Number(set.weight);

				if (!Number.isNaN(weight) && weight > current.maxWeight) {
					current.maxWeight = weight;
				}
			}

			exerciseStats.set(exercise.name, current);
		}
	}

	const stats = [...exerciseStats.values()];

	const mostUsedExercise =
		[...stats].sort((a, b) => b.count - a.count)[0] ?? null;

	const favoriteExercise =
		user?.favoriteExercise ?? mostUsedExercise?.name ?? null;

	const personalRecords = [...stats]
		.filter((item) => item.maxWeight > 0)
		.sort((a, b) => b.maxWeight - a.maxWeight)
		.slice(0, 5);

	const highestWeight = personalRecords[0] ?? null;

	const today = new Date();

	function toDateOnly(date: Date) {
		return date.toISOString().split('T')[0];
	}

	function getStartOfWeek(date: Date) {
		const d = new Date(date);
		const day = d.getDay();
		const diff = day === 0 ? -6 : 1 - day;

		d.setDate(d.getDate() + diff);
		d.setHours(0, 0, 0, 0);

		return d;
	}

	const weeklyGoal = user?.weeklyGoal ?? 4;
	const startOfWeek = getStartOfWeek(today);

	const workoutDaysThisWeek = new Set(
		workouts
			.filter((workout) => {
				const workoutDate = new Date(workout.date);
				return workoutDate >= startOfWeek && workoutDate <= today;
			})
			.map((workout) => toDateOnly(new Date(workout.date)))
	);

	const workoutsThisWeek = workoutDaysThisWeek.size;

	const weeklyProgress = {
		current: workoutsThisWeek,
		goal: weeklyGoal,
		percentage: Math.min(
			Math.round((workoutsThisWeek / weeklyGoal) * 100),
			100
		)
	};

	const trainingDates = [
		...new Set(workouts.map((workout) => toDateOnly(new Date(workout.date))))
	].sort((a, b) => b.localeCompare(a));

	let currentStreak = 0;
	let checkDate = new Date(today);

	while (trainingDates.includes(toDateOnly(checkDate))) {
		currentStreak++;
		checkDate.setDate(checkDate.getDate() - 1);
	}

	let longestStreak = 0;
	let tempStreak = 0;

	for (let i = 0; i < trainingDates.length; i++) {
		if (i === 0) {
			tempStreak = 1;
		} else {
			const previous = new Date(trainingDates[i - 1]);
			const current = new Date(trainingDates[i]);

			const diffDays =
				(previous.getTime() - current.getTime()) / (1000 * 60 * 60 * 24);

			if (diffDays === 1) {
				tempStreak++;
			} else {
				tempStreak = 1;
			}
		}

		longestStreak = Math.max(longestStreak, tempStreak);
	}

	const lastTrainingDate = trainingDates[0] ? new Date(trainingDates[0]) : null;

	let daysSinceLastTraining = null;

	if (lastTrainingDate) {
		daysSinceLastTraining = Math.floor(
			(today.getTime() - lastTrainingDate.getTime()) / (1000 * 60 * 60 * 24)
		);
	}

	let smartHint =
		'Starte dein erstes Training, damit GymSense dir persönliche Hinweise geben kann.';

	if (totalWorkouts > 0) {
		if (daysSinceLastTraining !== null && daysSinceLastTraining >= 5) {
			smartHint = `Du hast seit ${daysSinceLastTraining} Tagen kein Training eingetragen.`;
		} else if (workoutsThisWeek >= weeklyGoal) {
			smartHint = 'Du hast dein Wochenziel erreicht.';
		} else if (workoutsThisWeek === 0) {
			smartHint = 'Diese Woche noch kein Training.';
		} else {
			smartHint = `${workoutsThisWeek} von ${weeklyGoal} Trainings geschafft.`;
		}
	}

	return {
		user: locals.user,
		totalWorkouts,
		lastWorkoutDate: lastWorkout?.date ?? null,
		favoriteExercise,
		highestWeight,
		personalRecords,
		calendarEntries,
		weeklyProgress,
		currentStreak,
		longestStreak,
		smartHint
	};
}

export const actions = {
	addTraining: async ({ request, locals }) => {
		const formData = await request.formData();
		const date = formData.get('date')?.toString();

		if (!date || !locals.user) return;

		const db = await getDb();

		await db.collection('calendarEntries').updateOne(
			{ userId: locals.user.id, date },
			{
				$set: {
					userId: locals.user.id,
					date,
					type: 'training'
				}
			},
			{ upsert: true }
		);

		return { success: true };
	},

	addRest: async ({ request, locals }) => {
		const formData = await request.formData();
		const date = formData.get('date')?.toString();

		if (!date || !locals.user) return;

		const db = await getDb();

		await db.collection('calendarEntries').updateOne(
			{ userId: locals.user.id, date },
			{
				$set: {
					userId: locals.user.id,
					date,
					type: 'rest'
				}
			},
			{ upsert: true }
		);

		return { success: true };
	},

	addCourse: async ({ request, locals }) => {
		const formData = await request.formData();
		const date = formData.get('date')?.toString();

		if (!date || !locals.user) return;

		const db = await getDb();

		await db.collection('calendarEntries').updateOne(
			{ userId: locals.user.id, date },
			{
				$set: {
					userId: locals.user.id,
					date,
					type: 'course',
					note: 'Gebuchter Kurs'
				}
			},
			{ upsert: true }
		);

		return { success: true };
	},

	updateWeeklyGoal: async ({ request, locals }) => {
		const formData = await request.formData();
		const weeklyGoal = Number(formData.get('weeklyGoal'));

		if (!locals.user) return;
		if (!weeklyGoal || weeklyGoal < 1 || weeklyGoal > 7) return;

		const db = await getDb();

		await db.collection('users').updateOne(
			{ _id: new ObjectId(locals.user.id) },
			{
				$set: { weeklyGoal }
			}
		);

		return { success: true };
	}
};