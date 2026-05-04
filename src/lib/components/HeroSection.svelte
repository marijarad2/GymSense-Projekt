<script>
	import hero from '$lib/assets/hero.jpg';
</script>

<section class="hero">
	<img src={hero} alt="Gym Background" class="hero-img" />

	<div class="overlay"></div>

	<div class="hero-content">
		<h1>GymSense</h1>
		<p>Train smarter. Not just harder.</p>

		<div class="hero-buttons">
			<a href="/register" class="primary-btn">Jetzt starten</a>
			<a href="/login?redirect=/training" class="secondary-btn">
				Ich habe schon ein Konto
			</a>
		</div>
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
		background: rgba(0, 0, 0, 0.4);
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
		max-width: 600px;
		width: 100%;
	}

	.hero-content h1 {
		font-size: 4rem;
		margin-bottom: 12px;
		font-weight: 800;
	}

	.hero-content p {
		font-size: 1.4rem;
		margin-bottom: 30px;
		color: rgba(255, 255, 255, 0.9);
	}

	.hero-buttons {
		display: flex;
		gap: 16px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.primary-btn {
		padding: 14px 28px;
		border-radius: 14px;
		background: linear-gradient(135deg, #b06eb0, #d18ad1);
		color: white;
		font-weight: 700;
		text-decoration: none;
		box-shadow: 0 8px 20px rgba(176, 110, 176, 0.35);
		transition: all 0.25s ease;
		font-size: 1.05rem;
	}

	.primary-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 12px 28px rgba(176, 110, 176, 0.5);
		background: linear-gradient(135deg, #a35ca3, #c97bc9);
	}

	.secondary-btn {
		padding: 14px 24px;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.15);
		color: white;
		font-weight: 600;
		text-decoration: none;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.25);
		transition: all 0.25s ease;
	}

	.secondary-btn:hover {
		transform: translateY(-2px);
		background: rgba(255, 255, 255, 0.25);
		border: 1px solid rgba(255, 255, 255, 0.4);
	}

	@media (max-width: 600px) {
		.hero-content h1 {
			font-size: 2.5rem;
		}

		.hero-content p {
			font-size: 1.1rem;
		}

		.hero-buttons {
			flex-direction: column;
		}

		.primary-btn,
		.secondary-btn {
			width: 100%;
			text-align: center;
		}
	}

	:global(body.dark-mode) .overlay {
		background: rgba(0, 0, 0, 0.55);
	}

	:global(body.dark-mode) .secondary-btn {
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(247, 209, 248, 0.3);
		color: #f7d1f8;
	}

	:global(body.dark-mode) .secondary-btn:hover {
		background: rgba(247, 209, 248, 0.15);
	}
</style>