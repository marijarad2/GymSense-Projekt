import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

if (!MONGODB_URI) {
	throw new Error('MONGODB_URI fehlt');
}

const client = new MongoClient(MONGODB_URI);
const clientPromise = client.connect();

export async function getDb() {
	const connectedClient = await clientPromise;
	return connectedClient.db('gymsense');
}