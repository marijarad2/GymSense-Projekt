import { getDb } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export async function load({ locals }) {
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
		} catch (error) {
			return fail(400, {
				error: 'Übungen konnten nicht gelesen werden.'
			});
		}

		if (!Array.isArray(exercises) || exercises.length === 0) {
			return fail(400, {
				error: 'Bitte füge mindestens eine Übung hinzu.'
			});
		}

		await db.collection('workouts').insertOne({
			userId: locals.user?.id ?? null,
			date: new Date(),
			exercises
		});

		return {
			message: 'Training erfolgreich gespeichert 💪'
		};
	}
};