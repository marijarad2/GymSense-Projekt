import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/db';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');
	console.log('SESSION:', session);

	event.locals.user = null;

	if (session && ObjectId.isValid(session)) {
		try {
			const db = await getDb();

			const user = await db.collection('users').findOne(
				{ _id: new ObjectId(session) },
				{ projection: { passwordHash: 0 } }
			);

			if (user) {
				event.locals.user = {
					id: user._id.toString(),
					name: user.firstName
						? `${user.firstName} ${user.lastName ?? ''}`.trim()
						: user.email,
					email: user.email
				};
			}
		} catch (err) {
			console.error('Session konnte nicht geladen werden:', err);
		}
	}

	return resolve(event);
};