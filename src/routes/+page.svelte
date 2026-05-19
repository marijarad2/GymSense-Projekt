<script>
	import HeroSection from '$lib/components/HeroSection.svelte';
	import { page } from '$app/state';

	let { data } = $props();

	const isNewUser = $derived(page.url.searchParams.get('registered') === 'true');
</script>

{#if data.user}
	<section class="welcome-hero">
		<div class="confetti">
			<span>🎉</span>
			<span>✨</span>
			<span>💪</span>
			<span>🏋️</span>
			<span>🔥</span>
			<span>⭐</span>
		</div>

		<div class="welcome-content">
        <p class="welcome-label">
        {#if isNewUser}
          Willkommen bei GymSense 🚀
        {:else}
          Schön, dass du zurück bist 💪
        {/if}
      </p>
			<h1>Willkommen bei GymSense, {data.user.name}! 🎉</h1>
			<p>
				Starte dein nächstes Training, prüfe deinen Fortschritt oder frage deinen GymSense Coach.
			</p>

			<div class="welcome-actions">
				<a href="/training">Training starten</a>
				<a href="/progress" class="secondary">Fortschritt ansehen</a>
			</div>
		</div>
	</section>
{:else}
	<HeroSection />
{/if}

<section class="home-info">
	<h1 class="slogan">Train smarter. Not just harder.</h1>

	<h2>Willkommen bei GymSense</h2>

	<p>
		GymSense ist dein intelligenter Trainingsbegleiter für ein strukturiertes und effektives
		Workout. Die Anwendung unterstützt dich dabei, deine Trainings systematisch zu
		dokumentieren, Fortschritte sichtbar zu machen und deine Leistung kontinuierlich zu verbessern.
	</p>

	<p>
		Egal ob Einsteiger:in oder Fortgeschrittene:r – GymSense hilft dir, den Überblick über deine
		Übungen, Gewichte und Wiederholungen zu behalten.
	</p>

	<p>
		Zusätzlich bietet GymSense kontextbasierte Unterstützung, beispielsweise durch
		Videoempfehlungen bei neuen Übungen oder Hinweise zur Trainingsoptimierung.
	</p>
</section>

<section class="benefits">
	<h3>Deine Vorteile</h3>

	<div class="benefit-list">
		<div class="benefit-item">✔ Trainings einfach erfassen</div>
		<div class="benefit-item">✔ Fortschritte klar erkennen</div>
		<div class="benefit-item">✔ Übungen korrekt ausführen</div>
		<div class="benefit-item">✔ Smarte Trainingsunterstützung</div>
	</div>
</section>

<section class="how-it-works">
	<h3>So funktioniert GymSense</h3>

	<div class="steps">
		<div class="step">
			<h4>1. Training erfassen</h4>
			<p>Erstelle dein Training und füge Übungen, Gewichte und Wiederholungen hinzu.</p>
		</div>

		<div class="step">
			<h4>2. Fortschritt verfolgen</h4>
			<p>Vergleiche deine Leistungen und erkenne deine Entwicklung über Zeit.</p>
		</div>

		<div class="step">
			<h4>3. Smarter trainieren</h4>
			<p>Erhalte Hinweise, Vorschläge und Videoempfehlungen für bessere Ergebnisse.</p>
		</div>
	</div>
</section>

<section class="why">
	<h3>Warum GymSense?</h3>

	<p>
		Viele Fitness-Apps sind kompliziert und überladen. GymSense konzentriert sich bewusst auf das
		Wesentliche: eine einfache Trainingsdokumentation, klare Fortschrittsanzeige und intelligente
		Unterstützung im richtigen Moment.
	</p>

	<p>
		Die Anwendung hilft dir, dein Training effizienter zu gestalten, Fehler zu vermeiden und
		langfristig motiviert zu bleiben – ganz ohne unnötige Komplexität.
	</p>
</section>

<style>
	.welcome-hero {
		position: relative;
		min-height: 520px;
		border-radius: 28px;
		margin: 24px auto 40px;
		max-width: 1400px;
		overflow: hidden;
		background:
			linear-gradient(rgba(40, 24, 45, 0.45), rgba(40, 24, 45, 0.55)),
			linear-gradient(135deg, #f7d1f8, #b06eb0);
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		box-shadow: 0 18px 50px rgba(176, 110, 176, 0.28);
	}

	.welcome-content {
		position: relative;
		z-index: 2;
		color: white;
		max-width: 760px;
		padding: 40px;
		animation: welcomePop 0.8s ease;
	}

	.welcome-label {
		display: inline-block;
		background: rgba(255, 255, 255, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.35);
		padding: 8px 14px;
		border-radius: 999px;
		font-weight: 700;
		margin-bottom: 18px;
	}

	.welcome-content h1 {
		font-size: clamp(2.4rem, 5vw, 4.4rem);
		font-weight: 900;
		margin-bottom: 16px;
	}

	.welcome-content p {
		font-size: 1.15rem;
		color: white;
	}

	.welcome-actions {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 14px;
		margin-top: 28px;
	}

	.welcome-actions a {
		background: white;
		color: #b06eb0;
		padding: 14px 22px;
		border-radius: 16px;
		font-weight: 800;
		text-decoration: none;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.welcome-actions a:hover {
		transform: translateY(-3px);
		box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
	}

	.welcome-actions .secondary {
		background: rgba(255, 255, 255, 0.18);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.45);
	}

	.confetti span {
		position: absolute;
		top: -40px;
		font-size: 2rem;
		animation: confettiFall 4s linear infinite;
		z-index: 1;
	}

	.confetti span:nth-child(1) {
		left: 10%;
		animation-delay: 0s;
	}

	.confetti span:nth-child(2) {
		left: 25%;
		animation-delay: 0.5s;
	}

	.confetti span:nth-child(3) {
		left: 40%;
		animation-delay: 1s;
	}

	.confetti span:nth-child(4) {
		left: 60%;
		animation-delay: 1.5s;
	}

	.confetti span:nth-child(5) {
		left: 75%;
		animation-delay: 2s;
	}

	.confetti span:nth-child(6) {
		left: 90%;
		animation-delay: 2.5s;
	}

	@keyframes confettiFall {
		0% {
			transform: translateY(-40px) rotate(0deg);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		100% {
			transform: translateY(620px) rotate(360deg);
			opacity: 0;
		}
	}

	@keyframes welcomePop {
		from {
			opacity: 0;
			transform: scale(0.92) translateY(24px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.home-info {
		padding: 40px 24px;
		max-width: 900px;
		margin: 0 auto;
		text-align: center;
	}

	.slogan {
		font-size: 2rem;
		margin-bottom: 30px;
		color: #b06eb0;
	}

	.home-info h2 {
		margin-bottom: 16px;
	}

	.home-info p {
		max-width: 700px;
		margin: 0 auto 16px;
		line-height: 1.6;
	}

	.benefits {
		margin-top: 60px;
		padding: 60px 20px;
		background: linear-gradient(135deg, #f7e4f5, #e2a3dc);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.benefits h3 {
		font-size: 1.8rem;
		margin-bottom: 30px;
	}

	.benefit-list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
		max-width: 600px;
		width: 100%;
	}

	.benefit-item {
		background: white;
		padding: 15px;
		border-radius: 12px;
		font-weight: 500;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
	}

	.benefit-item:hover {
		transform: translateY(-5px);
		transition: 0.2s;
	}

	.how-it-works {
		padding: 60px 20px;
		text-align: center;
	}

	.how-it-works h3 {
		font-size: 1.8rem;
		margin-bottom: 40px;
	}

	.steps {
		display: flex;
		justify-content: center;
		gap: 30px;
		flex-wrap: wrap;
	}

	.step {
		max-width: 250px;
		background: #fff;
		padding: 20px;
		border-radius: 12px;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
	}

	.step h4 {
		margin-bottom: 10px;
	}

	.why {
		padding: 60px 20px;
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}

	.why h3 {
		font-size: 1.8rem;
		margin-bottom: 20px;
	}

	.why p {
		margin-bottom: 16px;
		line-height: 1.6;
	}

	:global(body.dark-mode) {
		background: linear-gradient(to bottom, #1f1a24, #121015);
		color: #f5eaf5;
	}

	:global(body.dark-mode) .welcome-hero {
		background:
			linear-gradient(rgba(18, 16, 21, 0.5), rgba(18, 16, 21, 0.65)),
			linear-gradient(135deg, #3a2a42, #b06eb0);
		border: 1px solid rgba(247, 209, 248, 0.18);
	}

	:global(body.dark-mode) .home-info,
	:global(body.dark-mode) .how-it-works,
	:global(body.dark-mode) .why {
		color: #f5eaf5;
	}

	:global(body.dark-mode) .slogan,
	:global(body.dark-mode) .home-info h2,
	:global(body.dark-mode) .benefits h3,
	:global(body.dark-mode) .how-it-works h3,
	:global(body.dark-mode) .why h3 {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .home-info p,
	:global(body.dark-mode) .step p,
	:global(body.dark-mode) .why p {
		color: #ddd;
	}

	:global(body.dark-mode) .benefits {
		background: linear-gradient(135deg, #2c2432, #3a2a42);
		border-top: 1px solid rgba(247, 209, 248, 0.12);
		border-bottom: 1px solid rgba(247, 209, 248, 0.12);
	}

	:global(body.dark-mode) .benefit-item,
	:global(body.dark-mode) .step {
		background: #2c2432;
		color: #f5eaf5;
		border: 1px solid rgba(247, 209, 248, 0.18);
		box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
	}

	:global(body.dark-mode) .benefit-item,
	:global(body.dark-mode) .step h4 {
		color: #f7d1f8;
	}

	@media (max-width: 700px) {
		.benefit-list {
			grid-template-columns: 1fr;
		}

		.welcome-hero {
			min-height: 430px;
			margin: 12px auto 30px;
		}
	}
</style>