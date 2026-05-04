import { getDb } from '$lib/server/db';
import { ObjectId } from 'mongodb';

export async function GET({ params }) {
	try {
		const db = await getDb();

		if (!ObjectId.isValid(params.id)) {
			return new Response(JSON.stringify({ error: 'Ungültige Plan-ID' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const plan = await db.collection('trainingPlans').findOne({
			_id: new ObjectId(params.id)
		});

		if (!plan) {
			return new Response(JSON.stringify({ error: 'Plan nicht gefunden' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		return new Response(
			JSON.stringify({
				...plan,
				_id: plan._id.toString()
			}),
			{
				headers: { 'Content-Type': 'application/json' }
			}
		);
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Serverfehler beim Laden des Plans' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}