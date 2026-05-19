import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/db';

export async function load({ locals }: { locals: App.Locals }) {
	if (!locals.user) {
		return {
			user: null
		};
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

	return {
		user: {
			...locals.user,
			favoriteExercise: user?.favoriteExercise ?? null,
			weeklyGoal: user?.weeklyGoal ?? 4,
			healthStepsToday: user?.healthStepsToday ?? 0,
			healthStepGoal: user?.healthStepGoal ?? 8000,
			weeklyStepGoal: user?.weeklyStepGoal ?? 56000,
			healthConnected: user?.healthConnected ?? false
		}
	};
}