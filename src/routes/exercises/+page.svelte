<script>
	let { data, form } = $props();
</script>

<section class="exercises-page">
	<h1>Übungen</h1>

	{#if form?.message}
		<div class="success-message">
			{form.message}
		</div>
	{/if}

	{#if form?.error}
		<div class="error-message">
			{form.error}
		</div>
	{/if}

	{#if data.exercises.length === 0}
		<p>Keine Übungen gefunden.</p>
	{:else}
		<div class="exercise-grid">
			{#each data.exercises as exercise}
				<article class="exercise-card">
					<div class="card-header">
						<div>
							<h2>{exercise.name}</h2>
							<p class="muscle">{exercise.muscle}</p>
						</div>

						{#if data.favoriteExercise === exercise.name}
							<span class="favorite-badge">⭐ Favorit</span>
						{/if}
					</div>

					<p>{exercise.description}</p>

					<h3>Tipps</h3>
					<ul>
						{#each exercise.tips ?? [] as tip}
							<li>{tip}</li>
						{/each}
					</ul>

					{#if data.user}
						<form method="POST" action="?/setFavorite">
							<input type="hidden" name="exerciseName" value={exercise.name} />
							<button class="favorite-btn" type="submit">
								⭐ Als Lieblingsübung speichern
							</button>
						</form>
					{/if}

					{#if exercise.video}
						<iframe
							src={exercise.video}
							title={exercise.name}
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					{/if}
				</article>
			{/each}
		</div>
	{/if}
</section>

<style>
	.exercises-page {
		max-width: 1200px;
		margin: 0 auto;
		padding: 50px 24px;
	}

	h1 {
		text-align: center;
		color: #b06eb0;
		margin-bottom: 40px;
	}

	.success-message,
	.error-message {
		max-width: 700px;
		margin: 0 auto 24px;
		padding: 14px 18px;
		border-radius: 12px;
		font-weight: 700;
		text-align: center;
	}

	.success-message {
		background: #f3e6f3;
		color: #8e4f8e;
	}

	.error-message {
		background: #ffe6e6;
		color: #b00020;
	}

	.exercise-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 28px;
	}

	.exercise-card {
		background: white;
		border-radius: 18px;
		padding: 24px;
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		align-items: flex-start;
		margin-bottom: 10px;
	}

	.exercise-card h2 {
		color: #b06eb0;
		margin-bottom: 6px;
	}

	.muscle {
		font-weight: bold;
		color: #666;
	}

	.favorite-badge {
		background: #b06eb0;
		color: white;
		padding: 6px 10px;
		border-radius: 999px;
		font-size: 0.8rem;
		font-weight: 700;
		white-space: nowrap;
	}

	.favorite-btn {
		margin-top: 14px;
		border: none;
		background: #b06eb0;
		color: white;
		padding: 10px 14px;
		border-radius: 10px;
		font-weight: 700;
		cursor: pointer;
	}

	.favorite-btn:hover {
		background: #9a5a9a;
	}

	ul {
		padding-left: 20px;
	}

	iframe {
		width: 100%;
		height: 230px;
		margin-top: 18px;
		border-radius: 14px;
	}
</style>