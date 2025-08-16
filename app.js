mapboxgl.accessToken = CONFIG.MAPBOX_TOKEN;
   
     const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-98.5795, 39.8283], // USA center
        zoom: 10,
    });
     
async function loadCities() {
  try {
    const response = await fetch('cities.json');
    const cities = await response.json();
    const container = document.getElementById('city-buttons');

    for (const city of cities) {
      // Get coordinates from Mapbox Geocoding
      const geoRes = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city.name)}.json?access_token=${mapboxgl.accessToken}`);
      const geoData = await geoRes.json();

      if (geoData.features && geoData.features.length > 0) {
        const coords = geoData.features[0].geometry.coordinates; // [lng, lat]

        // Add marker
        new mapboxgl.Marker()
          .setLngLat(coords)
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${city.name}</h3>`))
          .addTo(map);

        // Create button
        const btn = document.createElement('button');
        btn.className = 'btn btn-light m-1';
        btn.textContent = city.name;

        // Zoom on click
        btn.addEventListener('click', () => {
          map.flyTo({
            center: coords, // correct [lng, lat]
            zoom: 10,
            essential: true
          });
        });

        container.appendChild(btn);
      }
    }
  } catch (err) {
    console.error('Error loading cities:', err);
  }
}

// Make sure map is loaded first
map.on('load', loadCities);