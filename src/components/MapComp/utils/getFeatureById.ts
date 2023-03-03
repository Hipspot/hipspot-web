import { CustomGeoJSONFeatures } from '@libs/types/map';
import { Map } from 'mapbox-gl';

function getFeatureById({ map, sourceId, cafeId }: { map: Map; sourceId: string; cafeId: string | number }) {
  try {
    return map
      .querySourceFeatures(sourceId)
      .find((feature) => feature.properties?.cafeId === cafeId) as unknown as CustomGeoJSONFeatures;
  } catch (e) {
    console.error(e);
  }
}

export default getFeatureById;
