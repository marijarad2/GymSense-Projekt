<script>
    import hero from '$lib/assets/istockphoto-1472027831-612x612.jpg';
	let { data } = $props();

	let selectedType = $state('Alle');
	let userLocation = $state(null);
	let locationError = $state('');
	let isLoadingLocation = $state(false);

	const courseTypes = $derived.by(() => {
		const types = data.courses.map((course) => course.type).filter(Boolean);
		return ['Alle', ...new Set(types)];
	});

	function getDistanceKm(lat1, lng1, lat2, lng2) {
		const earthRadiusKm = 6371;

		const dLat = ((lat2 - lat1) * Math.PI) / 180;
		const dLng = ((lng2 - lng1) * Math.PI) / 180;

		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos((lat1 * Math.PI) / 180) *
				Math.cos((lat2 * Math.PI) / 180) *
				Math.sin(dLng / 2) *
				Math.sin(dLng / 2);

		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return earthRadiusKm * c;
	}

	function getLocation() {
		locationError = '';
		isLoadingLocation = true;

		if (!navigator.geolocation) {
			locationError = 'Dein Browser unterstützt keinen Standort.';
			isLoadingLocation = false;
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				userLocation = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};

				isLoadingLocation = false;
			},
			(error) => {
				if (error.code === 1) {
					locationError =
						'Standortzugriff wurde blockiert. Bitte im Browser erlauben.';
				} else {
					locationError = 'Standort konnte nicht ermittelt werden.';
				}

				isLoadingLocation = false;
			}
		);
	}

    function getDirectionsUrl(course) {
        const destination = course.address
            ? `${course.address}, Schweiz`
            : `${course.lat},${course.lng}`;

        if (userLocation) {
            const origin = `${userLocation.lat},${userLocation.lng}`;

            return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=walking`;
        }

        return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=walking`;
    }

	const filteredCourses = $derived.by(() => {
		let courses = data.courses.filter((course) => {
			return selectedType === 'Alle' || course.type === selectedType;
		});

		courses = courses.map((course) => {
			const distance =
				userLocation && course.lat && course.lng
					? getDistanceKm(userLocation.lat, userLocation.lng, course.lat, course.lng)
					: null;

			return {
				...course,
				distance
			};
		});

		return courses.sort((a, b) => {
			if (a.distance === null && b.distance === null) return 0;
			if (a.distance === null) return 1;
			if (b.distance === null) return -1;

			return a.distance - b.distance;
		});
	});
</script>

<section class="courses-page">

    <div class="hero">
        <img src={hero} alt="Fitness Kurse" />
        <div class="hero-overlay"></div>

        <div class="hero-content">
            <h1>Kurse in deiner Nähe</h1>
            <p>Finde passende Fitnesskurse und starte direkt durch</p>
        </div>
    </div>

	<div class="tool-card">
		<div>
			<span>Standort</span>

			{#if userLocation}
				<strong>Standort erkannt</strong>
			{:else if isLoadingLocation}
				<strong>Standort wird geladen...</strong>
			{:else}
				<strong>Kein Standort aktiv</strong>
			{/if}

			<p>Dein Standort wird nur für die Distanzberechnung verwendet.</p>

			{#if locationError}
				<p class="location-error">{locationError}</p>
			{/if}
		</div>

		<button type="button" onclick={getLocation}>
			Standort teilen
		</button>
	</div>

	<div class="filter-box">
		<label>Kursart filtern</label>

		<select bind:value={selectedType}>
			{#each courseTypes as type}
				<option value={type}>{type}</option>
			{/each}
		</select>
	</div>

	<div class="courses-grid">
		{#each filteredCourses as course}
			<article class="course-card">
				<div class="card-top">
					<div>
						<h2>{course.name}</h2>
						<p>{course.studio} · {course.city}</p>
					</div>

					<span class="badge">{course.type}</span>
				</div>

				{#if course.address}
					<p class="address">{course.address}</p>
				{/if}

				<p class="description">{course.description}</p>

				<div class="meta">
					<span>{course.level}</span>

					{#if course.distance !== null}
						<span>{course.distance.toFixed(1)} km entfernt</span>
					{:else}
						<span>Entfernung unbekannt</span>
					{/if}
				</div>

				<div class="actions">
					<a href={course.website} target="_blank">
						Zur Anmeldung
					</a>

					<a href={getDirectionsUrl(course)} target="_blank" class="secondary">
						Route öffnen
					</a>
				</div>
			</article>
		{/each}
	</div>
</section>


<style>
	.courses-page {
		max-width: 1100px;
		margin: 0 auto;
		padding: 50px 24px;
	}

	.header {
		text-align: center;
		margin-bottom: 30px;
	}

	.header h1 {
		color: #b06eb0;
		font-weight: 700;
		margin-bottom: 10px;
	}

	.header p {
		color: #555;
	}

	.tool-card,
	.filter-box,
	.course-card {
		background: white;
		border-radius: 18px;
		box-shadow: 0 8px 24px rgba(176, 110, 176, 0.16);
		border: 1px solid rgba(176, 110, 176, 0.12);
	}

	.tool-card {
		padding: 22px;
		margin-bottom: 22px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 18px;
		flex-wrap: wrap;
	}

	.tool-card span,
	.filter-box label {
		color: #b06eb0;
		font-weight: 700;
		display: block;
		margin-bottom: 6px;
	}

	.tool-card strong {
		color: #333;
		font-size: 1.2rem;
	}

	.tool-card p {
		margin: 8px 0 0;
		color: #777;
	}

	.location-error {
		color: #b00020 !important;
		font-weight: 700;
	}

	.tool-card button {
		border: none;
		background: #b06eb0;
		color: white;
		font-weight: 700;
		border-radius: 12px;
		padding: 12px 16px;
		cursor: pointer;
	}

	.tool-card button:hover {
		background: #9a5a9a;
	}

	.filter-box {
		padding: 18px;
		margin-bottom: 26px;
	}

	.filter-box select {
		width: 100%;
		border: 1px solid #f0d6f0;
		border-radius: 12px;
		padding: 12px;
		font-weight: 700;
		background: white;
		color: #333;
	}

	.courses-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 24px;
	}

	.course-card {
		padding: 24px;
	}

	.card-top {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		align-items: flex-start;
		margin-bottom: 14px;
	}

	.card-top h2 {
		color: #b06eb0;
		margin: 0 0 6px;
	}

	.card-top p {
		margin: 0;
		color: #666;
	}

	.badge {
		background: #b06eb0;
		color: white;
		border-radius: 999px;
		padding: 6px 10px;
		font-weight: 700;
		font-size: 0.8rem;
		white-space: nowrap;
	}

	.address {
		color: #777;
		font-weight: 700;
		margin-bottom: 10px;
	}

	.description {
		color: #444;
		line-height: 1.5;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin: 18px 0;
	}

	.meta span {
		background: #f8f0f8;
		color: #b06eb0;
		border-radius: 999px;
		padding: 7px 10px;
		font-weight: 700;
		font-size: 0.85rem;
	}

	.actions {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}

	.actions a {
		background: #b06eb0;
		color: white;
		text-decoration: none;
		border-radius: 10px;
		padding: 10px 12px;
		font-weight: 700;
	}

	.actions a:hover {
		background: #9a5a9a;
	}

	.actions a.secondary {
		background: #f8f0f8;
		color: #b06eb0;
	}

	.actions a.secondary:hover {
		background: #fff0ff;
	}

	@media (max-width: 700px) {
		.tool-card {
			align-items: stretch;
		}

		.tool-card button {
			width: 100%;
		}
	}

	:global(body.dark-mode) {
		background: linear-gradient(to bottom, #1f1a24, #121015);
		color: #f5eaf5;
	}

	:global(body.dark-mode) .header h1,
	:global(body.dark-mode) .card-top h2 {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .header p,
	:global(body.dark-mode) .card-top p,
	:global(body.dark-mode) .description,
	:global(body.dark-mode) .tool-card p,
	:global(body.dark-mode) .address {
		color: #ddd;
	}

	:global(body.dark-mode) .location-error {
		color: #ffb3c7 !important;
	}

	:global(body.dark-mode) .tool-card,
	:global(body.dark-mode) .filter-box,
	:global(body.dark-mode) .course-card {
		background: #2c2432;
		color: #f5eaf5;
		border: 1px solid rgba(247, 209, 248, 0.18);
		box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
	}

	:global(body.dark-mode) .tool-card span,
	:global(body.dark-mode) .filter-box label,
	:global(body.dark-mode) .tool-card strong {
		color: #f7d1f8;
	}

	:global(body.dark-mode) .filter-box select {
		background: #3a2a42;
		color: #f5eaf5;
		border: 1px solid rgba(247, 209, 248, 0.25);
	}

	:global(body.dark-mode) .badge,
	:global(body.dark-mode) .tool-card button,
	:global(body.dark-mode) .actions a {
		background: #f7d1f8;
		color: #2c2432;
	}

	:global(body.dark-mode) .tool-card button:hover,
	:global(body.dark-mode) .actions a:hover {
		background: #e8b9ea;
	}

	:global(body.dark-mode) .meta span,
	:global(body.dark-mode) .actions a.secondary {
		background: #3a2a42;
		color: #f7d1f8;
		border: 1px solid rgba(247, 209, 248, 0.16);
	}

    .hero {
	position: relative;
	height: 260px;
	border-radius: 20px;
	overflow: hidden;
	margin-bottom: 30px;
    }

    .hero img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6));
    }

    .hero-content {
        position: absolute;
        bottom: 20px;
        left: 20px;
        color: white;
    }

    .hero-content h1 {
        margin: 0;
        font-size: 2rem;
    }

    .hero-content p {
        margin: 4px 0 0;
        color: #eee;
    }

    .hero img {
	transition: transform 0.5s ease;
    }

    .hero:hover img {
        transform: scale(1.05);
    }

    :global(body.dark-mode) .hero-overlay {
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.85));
    }
</style>