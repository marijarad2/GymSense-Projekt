<script>
  let { data } = $props();
</script>

<section class="exercises-page">
  <h1>Übungen</h1>

  {#if data.exercises.length === 0}
    <p>Keine Übungen gefunden.</p>
  {:else}
    <div class="exercise-grid">
      {#each data.exercises as exercise}
        <article class="exercise-card">
          <h2>{exercise.name}</h2>
          <p class="muscle">{exercise.muscle}</p>
          <p>{exercise.description}</p>

          <h3>Tipps</h3>
          <ul>
            {#each exercise.tips as tip}
              <li>{tip}</li>
            {/each}
          </ul>

          {#if exercise.video}
            <iframe
              src={exercise.video}
              title={exercise.name}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          {/if}
        </article>
      {/each}
    </div>
  {/if}
</section>

<style>
  .exercises-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 24px;
  }

  h1 {
    text-align: center;
    color: #B06EB0;
    margin-bottom: 40px;
  }

  .exercise-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 28px;
  }

  .exercise-card {
    background: white;
    border-radius: 18px;
    padding: 24px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  }

  .exercise-card h2 {
    color: #B06EB0;
    margin-bottom: 6px;
  }

  .muscle {
    font-weight: bold;
    color: #666;
  }

  ul {
    padding-left: 20px;
  }

  iframe {
    width: 100%;
    height: 230px;
    margin-top: 18px;
    border-radius: 14px;
  }
</style>