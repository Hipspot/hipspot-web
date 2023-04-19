import { CustomGeoJSONFeatures } from '@libs/types/map';
import { FeatureCollection } from 'geojson';

interface HandleMapLoadProps {
  map: mapboxgl.Map;
  allFeatures: CustomGeoJSONFeatures[];
  activeFilterId: number;
}

function addFeatureLayer({ map, allFeatures, activeFilterId }: HandleMapLoadProps) {
  const filteredFeatures: CustomGeoJSONFeatures[] = [];

  allFeatures.forEach((feature: CustomGeoJSONFeatures) => {
    if (feature.properties?.filterList.includes(activeFilterId)) {
      filteredFeatures.push(feature);
    }
  });

  // add source layer
  map.addSource('cafeList', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: filteredFeatures,
    } as FeatureCollection,
    cluster: true,
    clusterMaxZoom: 16,
    clusterRadius: 60,
  });
  map.addLayer({
    id: 'cafeList',
    type: 'circle',
    source: 'cafeList',
    paint: {
      'circle-opacity': 0,
    },
  });
}
export default addFeatureLayer;
