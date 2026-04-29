<script>
	let { data } = $props();

	const days = Array.from({ length: 31 }, (_, i) => i + 1);

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

	<div class="profile-card calendar-card">
		<h2>Trainingskalender</h2>
		<p class="calendar-info">🏋️ Trainingstage · 💤 Rest Days</p>

		<div class="calendar">
			{#each days as day}
				{@const dateString = `2026-04-${String(day).padStart(2, '0')}`}
				{@const entry = data.calendarEntries.find((item) => item.date === dateString)}

				<div
					class="day"
					class:training={entry?.type === 'training'}
					class:rest={entry?.type === 'rest'}
					title={entry?.note ?? ''}
				>
					<span>{day}</span>

					{#if entry?.type === 'training'}
						<small>🏋️</small>
					{:else if entry?.type === 'rest'}
						<small>💤</small>
					{:else}
						<small>–</small>
					{/if}

					<div class="day-actions">
						<form method="POST" action="?/addTraining">
							<input type="hidden" name="date" value={dateString} />
							<button type="submit">🏋️</button>
						</form>

						<form method="POST" action="?/addRest">
							<input type="hidden" name="date" value={dateString} />
							<button type="submit">💤</button>
						</form>
					</div>
				</div>
			{/each}
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

	.content-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 24px;
		margin-bottom: 28px;
	}

	.record-row {
		display: flex;
		justify-content: space-between;
		padding: 12px 0;
		border-bottom: 1px solid #f3dff3;
	}

	.calendar {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 10px;
	}

	.day {
		min-height: 80px;
		background: #f8f0f8;
		border-radius: 14px;
		padding: 10px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.day.training {
		background: #d9f8df;
		border: 2px solid #71c783;
	}

	.day.rest {
		background: #ffe4ee;
		border: 2px solid #d990aa;
	}

	.day-actions {
		display: flex;
		justify-content: center;
		gap: 6px;
		margin-top: 8px;
	}

	.day-actions button {
		border: none;
		background: white;
		border-radius: 8px;
		padding: 4px 6px;
		cursor: pointer;
	}
</style>