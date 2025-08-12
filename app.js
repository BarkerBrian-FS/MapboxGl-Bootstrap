
 mapboxgl.accessToken = 'pk.eyJ1IjoiYnJpYW4tbS1iYXJrZXIxIiwiYSI6ImNtZThyNWw2dzBqZGUybXB3MHZ6b2J4NzQifQ.z_0Md1KsZQP8ClzcktIf1g';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-98.5795, 39.8283], // USA center
        zoom: 4
    });

    // Load locations from JSON
    fetch('cities.json')
        .then(response => response.json())
        .then(locations => {
            locations.forEach(location => {
                fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location.address)}.json?access_token=${mapboxgl.accessToken}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.features.length > 0) {
                            const coords = data.features[0].geometry.coordinates;

                            // Add marker
                            new mapboxgl.Marker()
                                .setLngLat(coords)
                                .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3><p>${location.address}</p>`))
                                .addTo(map);
                        }
                    })
                    .catch(err => console.error('Geocoding error:', err));
            });
        })
        .catch(err => console.error('Error loading JSON:', err));