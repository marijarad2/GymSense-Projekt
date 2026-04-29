import { getDb } from '$lib/server/db';

export async function load({ locals }) {
	if (!locals.user) {
		return { progressItems: [] };
	}

	const db = await getDb();

	const workouts = await db
		.collection('workouts')
		.find({ userId: locals.user.id })
		.sort({ date: 1 })
		.toArray();

	const exercisesMap = new Map();

	for (const workout of workouts) {
		for (const exercise of workout.exercises ?? []) {
			const bestSet = [...(exercise.sets ?? [])]
	.map((set) => ({
		weight: Number(set.weight),
		reps: Number(set.reps)
	}))
	.filter((set) => !Number.isNaN(set.weight))
	.sort((a, b) => b.weight - a.weight)[0];

			if (!bestSet) continue;

			if (!exercisesMap.has(exercise.exerciseId)) {
				exercisesMap.set(exercise.exerciseId, {
					name: exercise.name,
					entries: []
				});
			}

			exercisesMap.get(exercise.exerciseId).entries.push({
				weight: bestSet.weight,
				date: workout.date
			});
		}
	}

	const progressItems = [...exercisesMap.values()].map((exercise) => {
		const entries = exercise.entries;

		const current = entries.at(-1);
		const previous = entries.at(-2);

		const maxWeight = Math.max(...entries.map((e) => e.weight));

		const difference = previous ? current.weight - previous.weight : 0;

		return {
			name: exercise.name,
			currentWeight: current.weight,
			previousWeight: previous?.weight ?? null,
			difference,
			isPersonalBest: current.weight === maxWeight,
			history: entries.slice(-5)
		};
	});

	return {
		progressItems
	};
}