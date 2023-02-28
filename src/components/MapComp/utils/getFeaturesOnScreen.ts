import { CustomGeoJSONFeatures } from '@libs/types/map';
import { Map, MapboxGeoJSONFeature } from 'mapbox-gl';

interface GetFeaturesOnScreenParams {
  map: Map | undefined;
  filterId: number;
  allFeatures: CustomGeoJSONFeatures[];
}

interface GetFeaturesOnScreenReturns {
  pointFeaturesOnScreen: CustomGeoJSONFeatures[];
  clusterFeaturesOnScreen: MapboxGeoJSONFeature[];
  uniquePointIds: Set<number>;
  uniqueClusterIds: Set<number>;
}
const getFeaturesOnScreen: (props: GetFeaturesOnScreenParams) => GetFeaturesOnScreenReturns = ({
  map,
  allFeatures,
  filterId,
}) => {
  if (!map)
    return {
      pointFeaturesOnScreen: [],
      clusterFeaturesOnScreen: [],
      uniquePointIds: new Set<number>(),
      uniqueClusterIds: new Set<number>(),
    };

  const mapboxFeaturesOnScreen = map.querySourceFeatures(`cafeList/${filterId}`);
  const clusterFeaturesOnScreen: MapboxGeoJSONFeature[] = [];
  const uniqueClusterIds = new Set<number>();
  const uniquePointIds = new Set<number>();

  mapboxFeaturesOnScreen.forEach((feature) => {
    if (uniqueClusterIds.has(feature.properties?.cluster_id)) return;

    if (feature.properties?.cluster) {
      clusterFeaturesOnScreen.push(feature);
      uniqueClusterIds.add(feature.properties.cluster_id);
    }

    if (feature.properties?.cafeId) {
      uniquePointIds.add(Number(feature.properties.cafeId));
    }
  });
  const pointFeaturesOnScreen = allFeatures.filter((feature: CustomGeoJSONFeatures) =>
    uniquePointIds.has(Number(feature.properties.cafeId))
  );

  return { pointFeaturesOnScreen, clusterFeaturesOnScreen, uniquePointIds, uniqueClusterIds };
};

export default getFeaturesOnScreen;
