import { useEffect } from 'react';
import useMap from './useMap';
import { DOMID_MAP_COMPONENT, DOMTargetList } from '@constants/DOM';
import { EVENT_FIND_MY_LOCATION } from '@constants/event';
import PulsingDot from '@components/Marker/PulsingDotMarker';
import { FindMyLocationEvent } from '@libs/types/customEvents';
import { MAP_IMAGE_PULSING_DOT, MAP_LAYER_PULSING_DOT, MAP_SOURCE_PULSING_DOT_POINT } from '@constants/map';
import useCameraMove from './useCameraMove';
import { Position } from 'geojson';
import mapboxgl from 'mapbox-gl';

function useMyLocationMarker() {
  const mapRef = useMap();
  const { flyTo } = useCameraMove();
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    DOMTargetList[DOMID_MAP_COMPONENT] = document.getElementById(DOMID_MAP_COMPONENT);
    const mapElem = DOMTargetList[DOMID_MAP_COMPONENT];
    mapElem?.addEventListener(EVENT_FIND_MY_LOCATION, (e: FindMyLocationEvent) => {
      drawPulsingDotMarker({ map, coordinates: e.coordinates });
      flyTo(e.coordinates);
    });
  }, []);
}
export default useMyLocationMarker;

interface DrawMyLocationMarkerParams {
  map: mapboxgl.Map;
  coordinates: Position;
}

function drawPulsingDotMarker({ map, coordinates }: DrawMyLocationMarkerParams) {
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
