<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
	import logo from '$lib/assets/Logo.png';
  import 'bootstrap-icons/font/bootstrap-icons.css';

	let { data, children } = $props();
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

			<div class="d-flex align-items-center gap-3">
				{#if data.user}
					<a href="/profile" class="profile-link" title="Profil">
						<i class="bi bi-person-circle"></i>
						<span>{data.user.name}</span>
					</a>

					<form method="POST" action="/logout">
						<button class="btn auth-btn" type="submit">Abmelden</button>
					</form>
				{:else}
					<a class="btn auth-btn" href="/login">Anmelden</a>
					<a class="btn auth-btn" href="/register">Registrieren</a>
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

  <div class="footer-bottom">
    © 2026 GymSense – All rights reserved
  </div>
</footer>

<style>
  :global(body) {
    margin: 0;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 90px;
    padding: 0 24px;
    box-sizing: border-box;
    background: #f7d1f8;
    color: white;
    flex-wrap: wrap;
  }

  .left-section {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .logo-img {
    height: 64px;
    width: auto;
    object-fit: contain;
    display: block;
  }

  .nav-links {
    display: flex;
    gap: 28px;
    flex-wrap: wrap;
  }

  .nav-links a {
    color: white;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
  }

  .nav-links a:hover {
    color: #b06eb0;
  }

  .auth-box {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .welcome {
    font-size: 0.95rem;
    font-weight: 500;
  }

  .auth-btn {
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    background: #b06eb0;
    color: white;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
  }

  .auth-btn:hover {
    opacity: 0.9;
  }

  .login-link {
    display: inline-block;
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
}

.auth-btn:hover {
	background: #9a5a9a;
	color: white;
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
</style>