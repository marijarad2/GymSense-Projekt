<script>
	import exercisesLight from '$lib/assets/exercises-light.png';
	import exercisesDark from '$lib/assets/exercises-dark.png';

	let { data, form } = $props();

	let searchTerm = $state('');
	let selectedMuscle = $state('Alle');
	let isDarkMode = $state(false);

	const muscleGroups = $derived.by(() => {
		const muscles = data.exercises.map((exercise) => exercise.muscle).filter(Boolean);
		return ['Alle', ...new Set(muscles)];
	});

	const filteredExercises = $derived.by(() => {
		return data.exercises.filter((exercise) => {
			const matchesSearch =
				exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				exercise.description.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesMuscle =
				selectedMuscle === 'Alle' || exercise.muscle === selectedMuscle;

			return matchesSearch && matchesMuscle;
		});
	});

	$effect(() => {
		isDarkMode = document.body.classList.contains('dark-mode');

		const observer = new MutationObserver(() => {
			isDarkMode = document.body.classList.contains('dark-mode');
		});

		observer.observe(document.body, {
			attributes: true,
			attributeFilter: ['class']
		});

		return () => observer.disconnect();
	});
</script>

<section class="exercises-page">
	<div class="hero">
		<img src={isDarkMode ? exercisesDark : exercisesLight} alt="Fitness Übungen" />

		<div class="hero-overlay"></div>

		<div class="hero-content">
			<h1>Übungen</h1>
			<p>Finde passende Übungen für dein Training</p>
		</div>
	</div>

	{#if form?.message}
		<div class="success-message">{form.message}</div>
	{/if}

	{#if form?.error}
		<div class="error-message">{form.error}</div>
	{/if}

	<div class="filter-box">
		<input
			type="text"
			bind:value={searchTerm}
			placeholder="Übung suchen..."
			aria-label="Übung suchen"
		/>

		<select bind:value={selectedMuscle} aria-label="Muskelgruppe filtern">
			{#each muscleGroups as muscle}
				<option value={muscle}>{muscle}</option>
			{/each}
		</select>
	</div>

	<p class="result-count">
		{filteredExercises.length} Übungen gefunden
	</p>

	{#if filteredExercises.length === 0}
		<p class="empty">Keine passenden Übungen gefunden.</p>
	{:else}
		<div class="exercise-grid">
			{#each filteredExercises as exercise}
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

					<p class="description">{exercise.description}</p>

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

	.hero {
		position: relative;
		height: 390px;
		border-radius: 26px;
		overflow: hidden;
		margin-bottom: 34px;
		background: transparent;
	}

	.hero {
	background: #121015;
	}

	.hero img {
		display: block;
		width: 100%;
		height: calc(100% + 14px);
		object-fit: cover;
		object-position: center;
		transform: translateY(-7px);
		transition: transform 0.5s ease;
	}

	.hero:hover img {
		transform: translateY(-4px) scale(1.03);
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0),
			rgba(0, 0, 0, 0.6)
		);
		pointer-events: none;
	}

	.hero-content {
		position: absolute;
		bottom: 28px;
		left: 32px;
		z-index: 2;
		color: white;
		text-shadow: 0 3px 14px rgba(0, 0, 0, 0.28);
	}

	.hero-content h1 {
		margin: 0;
		font-size: 2.4rem;
		font-weight: 800;
	}

	.hero-content p {
		margin: 6px 0 0;
		color: #fff;
		font-weight: 600;
		font-size: 1rem;
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

	.filter-box {
		display: grid;
		grid-template-columns: 1fr 240px;
		gap: 16px;
		margin-bottom: 16px;
	}

	.filter-box input,
	.filter-box select {
		border: 1px solid #f0d6f0;
		background: white;
		color: #333;
		padding: 14px 15px;
		border-radius: 14px;
		font-weight: 600;
		box-shadow: 0 8px 22px rgba(176, 110, 176, 0.14);
	}

	.filter-box input:focus,
	.filter-box select:focus {
		outline: 2px solid #b06eb0;
		border-color: #b06eb0;
	}

	.result-count {
		text-align: center;
		color: #666;
		margin-bottom: 28px;
		font-weight: 700;
	}

	.empty {
		text-align: center;
		background: white;
		padding: 32px;
		border-radius: 18px;
		box-shadow: 0 8px 24px rgba(176, 110, 176, 0.12);
	}

	.exercise-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 28px;
	}

	.exercise-card {
		background: white;
		border-radius: 20px;
		padding: 24px;
		box-shadow: 0 8px 24px rgba(176, 110, 176, 0.14);
		border: 1px solid rgba(176, 110, 176, 0.12);
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease;
	}

	.exercise-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 30px rgba(176, 110, 176, 0.22);
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

	.exercise-card h3 {
		color: #b06eb0;
		margin-top: 18px;
	}

	.muscle {
		font-weight: bold;
		color: #666;
	}

	.description {
		color: #444;
		line-height: 1.5;
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
		border-radius: 12px;
		font-weight: 700;
		cursor: pointer;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}

	.favorite-btn:hover {
		background: #9a5a9a;
		transform: translateY(-2px);
	}

	ul {
		padding-left: 20px;
		color: #444;
	}

	li {
		margin-bottom: 6px;
	}

	iframe {
		width: 100%;
		height: 230px;
		margin-top: 18px;
		border-radius: 14px;
	}

	@media (max-width: 700px) {
		.exercises-page {
			padding: 32px 16px;
		}

		.hero {
			border: none;
			outline: none;
		}
		.hero-content {
			left: 20px;
			bottom: 20px;
		}

		.hero-content h1 {
			font-size: 2rem;
		}

		.filter-box {
			grid-template-columns: 1fr;
		}
	}

	:global(body.dark-mode) {
		background: linear-gradient(to bottom, #1f1a24, #121015);
		color: #f5eaf5;
	}

	:global(body.dark-mode) .hero {
		background: #121015;
		border: none;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
	}

	:global(body.dark-mode) .hero-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0),
			rgba(18, 16, 21, 0.45)
		);
		pointer-events: none;
	}

	:global(body.dark-mode) h1,
	:global(body.dark-mode) h2,
	:global(body.dark-mode) h3 {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .exercise-card,
	:global(body.dark-mode) .empty {
		background: #2c2432;
		color: #f5eaf5;
		border: 1px solid rgba(247, 209, 248, 0.18);
		box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
	}

	:global(body.dark-mode) .exercise-card:hover {
		box-shadow: 0 14px 34px rgba(0, 0, 0, 0.38);
	}

	:global(body.dark-mode) .description,
	:global(body.dark-mode) ul,
	:global(body.dark-mode) li,
	:global(body.dark-mode) .result-count {
		color: #ddd;
	}

	:global(body.dark-mode) .muscle {
		color: #d8c2dc;
	}

	:global(body.dark-mode) .filter-box input,
	:global(body.dark-mode) .filter-box select {
		background: #2c2432;
		color: #f5eaf5;
		border: 1px solid rgba(247, 209, 248, 0.25);
		box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
	}

	:global(body.dark-mode) .filter-box input::placeholder {
		color: #c7b2cc;
	}

	:global(body.dark-mode) .filter-box input:focus,
	:global(body.dark-mode) .filter-box select:focus {
		outline: 2px solid #f7d1f8;
		border-color: #f7d1f8;
	}

	:global(body.dark-mode) .success-message {
		background: #3a2a42;
		color: #f7d1f8;
	}

	:global(body.dark-mode) .error-message {
		background: #4a2634;
		color: #ffb3c7;
	}

	:global(body.dark-mode) .favorite-btn,
	:global(body.dark-mode) .favorite-badge {
		background: #f7d1f8;
		color: #2c2432;
	}

	:global(body.dark-mode) .favorite-btn:hover {
		background: #e8b9ea;
	}
</style>