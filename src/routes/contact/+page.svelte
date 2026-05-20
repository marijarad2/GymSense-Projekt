<script>
	let submitted = $state(false);
	let flying = $state(false);

	function submitContact(event) {
		event.preventDefault();

		flying = true;

		setTimeout(() => {
			submitted = true;
			flying = false;
			event.target.reset();
		}, 900);
	}
</script>

<section class="contact-page">
	{#if flying}
		<div class="flying-message">📩</div>
	{/if}

	<div class="contact-hero">
		<span>Kontakt</span>
		<h1>Kontaktiere GymSense</h1>
		<p>
			Hast du Fragen, Feedback oder Verbesserungsvorschläge? Dann schreibe uns direkt.
		</p>
	</div>

	<div class="contact-grid">
		<form class="contact-form" onsubmit={submitContact}>
			<label for="name">Name</label>
			<input id="name" name="name" type="text" placeholder="Dein Name" required />

			<label for="email">E-Mail</label>
			<input id="email" name="email" type="email" placeholder="deine.email@example.com" required />

			<label for="topic">Thema</label>
			<select id="topic" name="topic" required>
				<option value="">Thema auswählen</option>
				<option value="support">Support</option>
				<option value="feedback">Feedback</option>
				<option value="bug">Fehler melden</option>
				<option value="idea">Verbesserungsvorschlag</option>
			</select>

			<label for="message">Nachricht</label>
			<textarea
				id="message"
				name="message"
				rows="6"
				placeholder="Schreibe deine Nachricht..."
				required
			></textarea>

			<button type="submit" class:sending={flying}>
				{flying ? 'Wird gesendet...' : 'Nachricht senden'}
			</button>

			{#if submitted}
				<div class="success-message">
					<i class="bi bi-check-circle-fill"></i>
					Danke! Deine Nachricht wurde erfolgreich erfasst.
				</div>
			{/if}
		</form>

		<div class="contact-info">
			<h2>Direkter Kontakt</h2>

			<div class="info-item">
				<i class="bi bi-envelope-fill"></i>
				<div>
					<strong>E-Mail</strong>
					<p>info@gymsense.ch</p>
				</div>
			</div>

			<div class="info-item">
				<i class="bi bi-telephone-fill"></i>
				<div>
					<strong>Telefon</strong>
					<p>+41 79 123 45 67</p>
				</div>
			</div>

			<div class="info-item">
				<i class="bi bi-clock-fill"></i>
				<div>
					<strong>Antwortzeit</strong>
					<p>In der Regel innerhalb von 1–2 Werktagen.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.contact-page {
		max-width: 1050px;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
	}

	.flying-message {
		position: fixed;
		left: 50%;
		bottom: 80px;
		font-size: 3.2rem;
		z-index: 9999;
		pointer-events: none;
		animation: flyAway 0.9s ease-in-out forwards;
	}

	@keyframes flyAway {
		0% {
			transform: translate(-50%, 0) scale(1) rotate(0deg);
			opacity: 1;
		}

		35% {
			transform: translate(-20%, -120px) scale(1.25) rotate(-12deg);
			opacity: 1;
		}

		100% {
			transform: translate(180px, -420px) scale(0.4) rotate(25deg);
			opacity: 0;
		}
	}

	.contact-hero {
		background: linear-gradient(135deg, #ffffff, #fff4ff);
		border-radius: 24px;
		padding: 36px;
		text-align: center;
		box-shadow: 0 10px 28px rgba(176, 110, 176, 0.18);
		margin-bottom: 28px;
	}

	.contact-hero span {
		color: #b06eb0;
		font-weight: 800;
	}

	.contact-hero h1 {
		color: #b06eb0;
		font-weight: 800;
		margin: 10px 0;
	}

	.contact-hero p {
		color: #6f5d6f;
		margin: 0;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1.4fr 0.8fr;
		gap: 24px;
	}

	.contact-form,
	.contact-info {
		background: white;
		border-radius: 22px;
		padding: 26px;
		box-shadow: 0 8px 24px rgba(176, 110, 176, 0.16);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.contact-form label {
		color: #b06eb0;
		font-weight: 800;
	}

	.contact-form input,
	.contact-form select,
	.contact-form textarea {
		border: 1px solid #f0d6f0;
		border-radius: 12px;
		padding: 11px 13px;
		font: inherit;
	}

	.contact-form input:focus,
	.contact-form select:focus,
	.contact-form textarea:focus {
		outline: none;
		border-color: #b06eb0;
		box-shadow: 0 0 0 2px rgba(176, 110, 176, 0.18);
	}

	.contact-form button {
		border: none;
		background: #b06eb0;
		color: white;
		border-radius: 12px;
		padding: 12px 16px;
		font-weight: 800;
		cursor: pointer;
		margin-top: 8px;
		transition:
			transform 0.2s ease,
			background 0.2s ease,
			opacity 0.2s ease;
	}

	.contact-form button:hover {
		background: #9a5a9a;
		transform: translateY(-2px);
	}

	.contact-form button.sending {
		opacity: 0.75;
		cursor: wait;
	}

	.success-message {
		background: #e9f8ef;
		color: #2f8f55;
		border-radius: 12px;
		padding: 12px;
		font-weight: 700;
		display: flex;
		gap: 8px;
		align-items: center;
		animation: successPop 0.35s ease-out;
	}

	@keyframes successPop {
		0% {
			transform: scale(0.95);
			opacity: 0;
		}

		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	.contact-info h2 {
		color: #b06eb0;
		margin-bottom: 20px;
	}

	.info-item {
		display: flex;
		gap: 14px;
		margin-bottom: 20px;
		align-items: flex-start;
	}

	.info-item i {
		color: #b06eb0;
		font-size: 1.4rem;
	}

	.info-item strong {
		color: #333;
	}

	.info-item p {
		color: #555;
		margin: 4px 0 0;
	}

	@media (max-width: 850px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}

	:global(body.dark-mode) .contact-hero,
	:global(body.dark-mode) .contact-form,
	:global(body.dark-mode) .contact-info {
		background: #2c2432;
		color: #f5eaf5;
	}

	:global(body.dark-mode) .contact-hero h1,
	:global(body.dark-mode) .contact-hero span,
	:global(body.dark-mode) .contact-form label,
	:global(body.dark-mode) .contact-info h2,
	:global(body.dark-mode) .info-item i {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .contact-hero p,
	:global(body.dark-mode) .info-item p {
		color: #ddd;
	}

	:global(body.dark-mode) .info-item strong {
		color: white;
	}

	:global(body.dark-mode) .contact-form input,
	:global(body.dark-mode) .contact-form select,
	:global(body.dark-mode) .contact-form textarea {
		background: #3a2a42;
		color: #f5eaf5;
		border: 1px solid rgba(247, 209, 248, 0.2);
	}

	:global(body.dark-mode) .contact-form input::placeholder,
	:global(body.dark-mode) .contact-form textarea::placeholder {
		color: #c7b2cc;
	}
</style>