<script>
	let openIndex = $state(0);

	const faqs = [
		{
			question: 'Was ist GymSense?',
			answer:
				'GymSense ist eine Fitness-Webapp, mit der du Trainings erfassen, Fortschritte verfolgen, Übungen finden, Rezepte ansehen und smarte Trainingstipps erhalten kannst.'
		},
		{
			question: 'Muss ich mich registrieren?',
			answer:
				'Einige Inhalte wie Übungen und Rezepte sind auch ohne Login sichtbar. Für Training, Fortschritt, Profil, Kalender und persönliche Daten brauchst du ein Konto.'
		},
		{
			question: 'Wie starte ich ein Training?',
			answer:
				'Nach dem Login kannst du unter „Trainingspläne“ einen Plan auswählen oder direkt über „Training“ ein eigenes Training erfassen.'
		},
		{
			question: 'Wie speichere ich eine Lieblingsübung?',
			answer:
				'Gehe zur Übungsseite, suche eine Übung und speichere sie als Favorit. Danach erscheint sie in deinem Profil.'
		},
		{
			question: 'Was bedeutet der PR-Badge?',
			answer:
				'Der PR-Badge zeigt an, dass du bei einer Übung einen neuen persönlichen Rekord erreicht hast.'
		},
		{
			question: 'Kann ich GymSense im Dark Mode verwenden?',
			answer:
				'Ja, GymSense unterstützt einen vollständigen Dark Mode. Du kannst ihn über den Button in der Navigation aktivieren.'
		},
		{
			question: 'Sind meine Daten echt mit Apple Health verbunden?',
			answer:
				'Nein, die Apple-Health-Funktion ist aktuell ein Prototyp. Die Schritte können manuell eingetragen und gespeichert werden.'
		}
	];

	function toggleFaq(index) {
		openIndex = openIndex === index ? null : index;
	}
</script>

<section class="help-page">
	<div class="help-hero">
		<span>FAQ / Help</span>
		<h1>Wie können wir dir helfen?</h1>
		<p>
			Hier findest du Antworten auf die wichtigsten Fragen rund um GymSense.
		</p>
	</div>

	<div class="faq-list">
		{#each faqs as faq, index}
			<div class="faq-item">
				<button type="button" class="faq-question" onclick={() => toggleFaq(index)}>
					<span>{faq.question}</span>
					<i class={openIndex === index ? 'bi bi-chevron-up' : 'bi bi-chevron-down'}></i>
				</button>

				{#if openIndex === index}
					<p class="faq-answer">{faq.answer}</p>
				{/if}
			</div>
		{/each}
	</div>

	<div class="help-contact-box">
		<h2>Keine passende Antwort gefunden?</h2>
		<p>Dann kontaktiere uns direkt über das Kontaktformular.</p>
		<a href="/contact">Kontaktformular öffnen</a>
	</div>
</section>

<style>
	.help-page {
		max-width: 900px;
		margin: 0 auto;
	}

	.help-hero {
		background: linear-gradient(135deg, #ffffff, #fff4ff);
		border-radius: 24px;
		padding: 36px;
		text-align: center;
		box-shadow: 0 10px 28px rgba(176, 110, 176, 0.18);
		margin-bottom: 28px;
	}

	.help-hero span {
		color: #b06eb0;
		font-weight: 800;
	}

	.help-hero h1 {
		color: #b06eb0;
		font-weight: 800;
		margin: 10px 0;
	}

	.help-hero p {
		color: #6f5d6f;
		margin: 0;
	}

	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.faq-item {
		background: white;
		border-radius: 18px;
		box-shadow: 0 8px 22px rgba(176, 110, 176, 0.14);
		overflow: hidden;
	}

	.faq-question {
		width: 100%;
		border: none;
		background: transparent;
		padding: 18px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: 800;
		color: #b06eb0;
		cursor: pointer;
		text-align: left;
	}

	.faq-answer {
		padding: 0 20px 20px;
		color: #555;
		line-height: 1.6;
	}

	.help-contact-box {
		margin-top: 30px;
		background: #fff0ff;
		border-radius: 22px;
		padding: 26px;
		text-align: center;
	}

	.help-contact-box h2 {
		color: #b06eb0;
	}

	.help-contact-box p {
		color: #555;
	}

	.help-contact-box a {
		display: inline-block;
		background: #b06eb0;
		color: white;
		text-decoration: none;
		border-radius: 12px;
		padding: 10px 18px;
		font-weight: 800;
	}

	:global(body.dark-mode) .help-hero,
	:global(body.dark-mode) .faq-item {
		background: #2c2432;
		color: #f5eaf5;
	}

	:global(body.dark-mode) .help-hero h1,
	:global(body.dark-mode) .help-hero span,
	:global(body.dark-mode) .faq-question,
	:global(body.dark-mode) .help-contact-box h2 {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .help-hero p,
	:global(body.dark-mode) .faq-answer,
	:global(body.dark-mode) .help-contact-box p {
		color: #ddd;
	}

	:global(body.dark-mode) .help-contact-box {
		background: #3a2a42;
	}
</style>