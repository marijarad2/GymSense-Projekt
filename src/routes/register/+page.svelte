<script>
	let { form } = $props();

	let password = $state('');
	let confirmPassword = $state('');
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);

	let hasLength = $derived(password.length >= 11);
	let hasNumber = $derived(/[0-9]/.test(password));
	let hasSpecial = $derived(/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/.test(password));
	let hasUppercase = $derived(/[A-Z]/.test(password));
	let passwordsMatch = $derived(
		password.length > 0 && confirmPassword.length > 0 && password === confirmPassword
	);

	let passedRules = $derived(
		[hasLength, hasNumber, hasSpecial, hasUppercase].filter(Boolean).length
	);

	let strength = $derived(
		password.length === 0
			? ''
			: passedRules <= 2
				? 'schwach'
				: passedRules === 3
					? 'mittel'
					: 'stark'
	);

	let strengthClass = $derived(
		strength === 'schwach'
			? 'strength-weak'
			: strength === 'mittel'
				? 'strength-medium'
				: strength === 'stark'
					? 'strength-strong'
					: ''
	);
</script>

<svelte:head>
	<title>Registrieren | GymSense</title>
</svelte:head>

<div class="container py-5">
	<div class="row justify-content-center">
		<div class="col-12 col-md-10 col-lg-6">
			<div class="card shadow-lg border-0 rounded-4 auth-card">
				<div class="card-body p-4 p-md-5">
					<div class="text-center mb-4">
						<h1 class="h2 fw-bold mb-2">Registrieren</h1>
						<p class="text-muted mb-0">Erstelle dein GymSense-Konto</p>
					</div>

					{#if form?.error}
						<div class="alert alert-danger rounded-3" role="alert">
							{form.error}
						</div>
					{/if}

					<form method="POST" class="d-flex flex-column gap-3">
						<div class="row g-3">
							<div class="col-md-6">
								<label for="firstName" class="form-label fw-semibold">Vorname</label>
								<input
									id="firstName"
									name="firstName"
									type="text"
									class="form-control form-control-lg rounded-3"
									placeholder="Vorname"
									required
								/>
							</div>

							<div class="col-md-6">
								<label for="lastName" class="form-label fw-semibold">Nachname</label>
								<input
									id="lastName"
									name="lastName"
									type="text"
									class="form-control form-control-lg rounded-3"
									placeholder="Nachname"
									required
								/>
							</div>
						</div>

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
									placeholder="Mindestens 11 Zeichen"
									bind:value={password}
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

						{#if password}
							<div class="strength-box">
								<div class="strength-header">
									<span class="fw-semibold">Passwort-Stärke:</span>
									<span class={`strength-label ${strengthClass}`}>{strength}</span>
								</div>

								<div class="strength-bar">
									<div class={`strength-fill ${strengthClass}`}></div>
								</div>
							</div>
						{/if}

						<div>
							<label for="confirmPassword" class="form-label fw-semibold">Passwort wiederholen</label>
							<div class="input-group input-group-lg">
								<input
									id="confirmPassword"
									name="confirmPassword"
									type={showConfirmPassword ? 'text' : 'password'}
									class="form-control rounded-start-3"
									placeholder="Passwort wiederholen"
									bind:value={confirmPassword}
									required
								/>
								<button
									type="button"
									class="btn btn-outline-secondary rounded-end-3"
									on:click={() => (showConfirmPassword = !showConfirmPassword)}
								>
									{showConfirmPassword ? '🙈' : '👁'}
								</button>
							</div>
						</div>

						<ul class="password-rules">
							<li class:valid={hasLength}>Mindestens 11 Zeichen</li>
							<li class:valid={hasNumber}>Mindestens eine Zahl</li>
							<li class:valid={hasSpecial}>Mindestens ein Sonderzeichen</li>
							<li class:valid={hasUppercase}>Mindestens ein Grossbuchstabe</li>
						</ul>

						{#if confirmPassword && !passwordsMatch}
							<p class="text-danger mb-0 shake">Passwörter stimmen nicht überein.</p>
						{/if}

						<button type="submit" class="btn btn-lg w-100 rounded-3 register-btn">
							Konto erstellen
						</button>
					</form>

					<p class="text-center text-muted mt-4 mb-0">
						Bereits ein Konto?
						<a href="/login" class="fw-semibold text-decoration-none">Jetzt anmelden</a>
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

	.register-btn {
		background-color: #b06eb0;
		border: none;
		color: white;
		transition:
			transform 0.2s ease,
			background-color 0.2s ease;
	}

	.register-btn:hover {
		background-color: #9a5c9a;
		color: white;
		transform: translateY(-1px);
	}

	.password-rules {
		list-style: none;
		padding-left: 0;
		margin-top: 6px;
		margin-bottom: 0;
		font-size: 0.95rem;
	}

	.password-rules li {
		color: #888;
		margin-bottom: 6px;
		position: relative;
		padding-left: 24px;
		transition: all 0.25s ease;
	}

	.password-rules li::before {
		content: '✖';
		position: absolute;
		left: 0;
		color: #dc3545;
		font-weight: bold;
	}

	.password-rules li.valid {
		color: #198754;
		transform: translateX(2px);
	}

	.password-rules li.valid::before {
		content: '✔';
		color: #198754;
	}

	.strength-box {
		margin-top: -6px;
	}

	.strength-header {
		display: flex;
		justify-content: space-between;
		font-size: 0.95rem;
		margin-bottom: 6px;
	}

	.strength-bar {
		width: 100%;
		height: 10px;
		background: #e9ecef;
		border-radius: 999px;
		overflow: hidden;
	}

	.strength-fill {
		height: 100%;
		border-radius: 999px;
		transition: all 0.35s ease;
	}

	.strength-label {
		text-transform: capitalize;
		font-weight: 700;
	}

	.strength-weak {
		color: #dc3545;
		width: 33%;
		background: #dc3545;
	}

	.strength-medium {
		color: #fd7e14;
		width: 66%;
		background: #fd7e14;
	}

	.strength-strong {
		color: #198754;
		width: 100%;
		background: #198754;
	}

	.shake {
		animation: shake 0.25s ease-in-out 1;
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

	@keyframes shake {
		0% { transform: translateX(0); }
		25% { transform: translateX(-4px); }
		50% { transform: translateX(4px); }
		75% { transform: translateX(-4px); }
		100% { transform: translateX(0); }
	}
</style>