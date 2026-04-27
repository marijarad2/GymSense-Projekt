<script>
  import hero from '$lib/assets/hero.jpg';
</script>

<section class="hero">
  <img src={hero} alt="Gym Background" class="hero-img" />

  <div class="overlay"></div>

  <div class="hero-content">
    <h1>GymSense</h1>
    <p>Train smarter. Not just harder.</p>
    <a href="/training" class="hero-button">Jetzt starten</a>
  </div>
</section>

<style>
  .hero {
    position: relative;
    width: 100%;
    height: 80vh;
    overflow: hidden;
  }

  .hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
  }

  .hero-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    z-index: 1;
    padding: 20px;
  }

  .hero-content h1 {
    font-size: 4rem;
    margin-bottom: 12px;
  }

  .hero-content p {
    font-size: 1.4rem;
    margin-bottom: 24px;
  }

  .hero-button {
    display: inline-block;
    padding: 12px 20px;
    border-radius: 10px;
    background: #b06eb0;
    color: white;
    text-decoration: none;
    font-weight: 600;
  }

  .hero-button:hover {
    opacity: 0.9;
  }
</style>