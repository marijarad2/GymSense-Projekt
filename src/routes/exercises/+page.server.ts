import { fail } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/db';

export async function load({ locals }: { locals: App.Locals }) {
	try {
		const db = await getDb();

		const exercises = await db
			.collection('exercises')
			.find({})
			.sort({ muscle: 1, name: 1 })
			.toArray();

		let favoriteExercise = null;

		if (locals.user) {
			const user = await db.collection('users').findOne(
				{ _id: new ObjectId(locals.user.id) },
				{ projection: { favoriteExercise: 1 } }
			);

			favoriteExercise = user?.favoriteExercise ?? null;
		}

		return {
			exercises: exercises.map((exercise) => ({
				...exercise,
				_id: exercise._id.toString()
			})),
			favoriteExercise,
			user: locals.user,
			error: null
		};
	} catch (error) {
		console.error('MongoDB Fehler:', error);

		return {
			exercises: [],
			favoriteExercise: null,
			user: locals.user,
			error: error instanceof Error ? error.message : 'Unbekannter Fehler'
		};
	}
}

export const actions = {
	setFavorite: async ({ request, locals }: { request: Request; locals: App.Locals }) => {
		if (!locals.user) {
			return fail(401, { error: 'Du musst angemeldet sein.' });
		}

		const formData = await request.formData();
		const exerciseName = formData.get('exerciseName')?.toString();

		if (!exerciseName) {
			return fail(400, { error: 'Keine Übung ausgewählt.' });
		}

		const db = await getDb();

		await db.collection('users').updateOne(
			{ _id: new ObjectId(locals.user.id) },
			{ $set: { favoriteExercise: exerciseName } }
		);

		return {
			success: true,
			message: `${exerciseName} wurde als Lieblingsübung gespeichert.`
		};
	}
};