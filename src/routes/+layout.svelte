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

				{#if data.user}
					<a class="nav-link" href="/plans">Trainingspläne</a>
					<a class="nav-link" href="/training">Training</a>
					<a class="nav-link" href="/progress">Fortschritt</a>
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
			<a href="/training">Training</a>
			<a href="/progress">Fortschritt</a>
			<a href="/exercises">Übungen</a>
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
</style>