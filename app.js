mapboxgl.accessToken = CONFIG.MAPBOX_TOKEN;
   
     const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-98.5795, 39.8283], // USA center
        zoom: 10,
    });
     
    // Load locations from JSON
    fetch('cities.json')
        .then(response => response.json())
        .then(locations => {
            locations.forEach(location => {
                fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location.name)}.json?access_token=${mapboxgl.accessToken}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.features.length > 0) {
                            const coords = data.features[0].geometry.coordinates;
                            // Add marker
                        map.on('load', () => {
                            new mapboxgl.Marker()
                                .setLngLat(coords)
                                .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.name}</h3>`))
                                .addTo(map)
                        })        
                        }
                    })
                    .catch(err => console.error('Geocoding error:', err));
            });
        })
        .catch(err => console.error('Error loading JSON:', err));


        
       fetch('cities.json')
        .then(response => response.json())
        .then(locations => {
        const container = document.getElementById('city-buttons');

    locations.forEach(location => {
      // Create button element
      const button = document.createElement('button');
      button.className = 'btn btn-primary'; // Bootstrap button class
      button.textContent = location.name;

      // Optional: Add click event
      button.addEventListener('click', () => {
        alert(`You clicked on ${location.name}`);
        // Or any other action, e.g., zoom map to city
      });

      // Append button to container
      container.appendChild(button);
    });
  })
  .catch(err => console.error('Error loading cities:', err));

       