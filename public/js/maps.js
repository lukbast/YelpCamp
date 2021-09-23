
      mapboxgl.accessToken = mapToken;
      const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: cmp.geometry.coordinates, // starting position [lng, lat]
      zoom: 9 // starting zoom
      });

      map.addControl(new mapboxgl.NavigationControl());

      new mapboxgl.Marker()
      .setLngLat(cmp.geometry.coordinates)
      .setPopup(
            new mapboxgl.Popup({offset: 25})
            .setHTML(
                  `<h4>${cmp.title}</h4><p>${cmp.location}<p>`
            )
      )
      .addTo(map)
