<script>
	let { form } = $props();
	let showPassword = false;
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
	}

	.login-btn {
		background-color: #b06eb0;
		border: none;
		color: white;
		transition:
			transform 0.2s ease,
			background-color 0.2s ease;
	}

	.login-btn:hover {
		background-color: #9a5c9a;
		color: white;
		transform: translateY(-1px);
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
</style>