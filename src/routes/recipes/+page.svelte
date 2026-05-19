<script>
	let { data } = $props();

	let selectedRecipe = $state(null);
    let selectedCategory = $state('Alle');

	const allRecipes = [
		{
			name: 'Protein Porridge',
			calories: 420,
			protein: 28,
			category: 'Frühstück',
			time: '10 Min',
			goal: 'Muskelaufbau',
			image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=1200&auto=format&fit=crop',
			ingredients: ['60 g Haferflocken', '250 ml Milch', '30 g Proteinpulver', '1 Banane', 'Beeren'],
			steps: ['Haferflocken mit Milch erhitzen.', 'Proteinpulver einrühren.', 'Banane schneiden.', 'Mit Beeren servieren.']
		},
		{
			name: 'Chicken Rice Bowl',
			calories: 650,
			protein: 45,
			category: 'Mittagessen',
			time: '25 Min',
			goal: 'High Protein',
			image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop',
			ingredients: ['150 g Poulet', '120 g Reis', 'Gemüse', 'Sojasauce', 'Gewürze'],
			steps: ['Reis kochen.', 'Poulet anbraten.', 'Gemüse kurz mitbraten.', 'Alles in einer Bowl anrichten.']
		},
		{
			name: 'Protein Smoothie',
			calories: 320,
			protein: 30,
			category: 'Snack',
			time: '5 Min',
			goal: 'Schnell & einfach',
			image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=1200&auto=format&fit=crop',
			ingredients: ['250 ml Milch', '30 g Proteinpulver', '1 Banane', 'Eiswürfel'],
			steps: ['Alle Zutaten in den Mixer geben.', '30 Sekunden mixen.', 'Kalt servieren.']
		},
		{
			name: 'Avocado Toast',
			calories: 390,
			protein: 16,
			category: 'Frühstück',
			time: '10 Min',
			goal: 'Healthy',
			image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200&auto=format&fit=crop',
			ingredients: ['2 Scheiben Vollkorntoast', '1 Avocado', '2 Eier', 'Salz', 'Pfeffer'],
			steps: ['Toast rösten.', 'Avocado zerdrücken.', 'Eier kochen oder braten.', 'Alles belegen und würzen.']
		},
		{
			name: 'Salmon Bowl',
			calories: 580,
			protein: 42,
			category: 'Abendessen',
			time: '25 Min',
			goal: 'High Protein',
			image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop',
			ingredients: ['150 g Lachs', '100 g Reis', 'Gurke', 'Avocado', 'Sesam'],
			steps: ['Reis kochen.', 'Lachs anbraten.', 'Gemüse schneiden.', 'Alles in einer Bowl anrichten.']
		},
		{
			name: 'Fitness Pancakes',
			calories: 470,
			protein: 33,
			category: 'Frühstück',
			time: '15 Min',
			goal: 'Muskelaufbau',
			image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=1200&auto=format&fit=crop',
			ingredients: ['2 Eier', '1 Banane', '40 g Haferflocken', '20 g Proteinpulver'],
			steps: ['Zutaten mixen.', 'Teig in Pfanne geben.', 'Beidseitig backen.', 'Mit Früchten servieren.']
		},
		{
			name: 'Tuna Wrap',
			calories: 430,
			protein: 35,
			category: 'Snack',
			time: '10 Min',
			goal: 'Low Calorie',
			image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1200&auto=format&fit=crop',
			ingredients: ['1 Wrap', '1 Dose Thunfisch', 'Salat', 'Joghurt-Sauce', 'Mais'],
			steps: ['Wrap erwärmen.', 'Thunfisch mit Sauce mischen.', 'Wrap füllen.', 'Einrollen und servieren.']
		},
		{
			name: 'Greek Yogurt Bowl',
			calories: 350,
			protein: 32,
			category: 'Snack',
			time: '5 Min',
			goal: 'High Protein',
			image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop',
			ingredients: ['250 g griechischer Joghurt', 'Beeren', 'Nüsse', 'Honig'],
			steps: ['Joghurt in Schüssel geben.', 'Beeren hinzufügen.', 'Mit Nüssen und Honig toppen.']
		},
		{
			name: 'Egg & Potato Plate',
			calories: 520,
			protein: 30,
			category: 'Mittagessen',
			time: '25 Min',
			goal: 'Energie',
			image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1200&auto=format&fit=crop',
			ingredients: ['3 Eier', '250 g Kartoffeln', 'Spinat', 'Gewürze'],
			steps: ['Kartoffeln kochen.', 'Eier braten.', 'Spinat kurz anbraten.', 'Alles zusammen servieren.']
		}, 
        {
            name: 'Turkey Sandwich',
            calories: 480,
            protein: 38,
            category: 'Mittagessen',
            time: '10 Min',
            goal: 'High Protein',
            image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1200&auto=format&fit=crop',
            ingredients: ['2 Scheiben Vollkornbrot', '120 g Putenbrust', 'Salat', 'Tomate', 'Frischkäse'],
            steps: ['Brot toasten.', 'Mit Frischkäse bestreichen.', 'Putenbrust und Gemüse darauflegen.', 'Zusammenklappen und servieren.']
        },
        {
            name: 'Beef Pasta',
            calories: 720,
            protein: 48,
            category: 'Abendessen',
            time: '30 Min',
            goal: 'Muskelaufbau',
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop',
            ingredients: ['120 g Pasta', '150 g Rindfleisch', 'Tomatensauce', 'Parmesan', 'Gewürze'],
            steps: ['Pasta kochen.', 'Rindfleisch anbraten.', 'Tomatensauce dazugeben.', 'Mit Pasta mischen und servieren.']
        },
        {
            name: 'Omelette mit Gemüse',
            calories: 410,
            protein: 31,
            category: 'Morgenessen',
            time: '12 Min',
            goal: 'Low Carb',
            image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?q=80&w=1200&auto=format&fit=crop',
            ingredients: ['3 Eier', 'Paprika', 'Spinat', 'Feta', 'Gewürze'],
            steps: ['Eier verquirlen.', 'Gemüse anbraten.', 'Eier dazugeben.', 'Stocken lassen und servieren.']
        },
        {
            name: 'Quark Bowl',
            calories: 360,
            protein: 35,
            category: 'Morgenessen',
            time: '5 Min',
            goal: 'High Protein',
            image: 'https://images.unsplash.com/photo-1497888329096-51c27beff665?q=80&w=1200&auto=format&fit=crop',
            ingredients: ['250 g Magerquark', 'Beeren', 'Haferflocken', 'Honig', 'Nüsse'],
            steps: ['Quark in Schüssel geben.', 'Beeren hinzufügen.', 'Haferflocken und Nüsse darübergeben.', 'Mit Honig süssen.']
        },
        {
            name: 'Sweet Potato Bowl',
            calories: 560,
            protein: 26,
            category: 'Abendessen',
            time: '35 Min',
            goal: 'Healthy',
            image: 'https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?q=80&w=1200&auto=format&fit=crop',
            ingredients: ['1 Süsskartoffel', 'Kichererbsen', 'Avocado', 'Salat', 'Joghurt-Sauce'],
            steps: ['Süsskartoffel backen.', 'Kichererbsen würzen.', 'Avocado schneiden.', 'Alles in einer Bowl anrichten.']
        },
        {
            name: 'Protein French Toast',
            calories: 500,
            protein: 34,
            category: 'Morgenessen',
            time: '15 Min',
            goal: 'Muskelaufbau',
            image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=1200&auto=format&fit=crop',
            ingredients: ['2 Scheiben Toast', '2 Eier', 'Milch', 'Zimt', 'Protein-Joghurt'],
            steps: ['Eier mit Milch und Zimt mischen.', 'Toast eintauchen.', 'In Pfanne ausbacken.', 'Mit Joghurt servieren.']
        }
	];

	const filteredRecipes = $derived.by(() => {
	const recipesByLogin = data.user ? allRecipes : allRecipes.slice(0, 4);

	if (selectedCategory === 'Alle') {
		return recipesByLogin;
	}

	return recipesByLogin.filter((recipe) => recipe.category === selectedCategory);
});
</script>

