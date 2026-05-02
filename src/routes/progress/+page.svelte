<script>
	let { data } = $props();

	const progressItems = data.progressItems ?? [];

	function formatDifference(diff) {
		if (diff > 0) return `+${diff} kg seit dem letzten Training`;
		if (diff < 0) return `${diff} kg seit dem letzten Training`;
		return 'Keine Veränderung';
	}

	function getBarHeight(entry, history) {
		const weights = history.map((item) => item.weight);
		const max = Math.max(...weights);
		const min = Math.min(...weights);

		if (max === min) return 45;

		return 30 + ((entry.weight - min) / (max - min)) * 70;
	}

	let showToast = $state(false);

	$effect(() => {
		if (progressItems.some((item) => item.difference > 0)) {
			showToast = true;

			const timer = setTimeout(() => {
				showToast = false;
			}, 3000);

			return () => clearTimeout(timer);
		}
	});
</script>

<section class="progress-page">
	<div class="header">
		<h1>Dein Fortschritt</h1>
		<p>Hier siehst du deine Entwicklung pro Übung.</p>
	</div>

	{#if progressItems.length === 0}
		<div class="empty">
			<p>Keine Trainingsdaten vorhanden 😢</p>
			<p>Starte ein Training, um Fortschritt zu sehen!</p>
		</div>
	{:else}
		<div class="progress-grid">
			{#each progressItems as item}
				<div class="progress-card">
					<div class="card-top">
						<h2>{item.name}</h2>

						{#if item.isPersonalBest}
							<span class="record-badge">PR 🎉</span>
						{/if}
					</div>

					<div class="weight-row">
						<div>
							<span class="label">Vorher</span>
							<strong>{item.previousWeight ?? '-'} kg</strong>
						</div>

						<div>
							<span class="label">Jetzt</span>
							<strong>{item.currentWeight} kg</strong>
						</div>
					</div>

					<p class="difference">
						{formatDifference(item.difference)}
					</p>

					<div class="history">
						<span class="label">Letzte Einträge</span>

						<div class="history-bars">
							{#each item.history as entry}
								<div class="bar-wrapper">
									<div
										class="bar"
										style={`height: ${getBarHeight(entry, item.history)}px`}
										title={`${entry.weight} kg`}
									></div>
									<small>{entry.weight}</small>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>

{#if showToast}
	<div class="progress-toast">
		Du hast Fortschritte gemacht 🚀
	</div>
{/if}

<style>
	.progress-page {
		max-width: 1100px;
		margin: 0 auto;
	}

	.header {
		text-align: center;
		margin-bottom: 36px;
	}

	.header h1 {
		color: #b06eb0;
		margin-bottom: 10px;
	}

	.empty {
		text-align: center;
		background: white;
		padding: 40px;
		border-radius: 16px;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
	}

	.progress-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 24px;
	}

	.progress-card {
		background: white;
		border-radius: 18px;
		padding: 24px;
		box-shadow: 0 8px 24px rgba(176, 110, 176, 0.18);
		position: relative;
	}

	.card-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.record-badge {
		background: #b06eb0;
		color: white;
		padding: 6px 10px;
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 700;
	}

	.weight-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 18px;
	}

	.label {
		display: block;
		font-size: 0.8rem;
		color: #777;
	}

	strong {
		font-size: 1.3rem;
		color: #222;
	}

	.difference {
		background: #fff0ff;
		color: #8e4f8e;
		padding: 12px;
		border-radius: 12px;
		font-weight: 700;
		margin-bottom: 16px;
	}

	.history {
		margin-top: 18px;
		border-top: 1px solid #f3dff3;
		padding-top: 16px;
	}

	.history-bars {
		display: flex;
		align-items: flex-end;
		gap: 12px;
		height: 110px;
		margin-top: 12px;
		overflow: hidden;
	}

	.bar-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
	}

	.bar {
		width: 28px;
		background: #f7d1f8;
		border-radius: 8px 8px 0 0;
		min-height: 20px;
	}

	small {
		font-size: 0.75rem;
		color: #555;
	}

	.progress-toast {
		position: fixed;
		top: 20px;
		right: 20px;
		background: #b06eb0;
		color: white;
		padding: 12px 18px;
		border-radius: 12px;
		font-weight: 700;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
		animation: slideIn 0.4s ease;
		z-index: 999;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	:global(body.dark-mode) {
		background: linear-gradient(to bottom, #1f1a24, #121015);
		color: #f5eaf5;
	}

	:global(body.dark-mode) .progress-page {
		color: #f5eaf5;
	}

	:global(body.dark-mode) .header h1,
	:global(body.dark-mode) .progress-card h2 {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .header p,
	:global(body.dark-mode) .empty p {
		color: #ddd;
	}

	:global(body.dark-mode) .progress-card,
	:global(body.dark-mode) .empty {
		background: #2c2432;
		color: #f5eaf5;
		border: 1px solid rgba(247, 209, 248, 0.18);
		box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
	}

	:global(body.dark-mode) .label,
	:global(body.dark-mode) small {
		color: #d8c2dc;
	}

	:global(body.dark-mode) strong {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .difference {
		background: #3a2a42;
		color: #f7d1f8;
		border: 1px solid rgba(247, 209, 248, 0.16);
	}

	:global(body.dark-mode) .history {
		border-top: 1px solid rgba(247, 209, 248, 0.18);
	}

	:global(body.dark-mode) .bar {
		background: #f7d1f8;
	}

	:global(body.dark-mode) .record-badge,
	:global(body.dark-mode) .progress-toast {
		background: #f7d1f8;
		color: #2c2432;
	}
</style>