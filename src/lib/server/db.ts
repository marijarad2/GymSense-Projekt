import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

if (!MONGODB_URI) {
	throw new Error('MONGODB_URI fehlt');
}

let client;
let clientPromise;

export async function getDb() {
	if (!clientPromise) {
		client = new MongoClient(MONGODB_URI);
		clientPromise = client.connect();
	}

	const connectedClient = await clientPromise;
	return connectedClient.db('gymsense');
}