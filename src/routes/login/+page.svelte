<script>
	let { form } = $props();
	let showPassword = $state(false);
</script>

<svelte:head>
	<title>Anmelden | GymSense</title>
</svelte:head>

<div class="container py-5">
	<div class="row justify-content-center">
		<div class="col-12 col-md-8 col-lg-5">
			<div class="card shadow-lg border-0 rounded-4 auth-card">
				<div class="card-body p-4 p-md-5">
					<div class="text-center mb-4">
						<h1 class="h2 fw-bold mb-2">Anmelden</h1>
						<p class="text-muted mb-0">Willkommen zurück bei GymSense</p>
					</div>

					{#if form?.error}
						<div class="alert alert-danger rounded-3" role="alert">
							{form.error}
						</div>
					{/if}

					<form method="POST" class="d-flex flex-column gap-3">
						<div>
							<label for="email" class="form-label fw-semibold">E-Mail</label>
							<input
								id="email"
								name="email"
								type="email"
								class="form-control form-control-lg rounded-3"
								placeholder="name@example.com"
								required
							/>
						</div>

						<div>
							<label for="password" class="form-label fw-semibold">Passwort</label>
							<div class="input-group input-group-lg">
								<input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									class="form-control rounded-start-3"
									placeholder="Dein Passwort"
									required
								/>
								<button
									type="button"
									class="btn btn-outline-secondary rounded-end-3"
									on:click={() => (showPassword = !showPassword)}
									aria-label="Passwort anzeigen"
								>
									{showPassword ? '🙈' : '👁'}
								</button>
							</div>
						</div>

						<button type="submit" class="btn btn-lg w-100 rounded-3 login-btn">
							Anmelden
						</button>
					</form>

					<p class="text-center text-muted mt-4 mb-0">
						Noch kein Konto?
						<a href="/register" class="fw-semibold text-decoration-none">Jetzt registrieren</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.auth-card {
		animation: fadeUp 0.45s ease;
		transition: transform 0.2s;
	}

	.auth-card:hover {
		transform: translateY(-4px);
	}

	.login-btn {
		background: linear-gradient(135deg, #b06eb0, #d18ad1);
		border: none;
		color: white;
		transition:
			transform 0.2s ease,
			background-color 0.2s ease;
	}

	.login-btn:hover {
		background: #9a5c9a;
		color: white;
		transform: translateY(-1px);
	}

	.form-control:focus {
		outline: none;
		box-shadow: 0 0 0 2px rgba(176, 110, 176, 0.3);
		border-color: #b06eb0;
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	:global(body.dark-mode) {
		background: linear-gradient(to bottom, #1f1a24, #121015);
		color: #f5eaf5;
	}

	:global(body.dark-mode) .auth-card {
		background: #2c2432;
		color: #f5eaf5;
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(247, 209, 248, 0.18);
	}

	:global(body.dark-mode) h1 {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .text-muted {
		color: #c7b2cc !important;
	}

	:global(body.dark-mode) .form-control {
		background: #3a2a42;
		color: #f5eaf5;
		border: 1px solid rgba(247, 209, 248, 0.25);
	}

	:global(body.dark-mode) .form-control::placeholder {
		color: #bda8c2;
	}

	:global(body.dark-mode) .form-control:focus {
		border-color: #f7d1f8;
		box-shadow: 0 0 0 2px rgba(247, 209, 248, 0.25);
	}

	:global(body.dark-mode) .btn-outline-secondary {
		background: #3a2a42;
		color: #f5eaf5;
		border: 1px solid rgba(247, 209, 248, 0.25);
	}

	:global(body.dark-mode) .btn-outline-secondary:hover {
		background: #4a3552;
	}

	:global(body.dark-mode) .login-btn {
		background: #f7d1f8;
		color: #2c2432;
	}

	:global(body.dark-mode) .login-btn:hover {
		background: #e8b9ea;
		color: #2c2432;
	}

	:global(body.dark-mode) .alert-danger {
		background: #4a2634;
		color: #ffb3c7;
		border: 1px solid rgba(255, 179, 199, 0.2);
	}

	:global(body.dark-mode) a {
		color: #f7d1f8;
	}

	:global(body.dark-mode) a:hover {
		color: #e8b9ea;
	}
</style>