<script lang="ts">
  type Exercise = typeof exercises[0];

  const exercises = [
    {
      id: 1,
      name: 'Bankdrücken',
      muscle: 'Brust',
      description:
        'Eine klassische Grundübung für Brust, Schultern und Trizeps. Achte auf eine kontrollierte Ausführung und eine stabile Position auf der Bank.',
      tips: [
        'Schulterblätter nach hinten ziehen',
        'Stange kontrolliert senken',
        'Füsse stabil auf dem Boden halten'
      ],
      video: 'https://www.youtube.com/embed/rT7DgCr-3pg'
    },
    {
      id: 2,
      name: 'Squats',
      muscle: 'Beine',
      description:
        'Squats trainieren Beine und Gesäss und gehören zu den wichtigsten Ganzkörperübungen im Krafttraining.',
      tips: [
        'Rücken gerade halten',
        'Knie in Richtung Zehen führen',
        'Tief und kontrolliert arbeiten'
      ],
      video: 'https://www.youtube.com/embed/ultWZbUMPL8'
    },
    {
      id: 3,
      name: 'Deadlift',
      muscle: 'Rücken',
      description:
        'Der Deadlift stärkt den unteren Rücken, die Beine und den gesamten Körper. Die Technik ist hier besonders wichtig.',
      tips: [
        'Rücken neutral halten',
        'Stange nah am Körper führen',
        'Bewegung aus Hüfte und Beinen starten'
      ],
      video: 'https://www.youtube.com/embed/op9kVnSso6Q'
    },
    {
      id: 4,
      name: 'Shoulder Press',
      muscle: 'Schultern',
      description:
        'Die Shoulder Press trainiert vor allem die Schultermuskulatur und den Trizeps.',
      tips: [
        'Core anspannen',
        'Gewicht kontrolliert drücken',
        'Nicht ins Hohlkreuz fallen'
      ],
      video: 'https://www.youtube.com/embed/B-aVuyhvLHU'
    },
    {
      id: 5,
      name: 'Bizeps Curls',
      muscle: 'Arme',
      description:
        'Eine isolierte Übung für den Bizeps. Besonders wichtig ist eine saubere Bewegung ohne Schwung.',
      tips: [
        'Ellbogen nah am Körper halten',
        'Nicht mit dem Oberkörper schwingen',
        'Langsam absenken'
      ],
      video: 'https://www.youtube.com/embed/ykJmrZ5v0Oo'
    },
    {
      id: 6,
      name: 'Plank',
      muscle: 'Bauch',
      description:
        'Die Plank stärkt die Rumpfmuskulatur und verbessert die Körperspannung.',
      tips: [
        'Körper in gerader Linie halten',
        'Bauch aktiv anspannen',
        'Nicht ins Hohlkreuz fallen'
      ],
      video: 'https://www.youtube.com/embed/pSHjTRCQxIw'
    }
  ];

  const muscleGroups = ['Alle', 'Brust', 'Beine', 'Rücken', 'Schultern', 'Arme', 'Bauch'];

  let selectedMuscle = $state('Alle');
  let selectedExercise = $state<Exercise>(exercises[0]);

  const filteredExercises = $derived(
    selectedMuscle === 'Alle'
      ? exercises
      : exercises.filter((e) => e.muscle === selectedMuscle)
  );

  $effect(() => {
    if (
      filteredExercises.length > 0 &&
      !filteredExercises.find((e) => e.id === selectedExercise?.id)
    ) {
      selectedExercise = filteredExercises[0];
    }
  });

  function selectExercise(exercise: Exercise) {
    selectedExercise = exercise;
  }
</script>