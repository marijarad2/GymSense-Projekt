import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

export async function load() {
  let client;

  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI fehlt in .env');
    }

    client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db('gymsense');

    const exercises = await db
      .collection('exercises')
      .find({})
      .sort({ muscle: 1, name: 1 })
      .toArray();

    return {
      exercises: exercises.map((exercise) => ({
        ...exercise,
        _id: exercise._id.toString()
      })),
      error: null
    };
  } catch (error) {
    console.error('MongoDB Fehler:', error);

    return {
      exercises: [],
      error: error.message
    };
  } finally {
    if (client) {
      await client.close();
    }
  }
}