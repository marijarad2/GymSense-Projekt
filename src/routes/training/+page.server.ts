import { fail, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';

export async function load({ locals }: { locals: App.Locals }) {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const db = await getDb();

	const exercises = await db
		.collection('exercises')
		.find({})
		.sort({ name: 1 })
		.toArray();

	return {
		exercises: exercises.map((exercise) => ({
			id: exercise._id.toString(),
			name: exercise.name,
			muscleGroup: exercise.muscleGroup ?? '',
			videoUrl: exercise.videoUrl ?? ''
		}))
	};
}

export const actions = {
	default: async ({ request, locals }: { request: Request; locals: App.Locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login');
		}

		const formData = await request.formData();
		const exercisesRaw = formData.get('exercises')?.toString();

		if (!exercisesRaw) {
			return fail(400, { error: 'Keine Übungen vorhanden.' });
		}

		const exercises = JSON.parse(exercisesRaw).map((exercise) => ({
	...exercise,
	sets: exercise.sets.map((set) => ({
		weight: Number(set.weight),
		reps: Number(set.reps)
	}))
}));

		if (!exercises.length) {
			return fail(400, { error: 'Bitte mindestens eine Übung hinzufügen.' });
		}

		const db = await getDb();

		await db.collection('workouts').insertOne({
			userId: locals.user.id,
			date: new Date(),
			exercises
		});

		throw redirect(303, '/progress');
	}
};