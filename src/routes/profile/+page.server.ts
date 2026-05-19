import { fail, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/db';

export async function load({ locals }: { locals: App.Locals }) {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const db = await getDb();

	const user = await db.collection('users').findOne(
		{ _id: new ObjectId(locals.user.id) },
		{
			projection: {
				favoriteExercise: 1,
				weeklyGoal: 1,
				healthStepsToday: 1,
				healthStepGoal: 1,
				weeklyStepGoal: 1,
				healthConnected: 1
			}
		}
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
	const mostUsedExercise = [...stats].sort((a, b) => b.count - a.count)[0] ?? null;
	const favoriteExercise = user?.favoriteExercise ?? mostUsedExercise?.name ?? null;

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

	const workoutDaysFromWorkouts = workouts
		.filter((workout) => {
			const workoutDate = new Date(workout.date);
			return workoutDate >= startOfWeek && workoutDate <= today;
		})
		.map((workout) => toDateOnly(new Date(workout.date)));

	const workoutDaysFromCalendar = calendarEntries
		.filter((entry) => {
			const entryDate = new Date(entry.date);
			return entry.type === 'training' && entryDate >= startOfWeek && entryDate <= today;
		})
		.map((entry) => entry.date);

	const workoutDaysThisWeek = new Set([
		...workoutDaysFromWorkouts,
		...workoutDaysFromCalendar
	]);

	const workoutsThisWeek = workoutDaysThisWeek.size;

	const weeklyProgress = {
		current: workoutsThisWeek,
		goal: weeklyGoal,
		percentage: Math.min(Math.round((workoutsThisWeek / weeklyGoal) * 100), 100)
	};

	const workoutDates = workouts.map((workout) =>
		toDateOnly(new Date(workout.date))
	);

	const calendarTrainingDates = calendarEntries
		.filter((entry) => entry.type === 'training')
		.map((entry) => entry.date);

	const trainingDates = [
		...new Set([...workoutDates, ...calendarTrainingDates])
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

			tempStreak = diffDays === 1 ? tempStreak + 1 : 1;
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
		smartHint,

		healthStepsToday: user?.healthStepsToday ?? 4200,
		healthStepGoal: user?.healthStepGoal ?? 8000,
		weeklyStepGoal: user?.weeklyStepGoal ?? 56000,
		healthConnected: user?.healthConnected ?? false
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
	},

	updateHealth: async ({ request, locals }) => {
		if (!locals.user) return;

		const formData = await request.formData();

		const stepsToday = Number(formData.get('stepsToday'));
		const stepGoal = Number(formData.get('stepGoal'));
		const weeklyStepGoal = Number(formData.get('weeklyStepGoal'));

		if (
			Number.isNaN(stepsToday) ||
			Number.isNaN(stepGoal) ||
			Number.isNaN(weeklyStepGoal) ||
			stepsToday < 0 ||
			stepGoal < 1000 ||
			weeklyStepGoal < 5000
		) {
			return fail(400, {
				error: 'Bitte gültige Schrittwerte eingeben.'
			});
		}

		const db = await getDb();

		await db.collection('users').updateOne(
			{ _id: new ObjectId(locals.user.id) },
			{
				$set: {
					healthStepsToday: stepsToday,
					healthStepGoal: stepGoal,
					weeklyStepGoal
				}
			}
		);

		return {
			success: true,
			message: 'Schritte und Ziele wurden gespeichert.'
		};
	},

	connectHealth: async ({ locals }) => {
		if (!locals.user) return;

		const db = await getDb();

		await db.collection('users').updateOne(
			{ _id: new ObjectId(locals.user.id) },
			{
				$set: {
					healthConnected: true,
					healthStepsToday: 9374
				}
			}
		);

		return {
			success: true,
			message: 'Apple Health wurde im Prototyp verbunden.'
		};
	}
};