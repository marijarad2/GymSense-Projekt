<script>
	let { data, form } = $props();

	let selectedExerciseId = $state('');
	let workoutExercises = $state([]);

	function addExercise() {
		const exercise = data.exercises.find((item) => item.id === selectedExerciseId);

		if (!exercise) return;

		workoutExercises = [
			...workoutExercises,
			{
				exerciseId: exercise.id,
				name: exercise.name,
				sets: [{ weight: '', reps: '' }],
				note: ''
			}
		];

		selectedExerciseId = '';
	}

	function addSet(index) {
		workoutExercises[index].sets = [
			...workoutExercises[index].sets,
			{ weight: '', reps: '' }
		];
	}

	function removeExercise(index) {
		workoutExercises = workoutExercises.filter((_, i) => i !== index);
	}
</script>

<section class="training-page">
	<h1>Training erfassen</h1>
	<p>Wähle Übungen aus und speichere dein Training.</p>

	{#if form?.error}
		<div class="alert alert-danger">{form.error}</div>
	{/if}

	<div class="add-box">
		<select bind:value={selectedExerciseId} class="form-select">
			<option value="">Übung auswählen</option>
			{#each data.exercises as exercise}
				<option value={exercise.id}>{exercise.name}</option>
			{/each}
		</select>

		<button type="button" class="btn add-btn" onclick={addExercise}>
			Übung hinzufügen
		</button>
	</div>

	<form method="POST">
		<input type="hidden" name="exercises" value={JSON.stringify(workoutExercises)} />

		{#each workoutExercises as exercise, exerciseIndex}
			<div class="exercise-card">
				<div class="card-header">
					<h2>{exercise.name}</h2>
					<button type="button" class="remove-btn" onclick={() => removeExercise(exerciseIndex)}>
						Entfernen
					</button>
				</div>

				{#each exercise.sets as set, setIndex}
					<div class="set-row">
						<label>
							Gewicht kg
							<input
								type="number"
								min="0"
								step="0.5"
								bind:value={set.weight}
								class="form-control"
							/>
						</label>

						<label>
							Wiederholungen
							<input
								type="number"
								min="1"
								bind:value={set.reps}
								class="form-control"
							/>
						</label>
					</div>
				{/each}

				<button type="button" class="btn small-btn" onclick={() => addSet(exerciseIndex)}>
					+ Satz hinzufügen
				</button>

				<label class="note-label">
					Notiz
					<textarea bind:value={exercise.note} class="form-control" placeholder="Optional"></textarea>
				</label>
			</div>
		{/each}

		<button class="btn save-btn" type="submit" disabled={workoutExercises.length === 0}>
			Training speichern
		</button>
	</form>
</section>

<style>
	.training-page {
		max-width: 900px;
		margin: 0 auto;
	}

	h1 {
		color: #b06eb0;
		font-weight: 700;
	}

	.add-box {
		display: flex;
		gap: 12px;
		margin: 24px 0;
	}

	.add-btn,
	.save-btn,
	.small-btn {
		background: #b06eb0;
		color: white;
		font-weight: 700;
		border-radius: 8px;
	}

	.exercise-card {
		background: white;
		padding: 24px;
		border-radius: 18px;
		margin-bottom: 20px;
		box-shadow: 0 8px 24px rgba(176, 110, 176, 0.18);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
	}

	.card-header h2 {
		margin: 0;
		color: #333;
	}

	.remove-btn {
		border: none;
		background: transparent;
		color: #b06eb0;
		font-weight: 700;
	}

	.set-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		margin-bottom: 12px;
	}

	.note-label {
		display: block;
		margin-top: 16px;
	}

	.save-btn {
		margin-top: 16px;
		padding: 12px 20px;
	}

	.save-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>