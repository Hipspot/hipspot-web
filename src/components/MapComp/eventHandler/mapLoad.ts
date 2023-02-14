import { FilterId } from '@libs/types/filter';
import { CustomGeoJSONFeatures } from '@libs/types/map';
import getEnumNumberValues from '@libs/utils/getEnumNumberValues';
import { FeatureCollection } from 'geojson';

interface HandleMapLoadProps {
  map: mapboxgl.Map;
  allFeatures: CustomGeoJSONFeatures[];
}

function handleMapLoad({ map, allFeatures }: HandleMapLoadProps) {
  const filterValues = getEnumNumberValues(FilterId);
  const filteredFeatures: CustomGeoJSONFeatures[][] = filterValues.map(() => []);

  allFeatures.forEach((feature: CustomGeoJSONFeatures) => {
    feature.properties?.filterList.forEach((filterId: number) => {
      filteredFeatures[filterId].push(feature);
    });
  });

  filterValues.forEach((filterId) => {
    map.addSource(`cafeList/${filterId}`, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: filteredFeatures[filterId],
      } as FeatureCollection,
      cluster: true,
      clusterMaxZoom: 16,
      clusterRadius: 60,
    });
    map.addLayer({
      id: `cafeList/${filterId}`,
      type: 'circle',
      source: `cafeList/${filterId}`,
      paint: {
        'circle-opacity': 0,
      },
    });
  });
}
export default handleMapLoad;
