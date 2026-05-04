<script>
	let { data } = $props();

	const weeklyProgress = data.weeklyProgress ?? {
		current: 0,
		goal: 4,
		percentage: 0
	};

	const currentStreak = data.currentStreak ?? 0;
	const longestStreak = data.longestStreak ?? 0;
	const smartHint =
		data.smartHint ?? 'Starte dein erstes Training, damit GymSense dir Hinweise geben kann.';

	let currentDate = $state(new Date());
	let touchStartX = 0;

	const monthNames = [
		'Januar',
		'Februar',
		'März',
		'April',
		'Mai',
		'Juni',
		'Juli',
		'August',
		'September',
		'Oktober',
		'November',
		'Dezember'
	];

	const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

	function getCalendarDays(year, month) {
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);

		let startDay = firstDay.getDay();
		startDay = startDay === 0 ? 6 : startDay - 1;

		const days = [];

		for (let i = 0; i < startDay; i++) {
			days.push(null);
		}

		for (let day = 1; day <= lastDay.getDate(); day++) {
			days.push(day);
		}

		return days;
	}

	function formatDateForDb(year, month, day) {
		return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
	}

	function previousMonth() {
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
	}

	function nextMonth() {
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
	}

	function previousYear() {
		currentDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);
	}

	function nextYear() {
		currentDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1);
	}

	function handleTouchStart(event) {
		touchStartX = event.touches[0].clientX;
	}

	function handleTouchEnd(event) {
		const diff = touchStartX - event.changedTouches[0].clientX;

		if (Math.abs(diff) > 60) {
			diff > 0 ? nextMonth() : previousMonth();
		}
	}

	let calendarDays = $derived(
		getCalendarDays(currentDate.getFullYear(), currentDate.getMonth())
	);

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

	<div class="dashboard-grid">
		<div class="dashboard-card">
			<span>Wochenziel</span>

			<strong>
				{weeklyProgress.current} / {weeklyProgress.goal} Trainings
			</strong>

			<div class="progress-bar">
				<div class="progress-fill" style={`width: ${weeklyProgress.percentage}%`}></div>
			</div>

			<small>{weeklyProgress.percentage}% erreicht</small>

			<form method="POST" action="?/updateWeeklyGoal" class="weekly-goal-form">
				<label for="weeklyGoal">Ziel ändern</label>

				<select name="weeklyGoal" id="weeklyGoal">
					<option value="1" selected={weeklyProgress.goal === 1}>1 Training</option>
					<option value="2" selected={weeklyProgress.goal === 2}>2 Trainings</option>
					<option value="3" selected={weeklyProgress.goal === 3}>3 Trainings</option>
					<option value="4" selected={weeklyProgress.goal === 4}>4 Trainings</option>
					<option value="5" selected={weeklyProgress.goal === 5}>5 Trainings</option>
					<option value="6" selected={weeklyProgress.goal === 6}>6 Trainings</option>
					<option value="7" selected={weeklyProgress.goal === 7}>7 Trainings</option>
				</select>

				<button type="submit">Speichern</button>
			</form>
		</div>

		<div class="dashboard-card">
			<span>Trainings-Streak</span>
			<strong>{currentStreak} Tage</strong>
			<small>Längste Serie: {longestStreak} Tage</small>
		</div>

		<div class="dashboard-card smart-hint-card">
			<span>Intelligenter Hinweis</span>
			<strong>GymSense Tipp</strong>
			<p>{smartHint}</p>
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
		<div class="calendar-top">
			<div>
				<h2>Trainingskalender</h2>
				<p class="calendar-info">🏋️ Training · 💤 Rest Day · 🎟️ Kurs</p>
			</div>

			<div class="calendar-controls">
				<button type="button" onclick={previousYear}>« Jahr</button>
				<button type="button" onclick={previousMonth}>‹ Monat</button>

				<strong class="calendar-title">
					{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
				</strong>

				<button type="button" onclick={nextMonth}>Monat ›</button>
				<button type="button" onclick={nextYear}>Jahr »</button>
			</div>
		</div>

		<div
			class="calendar-swipe"
			role="region"
			aria-label="Kalender Swipe Bereich"
			ontouchstart={handleTouchStart}
			ontouchend={handleTouchEnd}
		>
			<div class="weekdays">
				{#each weekDays as weekDay}
					<div>{weekDay}</div>
				{/each}
			</div>

			<div class="calendar">
				{#each calendarDays as day}
					{#if day === null}
						<div class="day empty-day"></div>
					{:else}
						{@const dateString = formatDateForDb(
							currentDate.getFullYear(),
							currentDate.getMonth(),
							day
						)}
						{@const entry = data.calendarEntries.find((item) => item.date === dateString)}

						<div
							class="day"
							class:training={entry?.type === 'training'}
							class:rest={entry?.type === 'rest'}
							class:course={entry?.type === 'course'}
							title={entry?.note ?? ''}
						>
							<span>{day}</span>

							{#if entry?.type === 'training'}
								<small>🏋️</small>
							{:else if entry?.type === 'rest'}
								<small>💤</small>
							{:else if entry?.type === 'course'}
								<small>🎟️</small>
							{:else}
								<small>–</small>
							{/if}

							<div class="day-actions">
								<form method="POST" action="?/addTraining">
									<input type="hidden" name="date" value={dateString} />
									<button type="submit" title="Training hinzufügen">🏋️</button>
								</form>

								<form method="POST" action="?/addRest">
									<input type="hidden" name="date" value={dateString} />
									<button type="submit" title="Rest Day hinzufügen">💤</button>
								</form>

								<form method="POST" action="?/addCourse">
									<input type="hidden" name="date" value={dateString} />
									<button type="submit" title="Kurs hinzufügen">🎟️</button>
								</form>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.profile-page {
		max-width: 1100px;
		margin: 0 auto;
	}

	.profile-header {
		background: linear-gradient(135deg, #ffffff, #fff4ff);
		border-radius: 22px;
		padding: 28px;
		display: flex;
		align-items: center;
		gap: 20px;
		box-shadow: 0 8px 24px rgba(176, 110, 176, 0.18);
		margin-bottom: 28px;
		border: 1px solid rgba(176, 110, 176, 0.18);
	}

	.profile-header p {
		color: #8a6b8a;
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

	.dashboard-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 18px;
		margin-bottom: 28px;
	}

	.dashboard-card {
		background: white;
		border-radius: 18px;
		padding: 22px;
		box-shadow: 0 8px 24px rgba(176, 110, 176, 0.16);
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.dashboard-card span {
		color: #777;
		font-size: 0.9rem;
	}

	.dashboard-card strong {
		font-size: 1.4rem;
		color: #b06eb0;
	}

	.dashboard-card small {
		color: #555;
	}

	.progress-bar {
		width: 100%;
		height: 10px;
		background: #f3dff3;
		border-radius: 999px;
		overflow: hidden;
		margin-top: 6px;
	}

	.progress-fill {
		height: 100%;
		background: #b06eb0;
		border-radius: 999px;
	}

	.smart-hint-card p {
		margin-top: 4px;
		line-height: 1.5;
	}

	.weekly-goal-form {
		display: flex;
		gap: 10px;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 12px;
	}

	.weekly-goal-form label {
		font-weight: 700;
		color: #b06eb0;
	}

	.weekly-goal-form select,
	.weekly-goal-form button {
		border: none;
		border-radius: 10px;
		padding: 8px 12px;
		background: #f8f0f8;
		color: #b06eb0;
		font-weight: 700;
		cursor: pointer;
	}

	.weekly-goal-form button:hover {
		background: #fff0ff;
	}

	.calendar-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 18px;
		margin-bottom: 18px;
		flex-wrap: wrap;
	}

	.calendar-controls {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.calendar-controls button {
		border: none;
		background: #f8f0f8;
		color: #b06eb0;
		border-radius: 10px;
		padding: 7px 10px;
		font-weight: 700;
		cursor: pointer;
	}

	.calendar-controls button:hover {
		background: #fff0ff;
	}

	.calendar-title {
		color: #b06eb0;
		min-width: 160px;
		text-align: center;
	}

	.calendar-swipe {
		touch-action: pan-y;
	}

	.weekdays {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 10px;
		margin-bottom: 8px;
	}

	.weekdays div {
		text-align: center;
		font-weight: 700;
		color: #b06eb0;
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
		border: 2px solid transparent;
	}

	.empty-day {
		background: transparent;
		pointer-events: none;
	}

	.day.training {
		background: #d9f8df;
		border: 2px solid #71c783;
	}

	.day.rest {
		background: #ffe4ee;
		border: 2px solid #d990aa;
	}

	.day.course {
		background: #e7ddff;
		border: 2px solid #9b7de3;
	}

	.day-actions {
		display: flex;
		justify-content: center;
		gap: 6px;
		margin-top: 8px;
		flex-wrap: wrap;
	}

	.day-actions form {
		margin: 0;
	}

	.day-actions button {
		border: none;
		background: white;
		border-radius: 8px;
		padding: 4px 6px;
		cursor: pointer;
	}

	@media (max-width: 768px) {
		.calendar-controls {
			width: 100%;
			justify-content: center;
		}

		.calendar-title {
			width: 100%;
			order: -1;
		}

		.calendar,
		.weekdays {
			gap: 6px;
		}

		.day {
			min-height: 72px;
			padding: 6px;
			font-size: 0.85rem;
		}
	}

	:global(body.dark-mode) {
		background: linear-gradient(to bottom, #1f1a24, #121015);
		color: #f5eaf5;
	}

	:global(body.dark-mode) .profile-header {
		background: linear-gradient(135deg, #2c2432, #3a2a42);
		border: 1px solid rgba(247, 209, 248, 0.18);
		box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
	}

	:global(body.dark-mode) .profile-header p {
		color: #d8c2dc;
	}

	:global(body.dark-mode) .avatar i {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .profile-header h1 {
		color: #f4bdf5;
	}

	:global(body.dark-mode) .stat-card,
	:global(body.dark-mode) .profile-card,
	:global(body.dark-mode) .dashboard-card {
		background: #2c2432;
		color: #f5eaf5;
	}

	:global(body.dark-mode) h1,
	:global(body.dark-mode) h2 {
		color: #f7d1f8;
	}

	:global(body.dark-mode) p,
	:global(body.dark-mode) .hints,
	:global(body.dark-mode) .dashboard-card span,
	:global(body.dark-mode) .dashboard-card small,
	:global(body.dark-mode) .smart-hint-card p {
		color: #ddd;
	}

	:global(body.dark-mode) strong,
	:global(body.dark-mode) .dashboard-card strong {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .day {
		background: #3a2a42;
	}

	:global(body.dark-mode) .day.training {
		background: #23442c;
		border-color: #71c783;
	}

	:global(body.dark-mode) .day.rest {
		background: #4a2634;
		border-color: #d990aa;
	}

	:global(body.dark-mode) .day.course {
		background: #34264a;
		border-color: #b99cff;
	}

	:global(body.dark-mode) .weekdays div,
	:global(body.dark-mode) .calendar-title {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .calendar-controls button,
	:global(body.dark-mode) .weekly-goal-form select,
	:global(body.dark-mode) .weekly-goal-form button {
		background: #3a2a42;
		color: #f7d1f8;
	}

	:global(body.dark-mode) .weekly-goal-form label {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .empty-day {
		background: transparent;
	}

	:global(body.dark-mode) .progress-bar {
		background: #3a2a42;
	}

	:global(body.dark-mode) .progress-fill {
		background: #f7d1f8;
	}
</style>