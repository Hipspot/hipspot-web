import { CustomGeoJSONFeatures } from '@libs/types/map';
import { Map } from 'mapbox-gl';

function getFeatureById({ map, sourceId, id }: { map: Map; sourceId: string; id: string | number }) {
  try {
    return map
      .querySourceFeatures(sourceId)
      .find((feature) => feature.properties?.id === id) as unknown as CustomGeoJSONFeatures;
  } catch (e) {
    console.error(e);
  }
}

export default getFeatureById;
