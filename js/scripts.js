mapboxgl.accessToken = 'pk.eyJ1IjoiZWxpc2FiZXRoYXBwZWwiLCJhIjoiY2tsMTNnYTdmMmxhbjJvcW80a3M1cGQ2ZyJ9.zRFRv1-WLc3E43O5Klf8Jw';

var map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [-58.438578,-34.608486], // starting position [lng, lat]
  zoom: 9 // starting zoom
});

var nav = new mapboxgl.NavigationControl();

map.addControl(nav, 'top-left');

//loading data
map.on('style.load', function () {
  // adding geojson source data, downloaded from external site
  map.addSource('sites', {
    type: 'geojson',
    data: '/data/otras_dependencias.geojson'
  });
  // styling first data with layer
      map.addLayer({
        'id': 'dependencias',
        'type': 'circle',
        'source': 'sites',
        'layout': {},
        'paint': {
          'circle-color':
          '#fbb03b'
        }
      });

  map.addSource('policia', {
    type: 'geojson',
    data: '/data/dependencias_de_la_policia.geojson'
  });
// styling second data with layer
    map.addLayer({
      'id': 'comisarias',
      'type': 'circle',
      'source': 'policia',
      'maxzoom':22,
      'layout': {},
      'paint': {
        'circle-color':
        '#e55e5e',
        'circle-opacity':0.6,
        'circle-radius': {
            'base': 1.75,
            'stops': [
              [14, 15],
              [14.01, 2],
              [16, 4],
              [22, 20]
]
}
      }
    });

})

    // creating a popup
    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.on('mousemove', function (e) {
      console.log(e)
    // identifying features
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['dependencias','comisarias'],
    });

    if (features.length > 0) {


      popup.setLngLat(e.lngLat).setHTML('testing').addTo(map);

      // show the cursor as a pointer
      map.getCanvas().style.cursor = 'pointer';
    } else {
      popup.remove();
      map.getCanvas().style.cursor = '';
    }

  })
