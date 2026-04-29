import { getDb } from '$lib/db';

export async function load({ locals }) {
	if (!locals.user) {
		return {
			progressItems: []
		};
	}

	const db = await getDb();

	const workouts = await db
		.collection('workouts')
		.find({
			userId: locals.user.id
		})
		.sort({ date: 1 })
		.toArray();

	return {
		progressItems: calculateProgress(workouts)
	};
}

function calculateProgress(workouts) {
	const exercisesMap = new Map();

	for (const workout of workouts) {
		for (const exercise of workout.exercises ?? []) {
			const bestSet = [...(exercise.sets ?? [])].sort((a, b) => b.weight - a.weight)[0];

			if (!bestSet) continue;

			if (!exercisesMap.has(exercise.exerciseId)) {
				exercisesMap.set(exercise.exerciseId, {
					exerciseId: exercise.exerciseId,
					name: exercise.name,
					entries: []
				});
			}

			exercisesMap.get(exercise.exerciseId).entries.push({
				date: workout.date,
				weight: bestSet.weight,
				reps: bestSet.reps
			});
		}
	}

	return [...exercisesMap.values()].map((exercise) => {
		const entries = exercise.entries;
		const current = entries.at(-1);
		const previous = entries.at(-2);

		const maxWeight = Math.max(...entries.map((entry) => entry.weight));
		const difference = previous ? current.weight - previous.weight : 0;

		return {
			exerciseId: exercise.exerciseId,
			name: exercise.name,
			currentWeight: current.weight,
			previousWeight: previous?.weight ?? null,
			difference,
			reps: current.reps,
			isPersonalBest: current.weight === maxWeight,
			history: entries.slice(-5)
		};
	});
}