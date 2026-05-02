<script>
  import HeroSection from '$lib/components/HeroSection.svelte';
</script>

<HeroSection />

<section class="home-info">

  <h1 class="slogan">Train smarter. Not just harder.</h1>

  <h2>Willkommen bei GymSense</h2>

  <p>
    GymSense ist dein intelligenter Trainingsbegleiter für ein strukturiertes und effektives Workout.
    Die Anwendung unterstützt dich dabei, deine Trainings systematisch zu dokumentieren,
    Fortschritte sichtbar zu machen und deine Leistung kontinuierlich zu verbessern.
  </p>

  <p>
    Egal ob Einsteiger:in oder Fortgeschrittene:r – GymSense hilft dir, den Überblick über deine
    Übungen, Gewichte und Wiederholungen zu behalten. Durch einfache Workflows und eine klare
    Benutzeroberfläche kannst du dich voll und ganz auf dein Training konzentrieren.
  </p>

  <p>
    Zusätzlich bietet GymSense kontextbasierte Unterstützung, beispielsweise durch
    Videoempfehlungen bei neuen Übungen oder Hinweise zur Trainingsoptimierung.
    So trainierst du nicht nur härter, sondern vor allm smarter.
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
    Viele Fitness-Apps sind kompliziert und überladen. GymSense konzentriert sich bewusst
    auf das Wesentliche: eine einfache Trainingsdokumentation, klare Fortschrittsanzeige
    und intelligente Unterstützung im richtigen Moment.
  </p>

  <p>
    Die Anwendung hilft dir, dein Training effizienter zu gestalten, Fehler zu vermeiden
    und langfristig motiviert zu bleiben – ganz ohne unnötige Komplexität.
  </p>

</section>

<style>
  .home-info {
    padding: 40px 24px;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }

  .slogan {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #B06EB0;
  }

  .home-info h2 {
    margin-bottom: 16px;
  }

  .home-info p {
    max-width: 700px;
    margin: 0 auto 16px;
    line-height: 1.6;
  }

  /* 🔥 Vorteile Section */
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
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
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
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
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

:global(body.dark-mode) .benefit-item {
	color: #f7d1f8;
}

:global(body.dark-mode) .step h4 {
	color: #f7d1f8;
}
</style>