<svelte:head>
	<title>Rezepte | GymSense</title>
</svelte:head>

<section class="recipes-page">
	<div class="hero">
		<h1>Fitness Rezepte</h1>
		<p>Gesunde Mahlzeiten passend zu deinem Training – mit Kalorien, Protein und Anleitung.</p>
	</div>
    <div class="recipe-filter">
	<button
		type="button"
		class:active={selectedCategory === 'Alle'}
		onclick={() => (selectedCategory = 'Alle')}
	>
		Alle
	</button>

	<button
		type="button"
		class:active={selectedCategory === 'Morgenessen'}
		onclick={() => (selectedCategory = 'Morgenessen')}
	>
		Morgenessen
	</button>

	<button
		type="button"
		class:active={selectedCategory === 'Mittagessen'}
		onclick={() => (selectedCategory = 'Mittagessen')}
	>
		Mittagessen
	</button>

	<button
		type="button"
		class:active={selectedCategory === 'Abendessen'}
		onclick={() => (selectedCategory = 'Abendessen')}
	>
		Abendessen
	</button>

	<button
		type="button"
		class:active={selectedCategory === 'Snack'}
		onclick={() => (selectedCategory = 'Snack')}
	>
		Snacks
	</button>
</div>

	<div class="recipes-grid">
		{#each filteredRecipes as recipe}
			<button class="recipe-card" type="button" onclick={() => (selectedRecipe = recipe)}>
				<img src={recipe.image} alt={recipe.name} />

				<div class="recipe-content">
					<span>{recipe.category}</span>
					<h3>{recipe.name}</h3>

					<div class="recipe-stats">
						<div>
							<strong>{recipe.calories}</strong>
							<small>Kalorien</small>
						</div>

						<div>
							<strong>{recipe.protein}g</strong>
							<small>Protein</small>
						</div>

						<div>
							<strong>{recipe.time}</strong>
							<small>Zeit</small>
						</div>
					</div>

					<p class="open-hint">Rezept ansehen</p>
				</div>
			</button>
		{/each}
	</div>

	{#if !data.user}
		<div class="locked-box">
			<h2>Mehr Rezepte freischalten</h2>
			<p>Melde dich an, um alle Fitness-Rezepte, High-Protein Meals und Anleitungen zu sehen.</p>
			<a href="/login" class="login-btn">Jetzt anmelden</a>
		</div>
	{/if}

	{#if selectedRecipe}
		<div class="modal-backdrop" role="button" tabindex="0" onclick={() => (selectedRecipe = null)}>
			<div class="recipe-modal" role="dialog" tabindex="-1" onclick={(event) => event.stopPropagation()}>
				<button class="close-btn" type="button" onclick={() => (selectedRecipe = null)}>×</button>

				<img src={selectedRecipe.image} alt={selectedRecipe.name} />

				<div class="modal-content">
					<span>{selectedRecipe.goal}</span>
					<h2>{selectedRecipe.name}</h2>

					<div class="modal-stats">
						<strong>{selectedRecipe.calories} kcal</strong>
						<strong>{selectedRecipe.protein}g Protein</strong>
						<strong>{selectedRecipe.time}</strong>
					</div>

					<h3>Zutaten</h3>
					<ul>
						{#each selectedRecipe.ingredients as ingredient}
							<li>{ingredient}</li>
						{/each}
					</ul>

					<h3>Zubereitung</h3>
					<ol>
						{#each selectedRecipe.steps as step}
							<li>{step}</li>
						{/each}
					</ol>
				</div>
			</div>
		</div>
	{/if}
</section>

<style>
	.recipes-page {
		max-width: 1200px;
		margin: 0 auto;
	}

	.hero {
		text-align: center;
		margin-bottom: 40px;
	}

	.hero h1 {
		color: #b06eb0;
		font-size: 2.6rem;
		font-weight: 800;
	}

	.hero p {
		color: #666;
		font-size: 1.05rem;
	}

	.recipes-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 24px;
	}

	.recipe-card {
		background: white;
		border: none;
		text-align: left;
		border-radius: 22px;
		overflow: hidden;
		box-shadow: 0 10px 28px rgba(176, 110, 176, 0.16);
		transition: transform 0.2s ease;
		cursor: pointer;
		padding: 0;
	}

	.recipe-card:hover {
		transform: translateY(-4px);
	}

	.recipe-card img {
		width: 100%;
		height: 220px;
		object-fit: cover;
	}

	.recipe-content {
		padding: 18px;
	}

	.recipe-content span,
	.modal-content span {
		color: #b06eb0;
		font-weight: 700;
		font-size: 0.85rem;
	}

	.recipe-content h3 {
		margin: 10px 0 16px;
		color: #333;
	}

	.recipe-stats,
	.modal-stats {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}

	.recipe-stats div {
		display: flex;
		flex-direction: column;
	}

	.recipe-stats strong,
	.modal-stats strong {
		color: #b06eb0;
		font-size: 1.05rem;
	}

	.recipe-stats small {
		color: #666;
	}

	.open-hint {
		margin-top: 14px;
		color: #b06eb0;
		font-weight: 700;
	}

	.locked-box {
		margin-top: 42px;
		background: linear-gradient(135deg, #fff4ff, #f8f0f8);
		padding: 34px;
		border-radius: 24px;
		text-align: center;
		border: 1px solid #f0d6f0;
	}

	.locked-box h2 {
		color: #b06eb0;
		margin-bottom: 12px;
	}

	.login-btn {
		display: inline-block;
		margin-top: 18px;
		background: #b06eb0;
		color: white;
		padding: 12px 20px;
		border-radius: 14px;
		text-decoration: none;
		font-weight: 700;
	}

	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.55);
		z-index: 10000;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
	}

	.recipe-modal {
		background: white;
		max-width: 680px;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
		border-radius: 24px;
		position: relative;
	}

	.recipe-modal img {
		width: 100%;
		height: 260px;
		object-fit: cover;
	}

	.modal-content {
		padding: 24px;
	}

	.modal-content h2 {
		color: #b06eb0;
		margin: 8px 0 14px;
	}

	.modal-content h3 {
		color: #b06eb0;
		margin-top: 22px;
	}

	.modal-content li {
		margin-bottom: 8px;
		color: #444;
	}

	.close-btn {
		position: absolute;
		right: 14px;
		top: 12px;
		width: 36px;
		height: 36px;
		border: none;
		border-radius: 50%;
		background: white;
		color: #b06eb0;
		font-size: 1.6rem;
		font-weight: 700;
		cursor: pointer;
	}

	:global(body.dark-mode) .recipe-card,
	:global(body.dark-mode) .recipe-modal {
		background: #2c2432;
		color: #f5eaf5;
	}

	:global(body.dark-mode) .recipe-content h3,
	:global(body.dark-mode) .modal-content h2,
	:global(body.dark-mode) .modal-content h3 {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .recipe-stats small,
	:global(body.dark-mode) .hero p,
	:global(body.dark-mode) .modal-content li {
		color: #ddd;
	}

	:global(body.dark-mode) .locked-box {
		background: #2c2432;
		border: 1px solid rgba(247, 209, 248, 0.18);
	}

        .recipe-filter {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 32px;
    }

    .recipe-filter button {
        border: none;
        background: #fff0ff;
        color: #b06eb0;
        border-radius: 999px;
        padding: 10px 16px;
        font-weight: 700;
        cursor: pointer;
    }

    .recipe-filter button.active,
    .recipe-filter button:hover {
        background: #b06eb0;
        color: white;
    }

    :global(body.dark-mode) .recipe-filter button {
        background: #3a2a42;
        color: #f7d1f8;
    }

    :global(body.dark-mode) .recipe-filter button.active,
    :global(body.dark-mode) .recipe-filter button:hover {
        background: #f7d1f8;
        color: #2c2432;
    }
</style>