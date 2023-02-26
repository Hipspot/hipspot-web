import PulsingDot from '@components/Marker/PulsingDotMarker';
import { MAP_IMAGE_PULSING_DOT, MAP_LAYER_PULSING_DOT, MAP_SOURCE_PULSING_DOT_POINT } from '@constants/map';
import { Position } from 'geojson';
import mapboxgl from 'mapbox-gl';

interface DrawMyLocationMarkerParams {
  map: mapboxgl.Map;
  coordinates: Position;
}

function drawPlusingDotMarker({ map, coordinates }: DrawMyLocationMarkerParams) {
  if (map.getSource(MAP_SOURCE_PULSING_DOT_POINT)) {
    map.removeLayer(MAP_LAYER_PULSING_DOT);
    map.removeSource(MAP_SOURCE_PULSING_DOT_POINT);
    map.removeImage(MAP_IMAGE_PULSING_DOT);
  }

  map.addImage(MAP_IMAGE_PULSING_DOT, new PulsingDot(map), { pixelRatio: 2 });
  map.addSource(MAP_SOURCE_PULSING_DOT_POINT, {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates,
          },
        },
      ],
    },
  });
  map.addLayer({
    id: MAP_LAYER_PULSING_DOT,
    type: 'symbol',
    source: MAP_SOURCE_PULSING_DOT_POINT,
    layout: {
      'icon-image': MAP_IMAGE_PULSING_DOT,
    },
  });
}

export default drawPlusingDotMarker;
