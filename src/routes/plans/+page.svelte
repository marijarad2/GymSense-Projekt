<script>
	import plansLight from '$lib/assets/plans-light.png';
	import plansDark from '$lib/assets/plans-dark.png';

	let { data } = $props();

	let isDarkMode = $state(false);

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

<section class="plans-page">
	<div class="hero">
		<img src={isDarkMode ? plansDark : plansLight} alt="Trainingspläne" />

		<div class="hero-overlay"></div>

		<div class="hero-content">
			<h1>Trainingspläne</h1>
			<p>Wähle einen Plan aus und starte direkt dein Training</p>
		</div>
	</div>

	<div class="recommendation-card">
		<span>GymSense Empfehlung</span>
		<h2>{data.recommendation.message}</h2>
	</div>

	<div class="plans-grid">
		{#each data.trainingPlans as plan}
			<article class="plan-card" class:recommended={plan.type === data.recommendation.type}>
				<div class="plan-top">
					<div>
						<h2>{plan.name}</h2>
						<p>{plan.goal}</p>
					</div>

					{#if plan.type === data.recommendation.type}
						<span class="badge">Empfohlen</span>
					{/if}
				</div>

				<p class="description">{plan.description}</p>

				<div class="meta">
					<span>{plan.level}</span>
					<span>{plan.exercises.length} Übungen</span>
				</div>

				<ul>
					{#each plan.exercises as exercise}
						<li>
							<strong>{exercise.name}</strong>
							<span>
								{exercise.sets} Sätze · {exercise.reps} Wdh · {exercise.restSeconds}s Pause
							</span>
						</li>
					{/each}
				</ul>

				<a class="start-btn" href={`/training?plan=${plan._id}`}>
					Plan starten
				</a>
			</article>
		{/each}
	</div>
</section>

<style>
	.plans-page {
		max-width: 1100px;
		margin: 0 auto;
		padding: 40px 24px;
	}

	.hero {
		position: relative;
		height: 390px;
		border-radius: 26px;
		overflow: hidden;
		margin-bottom: 34px;
		background: #fff0ff;
		box-shadow: 0 12px 32px rgba(176, 110, 176, 0.24);
	}

	.hero img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		transition: transform 0.5s ease;
	}

	.hero:hover img {
		transform: scale(1.03);
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			rgba(255, 240, 255, 0),
			rgba(176, 110, 176, 0.25)
		);
		pointer-events: none;
	}

	.hero-content {
		position: absolute;
		bottom: 28px;
		left: 32px;
		z-index: 2;
		color: white;
		text-shadow: 0 3px 14px rgba(0, 0, 0, 0.35);
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

	.recommendation-card {
		background: linear-gradient(135deg, #fff4ff, #ffffff);
		border: 1px solid #f3dff3;
		border-radius: 20px;
		padding: 24px;
		margin-bottom: 28px;
		box-shadow: 0 8px 24px rgba(176, 110, 176, 0.16);
	}

	.recommendation-card span {
		font-weight: 700;
		color: #b06eb0;
	}

	.recommendation-card h2 {
		margin-top: 8px;
		color: #333;
	}

	.plans-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 24px;
	}

	.plan-card {
		background: white;
		border-radius: 20px;
		padding: 24px;
		box-shadow: 0 8px 24px rgba(176, 110, 176, 0.16);
		border: 2px solid transparent;
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease,
			border-color 0.25s ease;
	}

	.plan-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 30px rgba(176, 110, 176, 0.24);
	}

	.plan-card.recommended {
		border-color: #b06eb0;
	}

	.plan-top {
		display: flex;
		justify-content: space-between;
		gap: 12px;
	}

	.plan-top h2 {
		color: #b06eb0;
		margin-bottom: 6px;
	}

	.plan-top p {
		color: #555;
		margin: 0;
	}

	.description {
		margin: 16px 0;
		color: #555;
		line-height: 1.5;
	}

	.badge {
		background: #b06eb0;
		color: white;
		border-radius: 999px;
		padding: 6px 10px;
		font-size: 0.75rem;
		font-weight: 700;
		height: fit-content;
		white-space: nowrap;
	}

	.meta {
		display: flex;
		gap: 10px;
		margin-bottom: 14px;
		flex-wrap: wrap;
	}

	.meta span {
		background: #f8f0f8;
		color: #b06eb0;
		padding: 6px 10px;
		border-radius: 999px;
		font-size: 0.85rem;
		font-weight: 700;
	}

	ul {
		padding-left: 0;
		list-style: none;
		margin: 0;
	}

	li {
		padding: 12px 0;
		border-bottom: 1px solid #f3dff3;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	li strong {
		color: #222;
	}

	li span {
		color: #777;
		font-size: 0.9rem;
	}

	.start-btn {
		display: inline-block;
		margin-top: 18px;
		background: #b06eb0;
		color: white;
		padding: 12px 16px;
		border-radius: 12px;
		text-decoration: none;
		font-weight: 700;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}

	.start-btn:hover {
		background: #9a5a9a;
		transform: translateY(-2px);
	}

	@media (max-width: 700px) {
		.plans-page {
			padding: 32px 16px;
		}

		.hero {
			height: 260px;
			border-radius: 20px;
		}

		.hero-content {
			left: 20px;
			bottom: 20px;
		}

		.hero-content h1 {
			font-size: 2rem;
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

	:global(body.dark-mode) .hero img {
		height: calc(100% + 14px);
		transform: translateY(-7px);
	}

	:global(body.dark-mode) .hero:hover img {
		transform: translateY(-7px) scale(1.03);
	}

	:global(body.dark-mode) .hero-overlay {
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0),
			rgba(18, 16, 21, 0.55)
		);
	}

	:global(body.dark-mode) .plan-card,
	:global(body.dark-mode) .recommendation-card {
		background: #2c2432;
		color: #f5eaf5;
		border-color: rgba(247, 209, 248, 0.18);
		box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
	}

	:global(body.dark-mode) .plan-card:hover {
		box-shadow: 0 14px 34px rgba(0, 0, 0, 0.38);
	}

	:global(body.dark-mode) .plan-card.recommended {
		border-color: #f7d1f8;
	}

	:global(body.dark-mode) .recommendation-card {
		background: linear-gradient(135deg, #3a2a42, #2c2432);
	}

	:global(body.dark-mode) .recommendation-card h2,
	:global(body.dark-mode) .plan-top h2 {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .recommendation-card span {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .description,
	:global(body.dark-mode) .plan-top p,
	:global(body.dark-mode) li span {
		color: #ddd;
	}

	:global(body.dark-mode) li {
		border-bottom: 1px solid rgba(247, 209, 248, 0.18);
	}

	:global(body.dark-mode) li strong {
		color: #f5eaf5;
	}

	:global(body.dark-mode) .meta span {
		background: #3a2a42;
		color: #f7d1f8;
	}

	:global(body.dark-mode) .badge,
	:global(body.dark-mode) .start-btn {
		background: #f7d1f8;
		color: #2c2432;
	}

	:global(body.dark-mode) .start-btn:hover {
		background: #e8b9ea;
	}
</style>