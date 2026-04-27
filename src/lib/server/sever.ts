import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';

export async function GET() {
	try {
		const db = await getDb();

		const result = await db.collection('test').insertOne({
			message: 'MongoDB Verbindung funktioniert',
			createdAt: new Date()
		});

		return json({
			success: true,
			insertedId: result.insertedId
		});
	} catch (error) {
		console.error(error);
		return json(
			{
				success: false,
				error: 'Verbindung fehlgeschlagen'
			},
			{ status: 500 }
		);
	}
}