<script>
	import { onMount } from 'svelte';

	let { data, form } = $props();

	let selectedExerciseId = $state('');
	let workoutExercises = $state([]);
	let activePlan = $state(null);
	let loadingPlan = $state(false);
	let planMessage = $state('');

	onMount(async () => {
		const url = new URL(window.location.href);
		const planId = url.searchParams.get('plan');

		if (!planId) return;

		loadingPlan = true;

		try {
			const response = await fetch(`/api/training-plan/${planId}`);

			if (!response.ok) {
				planMessage = 'Trainingsplan konnte nicht geladen werden.';
				return;
			}

			const plan = await response.json();
			activePlan = plan;

			workoutExercises = plan.exercises
				.map((planExercise) => {
					const existingExercise = data.exercises.find(
						(exercise) => exercise.name === planExercise.name
					);

					if (!existingExercise) return null;

					return {
						exerciseId: existingExercise._id ?? existingExercise.id,
						name: existingExercise.name,
						sets: Array.from({ length: planExercise.sets }, () => ({
							weight: '',
							reps: ''
						})),
						note: `Empfohlen: ${planExercise.reps} Wiederholungen · ${planExercise.restSeconds}s Pause`
					};
				})
				.filter(Boolean);

			planMessage = `${plan.name} wurde geladen. Du kannst direkt starten.`;
		} catch (error) {
			planMessage = 'Beim Laden des Trainingsplans ist ein Fehler passiert.';
		} finally {
			loadingPlan = false;
		}
	});

	function addExercise() {
		const exercise = data.exercises.find(
			(item) => item.id === selectedExerciseId || item._id === selectedExerciseId
		);

		if (!exercise) return;

		workoutExercises = [
			...workoutExercises,
			{
				exerciseId: exercise._id ?? exercise.id,
				name: exercise.name,
				sets: [{ weight: '', reps: '' }],
				note: ''
			}
		];

		selectedExerciseId = '';
	}

	function addSet(index) {
		workoutExercises[index].sets = [...workoutExercises[index].sets, { weight: '', reps: '' }];
	}

	function removeExercise(index) {
		workoutExercises = workoutExercises.filter((_, i) => i !== index);
	}

	const summary = $derived.by(() => {
		const exerciseCount = workoutExercises.length;

		const setCount = workoutExercises.reduce(
			(total, exercise) => total + exercise.sets.length,
			0
		);

		const totalVolume = workoutExercises.reduce((total, exercise) => {
			const exerciseVolume = exercise.sets.reduce((sum, set) => {
				const weight = Number(set.weight) || 0;
				const reps = Number(set.reps) || 0;

				return sum + weight * reps;
			}, 0);

			return total + exerciseVolume;
		}, 0);

		return {
			exerciseCount,
			setCount,
			totalVolume
		};
	});
</script>

<section class="training-page">
	<h1>Training erfassen</h1>
	<p>Wähle Übungen aus und speichere dein Training.</p>

	{#if form?.error}
		<div class="alert alert-danger">{form.error}</div>
	{/if}

	{#if form?.message}
		<div class="plan-info">{form.message}</div>
	{/if}

	{#if loadingPlan}
		<div class="plan-info">Trainingsplan wird geladen...</div>
	{/if}

	{#if planMessage}
		<div class="plan-info">{planMessage}</div>
	{/if}

	{#if activePlan}
		<div class="active-plan-card">
			<span>Aktiver Trainingsplan</span>
			<h2>{activePlan.name}</h2>
			<p>{activePlan.description}</p>
		</div>
	{/if}

	<div class="add-box">
		<select bind:value={selectedExerciseId} class="form-select">
			<option value="">Übung auswählen</option>

			{#each data.exercises as exercise}
				<option value={exercise._id ?? exercise.id}>{exercise.name}</option>
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

		{#if workoutExercises.length > 0}
			<div class="summary-card">
				<h2>Trainings-Zusammenfassung</h2>

				<div class="summary-grid">
					<div>
						<span>Übungen</span>
						<strong>{summary.exerciseCount}</strong>
					</div>

					<div>
						<span>Sätze</span>
						<strong>{summary.setCount}</strong>
					</div>

					<div>
						<span>Volumen</span>
						<strong>{summary.totalVolume} kg</strong>
					</div>
				</div>

				<p>GymSense fasst dein Training automatisch zusammen, bevor du es speicherst.</p>
			</div>
		{/if}

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

	.plan-info {
		background: #fff0ff;
		color: #8e4f8e;
		padding: 14px 18px;
		border-radius: 12px;
		font-weight: 700;
		margin: 18px 0;
	}

	.active-plan-card,
	.summary-card {
		background: white;
		padding: 22px;
		border-radius: 18px;
		box-shadow: 0 8px 24px rgba(176, 110, 176, 0.18);
		margin: 20px 0;
	}

	.active-plan-card span,
	.summary-card span {
		color: #b06eb0;
		font-weight: 700;
	}

	.active-plan-card h2,
	.summary-card h2 {
		color: #b06eb0;
		margin: 8px 0;
	}

	.summary-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 14px;
		margin: 16px 0;
	}

	.summary-grid div {
		background: #f8f0f8;
		border-radius: 14px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.summary-grid strong {
		color: #b06eb0;
		font-size: 1.4rem;
	}

	:global(body.dark-mode) .plan-info {
		background: #3a2a42;
		color: #f7d1f8;
	}

	:global(body.dark-mode) .active-plan-card,
	:global(body.dark-mode) .summary-card,
	:global(body.dark-mode) .exercise-card {
		background: #2c2432;
		color: #f5eaf5;
	}

	:global(body.dark-mode) .card-header h2,
	:global(body.dark-mode) .active-plan-card h2,
	:global(body.dark-mode) .summary-card h2,
	:global(body.dark-mode) .summary-grid strong {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .summary-grid div {
		background: #3a2a42;
	}
</style>