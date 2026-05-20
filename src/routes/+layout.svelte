<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
	import logo from '$lib/assets/Logo.png';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import { browser } from '$app/environment';

	let { data, children } = $props();

	let isDarkMode = $state(false);

	$effect(() => {
		if (!browser) return;

		const savedTheme = localStorage.getItem('theme');
		if (savedTheme === 'dark') {
			isDarkMode = true;
			document.body.classList.add('dark-mode');
		}
	});

	function toggleDarkMode() {
		isDarkMode = !isDarkMode;

		if (isDarkMode) {
			document.body.classList.add('dark-mode');
			localStorage.setItem('theme', 'dark');
		} else {
			document.body.classList.remove('dark-mode');
			localStorage.setItem('theme', 'light');
		}
	}

	let coachOpen = $state(false);
	let coachInput = $state('');
	let coachMessages = $state([
		{
			from: 'bot',
			text: data.user
				? 'Hallo, ich bin dein GymSense Coach. Du kannst mich z.B. fragen: Was soll ich heute trainieren? Wie bleibe ich motiviert? Was bedeutet mein Fortschritt?'
				: 'Hallo, ich bin dein GymSense Coach. Du kannst mich z.B. fragen: Wie werde ich Teil von GymSense? Was sind die Vorteile? Wen kann ich kontaktieren?'
		}
	]);

	const suggestedQuestions = $derived(
		data.user
			? [
					'Was soll ich heute trainieren?',
					'Wie bleibe ich motiviert?',
					'Was bedeutet mein Fortschritt?',
					'Wann soll ich Rest Day machen?'
				]
			: [
					'Wie werde ich Teil von GymSense?',
					'Was sind die Vorteile?',
					'Warum sollte ich GymSense verwenden?',
					'Wen kann ich kontaktieren?'
				]
	);

	function answerCoach(question) {
		const q = question.toLowerCase();
		if (!data.user) {
		if (
			q.includes('kontakt') ||
			q.includes('kontaktieren') ||
			q.includes('email') ||
			q.includes('telefon') ||
			q.includes('hilfe')
		) {
			return 'Du kannst GymSense per E-Mail unter info@gymsense.ch oder telefonisch unter +41 79 123 45 67 kontaktieren.';
		}

		if (
			q.includes('teil') ||
			q.includes('mitglied') ||
			q.includes('anmelden') ||
			q.includes('registrieren') ||
			q.includes('starten')
		) {
			return 'Du kannst Teil von GymSense werden, indem du dich anmeldest oder kostenlos registrierst. Klicke oben rechts auf „Anmelden“ oder „Registrieren“, um zu starten.';
		}

		if (
			q.includes('vorteil') ||
			q.includes('vorteile') ||
			q.includes('warum') ||
			q.includes('verwenden') ||
			q.includes('nutzen')
		) {
			return 'GymSense hilft dir, dein Training strukturierter zu planen, Fortschritte sichtbar zu machen, Übungen besser zu finden und motiviert dranzubleiben.';
		}

		if (
			q.includes('was ist') ||
			q.includes('gymsense') ||
			q.includes('funktion')
		) {
			return 'GymSense ist eine Fitness-Webapp für Trainingsdokumentation, Fortschrittsanzeige, Übungen, Rezepte, Kursfinder und smarte Coaching-Unterstützung.';
		}

		return 'Du bist aktuell nicht eingeloggt. Ich kann dir erklären, was GymSense ist, welche Vorteile die App bietet, wie du dich registrierst oder wie du Kontakt aufnehmen kannst.';
	}

		const stepsToday = data.user?.healthStepsToday ?? 0;
		const stepGoal = data.user?.healthStepGoal ?? 8000;
		const weeklyProgress = data.weeklyProgress;
		const currentStreak = data.currentStreak ?? 0;
		const favoriteExercise = data.favoriteExercise;

		if (q.includes('heute') || q.includes('trainieren') || q.includes('empfehlung')) {
			if (stepsToday < 3000) {
				return `Du hast heute erst ${stepsToday.toLocaleString('de-CH')} Schritte gemacht. Ich empfehle dir heute ein leichtes Ganzkörpertraining, damit du aktiv bleibst, ohne dich zu überlasten.`;
			}

			if (stepsToday < stepGoal) {
				return `Du hast heute ${stepsToday.toLocaleString('de-CH')} von ${stepGoal.toLocaleString('de-CH')} Schritten erreicht. Ein normales Krafttraining oder ein Spaziergang wäre heute passend.`;
			}

			return `Du hast dein Schrittziel heute erreicht. Ich empfehle dir Mobility, Stretching oder ein leichtes Regenerationstraining.`;
		}

		if (q.includes('schritte') || q.includes('laufen')) {
			return `Heute hast du ${stepsToday.toLocaleString('de-CH')} Schritte. Dein Tagesziel liegt bei ${stepGoal.toLocaleString('de-CH')} Schritten.`;
		}

		if (q.includes('wochenziel')) {
			return `Dein aktuelles Wochenziel liegt bei ${weeklyProgress?.goal ?? 0} Trainings. Du hast bisher ${weeklyProgress?.current ?? 0} geschafft.`;
		}

		if (q.includes('streak')) {
			return `Dein aktueller Trainings-Streak liegt bei ${currentStreak} Tagen. Bleib dran, auch ein kurzes Training zählt.`;
		}

		if (q.includes('lieblingsübung') || q.includes('favorit')) {
			if (favoriteExercise) {
				return `Deine Lieblingsübung ist ${favoriteExercise}. Du könntest sie heute in dein Training einbauen.`;
			}

			return 'Du hast noch keine Lieblingsübung gewählt. Speichere eine Übung als Favorit, damit ich dir persönlichere Tipps geben kann.';
		}

		if (q.includes('rest') || q.includes('pause')) {
			if (currentStreak >= 3 || stepsToday >= stepGoal) {
				return 'Ein Rest Day wäre heute sinnvoll, weil du bereits aktiv warst oder mehrere Trainingstage hintereinander geschafft hast.';
			}

			return 'Ein Rest Day ist sinnvoll, wenn du müde bist, Muskelkater hast oder dich nicht gut erholt fühlst.';
		}

		return 'Ich bin dein GymSense Coach. Du kannst mich z.B. fragen: Was soll ich heute trainieren? Wie viele Schritte habe ich? Wie läuft mein Wochenziel? Brauche ich einen Rest Day?';
	}

	function sendCoachMessage(message = coachInput) {
		if (!message.trim()) return;

		coachMessages = [
			...coachMessages,
			{ from: 'user', text: message },
			{ from: 'bot', text: answerCoach(message) }
		];

		coachInput = '';
	}
