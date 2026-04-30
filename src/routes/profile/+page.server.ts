export const actions = {
	addTraining: async ({ request, locals }) => {
		const formData = await request.formData();
		const date = formData.get('date')?.toString();

		if (!date) return;

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

		if (!date) return;

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

	updateWeeklyGoal: async ({ request, locals }) => {
		const formData = await request.formData();
		const weeklyGoal = Number(formData.get('weeklyGoal'));

		if (!locals.user) return;
		if (!weeklyGoal || weeklyGoal < 1 || weeklyGoal > 7) return;

		const db = await getDb();

		await db.collection('users').updateOne(
			{ _id: new ObjectId(locals.user.id) },
			{
				$set: {
					weeklyGoal
				}
			}
		);

		return { success: true };
	}
};