import { getDb } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(303, '/login?redirect=/training');
	}

	const db = await getDb();

	const exercises = await db.collection('exercises').find().toArray();

	return {
		exercises: exercises.map((exercise) => ({
			...exercise,
			_id: exercise._id.toString()
		})),
		user: locals.user ?? null
	};
}

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login?redirect=/training');
		}

		const db = await getDb();
		const formData = await request.formData();
		const exercisesRaw = formData.get('exercises');

		if (!exercisesRaw) {
			return fail(400, {
				error: 'Keine Übungen übermittelt.'
			});
		}

		let exercises;

		try {
			exercises = JSON.parse(exercisesRaw.toString());
		} catch {
			return fail(400, {
				error: 'Übungen konnten nicht gelesen werden.'
			});
		}

		const cleanedExercises = exercises
			.map((exercise) => ({
				...exercise,
				sets: (exercise.sets ?? [])
					.map((set) => ({
						weight: Number(set.weight),
						reps: Number(set.reps)
					}))
					.filter((set) => set.weight >= 0 && set.reps > 0)
			}))
			.filter((exercise) => exercise.sets.length > 0);

		if (cleanedExercises.length === 0) {
			return fail(400, {
				error: 'Bitte Gewicht und Wiederholungen eingeben.'
			});
		}

		await db.collection('workouts').insertOne({
			userId: locals.user.id,
			date: new Date(),
			exercises: cleanedExercises
		});

		throw redirect(303, '/progress');
	}
};