</script>

<nav class="navbar navbar-expand-lg custom-navbar">
	<div class="container-fluid">
		<a class="navbar-brand d-flex align-items-center gap-2" href="/">
			<img src={logo} alt="GymSense Logo" class="logo-img" />
		</a>

		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#mainNavbar"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="mainNavbar">
			<div class="navbar-nav me-auto">
				<a class="nav-link" href="/">Startseite</a>
				<a class="nav-link" href="/exercises">Übungen</a>
				<a class="nav-link" href="/recipes">Rezepte</a>

				{#if data.user}
					<a class="nav-link" href="/plans">Trainingspläne</a>
					<a class="nav-link" href="/training">Training</a>
					<a class="nav-link" href="/progress">Fortschritt</a>
					<a class="nav-link" href="/discover">Kursfinder</a>
					
				{/if}
			</div>

			<div class="d-flex align-items-center gap-2">
				{#if data.user}
					<div class="profile-menu">
						<a href="/profile" class="profile-link" title="Profil">
							<i class="bi bi-person-circle"></i>
							<span>{data.user.name}</span>
						</a>
					</div>

					<button class="btn theme-btn" type="button" onclick={toggleDarkMode}>
						{#if isDarkMode}
							<i class="bi bi-sun-fill me-1"></i> Light
						{:else}
							<i class="bi bi-moon-stars-fill me-1"></i> Dark
						{/if}
					</button>

					<form method="POST" action="/logout">
						<button class="btn auth-btn" type="submit">
							<i class="bi bi-box-arrow-right me-1"></i> Abmelden
						</button>
					</form>
				{:else}
					<button class="btn theme-btn" type="button" onclick={toggleDarkMode}>
						{#if isDarkMode}
							<i class="bi bi-sun-fill me-1"></i> Light
						{:else}
							<i class="bi bi-moon-stars-fill me-1"></i> Dark
						{/if}
					</button>

					<a class="btn auth-btn" href="/login">
						<i class="bi bi-box-arrow-in-right me-1"></i> Anmelden
					</a>
					<a class="btn auth-btn" href="/register">
						<i class="bi bi-person-plus-fill me-1"></i> Registrieren
					</a>
				{/if}
			</div>
		</div>
	</div>
</nav>

<main class="page-content">
	{@render children()}
</main>

<div class="coach-widget">
	{#if coachOpen}
		<div class="coach-box">
			<div class="coach-header">
				<div>
					<strong>GymSense Coach</strong>
					<small>Dein smarter Fitness-Assistent</small>
				</div>

				<button type="button" onclick={() => (coachOpen = false)}>×</button>
			</div>

			<div class="coach-messages">
				{#each coachMessages as message}
					<div class:bot-message={message.from === 'bot'} class:user-message={message.from === 'user'}>
						{message.text}
					</div>
				{/each}
			</div>

			<div class="coach-suggestions">
				{#each suggestedQuestions as question}
					<button type="button" onclick={() => sendCoachMessage(question)}>
						{question}
					</button>
				{/each}
			</div>

			<div class="coach-input">
				<input
					type="text"
					bind:value={coachInput}
					placeholder="Frage deinen Coach..."
					onkeydown={(event) => {
						if (event.key === 'Enter') sendCoachMessage();
					}}
				/>

				<button type="button" onclick={() => sendCoachMessage()}>
					Senden
				</button>
			</div>
		</div>
	{/if}

	<button type="button" class="coach-toggle" onclick={() => (coachOpen = !coachOpen)}>
		<i class="bi bi-chat-dots-fill"></i>
	</button>
</div>

<footer class="footer">
	<div class="footer-content">
		<div class="footer-section">
			<h4>GymSense</h4>
			<p>Dein smarter Trainingsbegleiter für mehr Fortschritt im Gym.</p>
		</div>

		<div class="footer-section">
			<h4>Kontakt</h4>
			<p>Email: info@gymsense.ch</p>
			<p>Telefon: +41 79 123 45 67</p>
		</div>

		<div class="footer-section">
			<h4>Navigation</h4>

			<a href="/">Startseite</a>
			<a href="/exercises">Übungen</a>
			<a href="/recipes">Rezepte</a>

			{#if data.user}
				<a href="/training">Training</a>
				<a href="/progress">Fortschritt</a>
				<a href="/plans">Trainingspläne</a>
			{/if}
		</div>
	</div>

	<div class="footer-bottom">© 2026 GymSense – All rights reserved</div>
</footer>

<style>
	:global(body) {
		margin: 0;
		background: linear-gradient(to bottom, #fff8ff, #f8f0f8);
		font-family: Arial, sans-serif;
	}

	.custom-navbar {
		background: #f7d1f8;
		min-height: 90px;
	}

	.logo-img {
		height: 64px;
		width: auto;
		object-fit: contain;
	}

	.nav-link {
		color: white;
		font-weight: 700;
		margin-right: 18px;
	}

	.nav-link:hover {
		color: #b06eb0;
	}

	.auth-btn {
		background: #b06eb0;
		color: white;
		font-weight: 700;
		border-radius: 8px;
		padding: 8px 14px;
		font-size: 0.95rem;
	}

	.auth-btn:hover {
		background: #9a5a9a;
		color: white;
	}

	.theme-btn {
		background: transparent;
		color: white;
		font-weight: 700;
		border-radius: 8px;
		border: 2px solid white;
		padding: 8px 14px;
		font-size: 0.95rem;
	}

	.theme-btn:hover {
		background: white;
		color: #b06eb0;
	}

	.profile-link {
		display: flex;
		align-items: center;
		gap: 8px;
		color: white;
		text-decoration: none;
		font-weight: 700;
	}

	.profile-link i {
		font-size: 1.8rem;
	}

	.profile-link:hover {
		color: #b06eb0;
	}

	.profile-menu {
		display: flex;
		align-items: center;
	}

	.page-content {
		padding: 24px;
	}

	.footer {
		background: #b06eb0;
		color: white;
		margin-top: 60px;
		padding: 40px 20px 20px;
	}

	.footer-content {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		gap: 30px;
		max-width: 1000px;
		margin: 0 auto;
	}

	.footer-section {
		max-width: 250px;
	}

	.footer-section h4 {
		margin-bottom: 10px;
	}

	.footer-section p {
		margin: 4px 0;
		font-size: 0.9rem;
	}

	.footer-section a {
		display: block;
		color: white;
		text-decoration: none;
		margin-bottom: 6px;
		font-size: 0.9rem;
	}

	.footer-section a:hover {
		text-decoration: underline;
	}

	.footer-bottom {
		text-align: center;
		margin-top: 30px;
		font-size: 0.8rem;
		opacity: 0.8;
	}

	/* Dark Mode */
	:global(body.dark-mode) {
		background: linear-gradient(to bottom, #1f1a24, #121015);
		color: #f5eaf5;
	}

	:global(body.dark-mode) .custom-navbar {
		background: #2a2030;
	}

	:global(body.dark-mode) .footer {
		background: #2a2030;
	}

	:global(body.dark-mode) .stat-card,
	:global(body.dark-mode) .profile-card,
	:global(body.dark-mode) .progress-card,
	:global(body.dark-mode) .exercise-card,
	:global(body.dark-mode) .empty {
		background: #2c2432;
		color: #f5eaf5;
	}

	:global(body.dark-mode) h1,
	:global(body.dark-mode) h2 {
		color: #f7d1f8;
	}

	:global(body.dark-mode) p,
	:global(body.dark-mode) .label,
	:global(body.dark-mode) .hints,
	:global(body.dark-mode) .muscle {
		color: #ddd;
	}

	:global(body.dark-mode) strong {
		color: #ffffff;
	}

	:global(body.dark-mode) .difference {
		background: #3a2a42;
		color: #f7d1f8;
	}

	:global(body.dark-mode) .day {
		background: #3a2a42;
	}

	:global(body.dark-mode) .day.training {
		background: #23442c;
	}

	:global(body.dark-mode) .day.rest {
		background: #4a2634;
	}
	.coach-widget {
	position: fixed;
	right: 22px;
	bottom: 22px;
	z-index: 9999;
}

.coach-toggle {
	width: 58px;
	height: 58px;
	border-radius: 50%;
	border: none;
	background: #b06eb0;
	color: white;
	font-size: 1.4rem;
	box-shadow: 0 10px 28px rgba(176, 110, 176, 0.35);
	cursor: pointer;
}

.coach-box {
	width: 340px;
	max-width: calc(100vw - 32px);
	background: white;
	border-radius: 22px;
	box-shadow: 0 14px 40px rgba(0, 0, 0, 0.18);
	overflow: hidden;
	margin-bottom: 14px;
	border: 1px solid rgba(176, 110, 176, 0.16);
}

.coach-header {
	background: #b06eb0;
	color: white;
	padding: 16px;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}

.coach-header small {
	display: block;
	font-size: 0.8rem;
	opacity: 0.9;
}

.coach-header button {
	background: transparent;
	border: none;
	color: white;
	font-size: 1.6rem;
	line-height: 1;
	cursor: pointer;
}

.coach-messages {
	padding: 14px;
	max-height: 260px;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.bot-message,
.user-message {
	padding: 10px 12px;
	border-radius: 14px;
	font-size: 0.9rem;
	line-height: 1.4;
}

.bot-message {
	background: #f8f0f8;
	color: #333;
	align-self: flex-start;
}

.user-message {
	background: #b06eb0;
	color: white;
	align-self: flex-end;
}

.coach-suggestions {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	padding: 0 14px 14px;
}

.coach-suggestions button {
	border: none;
	background: #fff0ff;
	color: #b06eb0;
	border-radius: 999px;
	padding: 7px 10px;
	font-size: 0.8rem;
	font-weight: 700;
	cursor: pointer;
}

.coach-input {
	display: flex;
	gap: 8px;
	padding: 14px;
	border-top: 1px solid #f3dff3;
}

.coach-input input {
	flex: 1;
	border: 1px solid #f0d6f0;
	border-radius: 12px;
	padding: 10px;
}

.coach-input button {
	border: none;
	background: #b06eb0;
	color: white;
	border-radius: 12px;
	padding: 10px 12px;
	font-weight: 700;
}

:global(body.dark-mode) .coach-box {
	background: #2c2432;
	border: 1px solid rgba(247, 209, 248, 0.18);
}

:global(body.dark-mode) .coach-header {
	background: #3a2a42;
	color: #f7d1f8;
}

:global(body.dark-mode) .bot-message {
	background: #3a2a42;
	color: #f5eaf5;
}

:global(body.dark-mode) .user-message {
	background: #f7d1f8;
	color: #2c2432;
}

:global(body.dark-mode) .coach-suggestions button {
	background: #3a2a42;
	color: #f7d1f8;
}

:global(body.dark-mode) .coach-input {
	border-top: 1px solid rgba(247, 209, 248, 0.18);
}

:global(body.dark-mode) .coach-input input {
	background: #3a2a42;
	color: #f5eaf5;
	border: 1px solid rgba(247, 209, 248, 0.2);
}

:global(body.dark-mode) .coach-input input::placeholder {
	color: #c7b2cc;
}
</style>