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
		{ projection: { favoriteExercise: 1 } }
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

	return {
		user: locals.user,
		totalWorkouts,
		lastWorkoutDate: lastWorkout?.date ?? null,
		favoriteExercise,
		highestWeight,
		personalRecords,
		calendarEntries
	};
}