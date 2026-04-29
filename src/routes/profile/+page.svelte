<script>
	let { data } = $props();

	function formatDate(date) {
		if (!date) return 'Noch kein Training';

		return new Date(date).toLocaleDateString('de-CH', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}
</script>

<section class="profile-page">
	<div class="profile-header">
		<div class="avatar">
			<i class="bi bi-person-circle"></i>
		</div>

		<div>
			<h1>{data.user.name}</h1>
			<p>{data.user.email}</p>
		</div>
	</div>

	<div class="stats-grid">
		<div class="stat-card">
			<span>Trainings insgesamt</span>
			<strong>{data.totalWorkouts}</strong>
		</div>

		<div class="stat-card">
			<span>Letztes Training</span>
			<strong>{formatDate(data.lastWorkoutDate)}</strong>
		</div>

		<div class="stat-card">
			<span>Lieblingsübung</span>
            <strong>{data.favoriteExercise ?? 'Noch keine gewählt'}</strong>		
    </div>
		<div class="stat-card">
			<span>Höchstes Gewicht</span>
			<strong>
				{data.highestWeight ? `${data.highestWeight.maxWeight} kg` : 'Noch keine Daten'}
			</strong>
		</div>
	</div>

	<div class="content-grid">
		<div class="profile-card">
			<h2>Persönliche Rekorde</h2>

			{#if data.personalRecords.length === 0}
				<p>Noch keine Rekorde vorhanden.</p>
			{:else}
				<div class="records">
					{#each data.personalRecords as record}
						<div class="record-row">
							<span>{record.name}</span>
							<strong>{record.maxWeight} kg</strong>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<div class="profile-card">
			<h2>Intelligente Hinweise</h2>

			{#if data.totalWorkouts === 0}
				<p>Starte dein erstes Training, damit GymSense persönliche Hinweise berechnen kann.</p>
			{:else}
				<ul class="hints">
					<li>Du hast bereits {data.totalWorkouts} Trainingseinträge gespeichert.</li>

					{#if data.favoriteExercise}
	<li>{data.favoriteExercise} ist deine gespeicherte Lieblingsübung.</li>
{/if}

					{#if data.highestWeight}
						<li>Dein höchstes gespeichertes Gewicht liegt bei {data.highestWeight.maxWeight} kg.</li>
					{/if}
				</ul>
			{/if}
		</div>
	</div>
</section>

<style>
	.profile-page {
		max-width: 1100px;
		margin: 0 auto;
	}

	.profile-header {
		background: white;
		border-radius: 22px;
		padding: 28px;
		display: flex;
		align-items: center;
		gap: 20px;
		box-shadow: 0 8px 24px rgba(176, 110, 176, 0.18);
		margin-bottom: 28px;
	}

	.avatar i {
		font-size: 4rem;
		color: #b06eb0;
	}

	h1 {
		margin: 0;
		color: #b06eb0;
		font-weight: 700;
	}

	p {
		margin: 0;
		color: #555;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 18px;
		margin-bottom: 28px;
	}

	.stat-card,
	.profile-card {
		background: white;
		border-radius: 18px;
		padding: 22px;
		box-shadow: 0 8px 24px rgba(176, 110, 176, 0.16);
	}

	.stat-card span {
		display: block;
		color: #777;
		font-size: 0.9rem;
		margin-bottom: 8px;
	}

	.stat-card strong {
		font-size: 1.5rem;
		color: #222;
	}

	.content-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 24px;
	}

	.profile-card h2 {
		color: #b06eb0;
		margin-bottom: 18px;
	}

	.record-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 0;
		border-bottom: 1px solid #f3dff3;
	}

	.record-row:last-child {
		border-bottom: none;
	}

	.hints {
		padding-left: 20px;
		color: #444;
	}

	.hints li {
		margin-bottom: 10px;
	}
</style>