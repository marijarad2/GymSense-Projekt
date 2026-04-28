import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

const exercises = [
  {
    name: "Bankdrücken",
    muscle: "Brust",
    description: "Lege dich auf eine Flachbank und drücke die Langhantel kontrolliert nach oben.",
    tips: [
      "Schulterblätter zusammenziehen",
      "Füsse fest auf dem Boden",
      "Langsam absenken"
    ],
    video: "https://www.youtube.com/embed/gRVjAtPip0Y"
  },
  {
    name: "Kniebeugen",
    muscle: "Beine",
    description: "Beuge die Knie und senke deinen Körper kontrolliert nach unten.",
    tips: [
      "Rücken gerade halten",
      "Knie nicht über die Zehen schieben",
      "Gewicht auf den Fersen"
    ],
    video: "https://www.youtube.com/embed/aclHkVaku9U"
  },
  {
    name: "Kreuzheben",
    muscle: "Rücken",
    description: "Hebe die Langhantel vom Boden mit geradem Rücken an.",
    tips: [
      "Rücken gerade halten",
      "Hantel nah am Körper führen",
      "Core anspannen"
    ],
    video: "https://www.youtube.com/embed/op9kVnSso6Q"
  },
  {
    name: "Schulterdrücken",
    muscle: "Schultern",
    description: "Drücke die Hanteln über den Kopf nach oben.",
    tips: [
      "Core stabil halten",
      "Nicht ins Hohlkreuz fallen",
      "Kontrollierte Bewegung"
    ],
    video: "https://www.youtube.com/embed/qEwKCR5JCog"
  },
  {
    name: "Bizeps Curls",
    muscle: "Arme",
    description: "Beuge die Arme und hebe die Hanteln Richtung Schulter.",
    tips: [
      "Ellbogen am Körper halten",
      "Nicht schwingen",
      "Langsam absenken"
    ],
    video: "https://www.youtube.com/embed/ykJmrZ5v0Oo"
  },
  {
    name: "Trizeps Dips",
    muscle: "Arme",
    description: "Senke deinen Körper an einer Bank oder Dip-Station ab.",
    tips: [
      "Ellbogen nach hinten",
      "Kontrolliert absenken",
      "Nicht zu tief gehen"
    ],
    video: "https://www.youtube.com/embed/2z8JmcrW-As"
  },
  {
    name: "Plank",
    muscle: "Core",
    description: "Halte deinen Körper in einer geraden Linie auf den Unterarmen.",
    tips: [
      "Bauch anspannen",
      "Nicht durchhängen",
      "Ruhig atmen"
    ],
    video: "https://www.youtube.com/embed/pSHjTRCQxIw"
  },
  {
    name: "Latziehen",
    muscle: "Rücken",
    description: "Ziehe die Stange zur Brust nach unten.",
    tips: [
      "Brust raus",
      "Nicht mit Schwung arbeiten",
      "Langsam zurückführen"
    ],
    video: "https://www.youtube.com/embed/CAwf7n6Luuc"
  }
];

export async function seedExercises() {
  const client = new MongoClient(MONGODB_URI);

  await client.connect();

  const db = client.db('gymsense');

  await db.collection('exercises').deleteMany({});
  await db.collection('exercises').insertMany(exercises);

  await client.close();

  console.log('Exercises inserted');
}