import { getDb } from '$lib/server/db';

export async function load() {
	const db = await getDb();

	const courses = await db.collection('courses').find().sort({ type: 1, name: 1 }).toArray();

	return {
		courses: courses.map((course) => ({
			...course,
			_id: course._id.toString()
		}))
	};
}