import { json } from '@sveltejs/kit';
import { seedExercises } from '$lib/server/seedExercises.js';

export async function GET() {
  await seedExercises();

  return json({
    message: 'Exercises inserted successfully'
  });
}