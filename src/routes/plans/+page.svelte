<script>
	let { data } = $props();
</script>

<section class="plans-page">
	<div class="header">
		<h1>Trainingspläne</h1>
		<p>Wähle einen Plan aus und starte direkt dein Training.</p>
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

	.header {
		text-align: center;
		margin-bottom: 32px;
	}

	h1 {
		color: #b06eb0;
		font-weight: 700;
	}

	.header p {
		color: #666;
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
		border-radius: 18px;
		padding: 24px;
		box-shadow: 0 8px 24px rgba(176, 110, 176, 0.16);
		border: 2px solid transparent;
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
		border-radius: 10px;
		text-decoration: none;
		font-weight: 700;
	}

	.start-btn:hover {
		background: #9a5a9a;
	}

	:global(body.dark-mode) .plan-card,
	:global(body.dark-mode) .recommendation-card {
		background: #2c2432;
		color: #f5eaf5;
		border-color: rgba(247, 209, 248, 0.18);
	}

	:global(body.dark-mode) .recommendation-card h2,
	:global(body.dark-mode) .plan-top h2 {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .description,
	:global(body.dark-mode) .plan-top p,
	:global(body.dark-mode) li span {
		color: #ddd;
	}

	:global(body.dark-mode) .meta span {
		background: #3a2a42;
		color: #f7d1f8;
	}
</style>