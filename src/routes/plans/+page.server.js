import { getDb } from '$lib/server/db';

export async function load({ locals }) {
	const db = await getDb(); 

	const trainingPlans = await db.collection('trainingPlans').find().toArray();

	let workouts = [];

	if (locals.user) {
		workouts = await db
			.collection('workouts')
			.find({ userId: locals.user.id })
			.sort({ date: -1 })
			.limit(10)
			.toArray();
	}

	const recommendation = getPlanRecommendation(workouts);

	return {
		trainingPlans: trainingPlans.map((plan) => ({
			...plan,
			_id: plan._id.toString()
		})),
		recommendation
	};
}

function getPlanRecommendation(workouts) {
	if (!workouts || workouts.length === 0) {
		return {
			type: 'fullbody',
			message: 'Starte mit einem Ganzkörperplan, um eine gute Basis aufzubauen.'
		};
	}

	const allExerciseNames = workouts
		.flatMap((workout) => workout.exercises ?? [])
		.map((exercise) => exercise.name?.toLowerCase() ?? '');

	const legKeywords = ['kniebeugen', 'ausfallschritte', 'beinpresse', 'wadenheben'];
	const pushKeywords = ['bankdrücken', 'schulterdrücken', 'trizeps', 'liegestütz'];
	const pullKeywords = ['rudern', 'kreuzheben', 'latziehen', 'bizeps'];

	const trainedLegs = allExerciseNames.some((name) =>
		legKeywords.some((keyword) => name.includes(keyword))
	);

	const trainedPush = allExerciseNames.some((name) =>
		pushKeywords.some((keyword) => name.includes(keyword))
	);

	const trainedPull = allExerciseNames.some((name) =>
		pullKeywords.some((keyword) => name.includes(keyword))
	);

	if (!trainedLegs) {
		return {
			type: 'legs',
			message: 'Du hast zuletzt wenig Beine trainiert. Empfehlung: Leg Day.'
		};
	}

	if (!trainedPull) {
		return {
			type: 'pull',
			message: 'Dein Rücken wurde zuletzt wenig trainiert. Empfehlung: Pull Day.'
		};
	}

	if (!trainedPush) {
		return {
			type: 'push',
			message: 'Push-Übungen fehlen zuletzt. Empfehlung: Push Day.'
		};
	}

	return {
		type: 'fullbody',
		message: 'Du trainierst bereits ausgeglichen. Empfehlung: Ganzkörpertraining.'
	};
}