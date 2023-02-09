import { CustomGeoJSONFeatures } from '@libs/types/map';
import PointMarker from '@components/Marker/pointMarker';
import ClusterMarker from '@components/Marker/clusterMarker';
import { renderEmotionElementToHtml } from '@libs/utils/renderEmotionElementToHtml';
import mapboxgl, { Map, MapboxGeoJSONFeature, Marker } from 'mapbox-gl';

interface UpdateMarkersArgs {
  map: Map;
  filterId: number;
  allFeatures: CustomGeoJSONFeatures[];
  pointMarkerList: { [id in number | string]: Marker };
  clusterMarkerList: { [id in number | string]: Marker };
  handleClickMarker: (id: number) => void;
}

type GetFeaturesOnScreenArgs = Pick<UpdateMarkersArgs, 'map' | 'allFeatures' | 'filterId'>;

export const updateMarkers = ({
  map,
  filterId,
  allFeatures,
  pointMarkerList,
  clusterMarkerList,
  handleClickMarker,
}: UpdateMarkersArgs) => {
  const { pointsOnScreen, clustersOnScreen, uniquePointIds, uniqueClusterIds } = getFeaturesOnScreen({
    map,
    allFeatures,
    filterId,
  });

  // update point markers
  pointsOnScreen.forEach((feature: CustomGeoJSONFeatures) => {
    const { id } = feature.properties;
    if (pointMarkerList[id]) return;

    try {
      const marker = renderEmotionElementToHtml({
        elem: (
          <PointMarker
            handleClickMarker={handleClickMarker}
            feature={feature}
            activeFilterId={filterId}
            image="https://hipspot.s3.ap-northeast-2.amazonaws.com/store/0.jpg"
            id={id}
          />
        ),
        cssDataKey: 'marker',
      });
      pointMarkerList[id] = new mapboxgl.Marker(marker).setLngLat(feature.geometry.coordinates).addTo(map);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  });

  // remove points markers
  Object.entries(pointMarkerList).forEach((markerEntry) => {
    const [id, marker] = markerEntry as [string, Marker];

    if (uniquePointIds.has(Number(id))) return;
    marker.remove();
    delete pointMarkerList[id];
  });

  // update cluster markers
  clustersOnScreen.forEach((feature) => {
    const id = feature.properties?.cluster_id;
    if (clusterMarkerList[id]) return;
    const count = feature.properties?.point_count;
    const geo = feature.geometry;

    const marker = renderEmotionElementToHtml({
      elem: <ClusterMarker number={count} filterId={filterId} />,
      cssDataKey: 'cluster',
    });

    if (geo.type === 'GeometryCollection') return;
    clusterMarkerList[id] = new mapboxgl.Marker(marker).setLngLat(geo.coordinates as [number, number]).addTo(map);
  });

  // remove cluster markers
  Object.entries(clusterMarkerList).forEach((markerEntry) => {
    const [id, marker] = markerEntry as [string, Marker];

    if (uniqueClusterIds.has(Number(id))) return;
    marker.remove();
    delete clusterMarkerList[id];
  });
};

const getFeaturesOnScreen = ({ map, allFeatures, filterId }: GetFeaturesOnScreenArgs) => {
  const mapboxFeaturesOnScreen = map.querySourceFeatures(`cafeList/${filterId}`);
  const clustersOnScreen: MapboxGeoJSONFeature[] = [];
  const uniqueClusterIds = new Set<number>();
  const uniquePointIds = new Set<number>();
  mapboxFeaturesOnScreen.forEach((feature) => {
    if (uniqueClusterIds.has(feature.properties?.cluster_id)) return;

    if (feature.properties?.cluster) {
      clustersOnScreen.push(feature);
      uniqueClusterIds.add(feature.properties.cluster_id);
    }

    if (feature.properties?.id) {
      uniquePointIds.add(Number(feature.properties.id));
    }
  });
  const pointsOnScreen = allFeatures.filter((feature: CustomGeoJSONFeatures) =>
    uniquePointIds.has(Number(feature.properties.id))
  );

  return { pointsOnScreen, clustersOnScreen, uniquePointIds, uniqueClusterIds };
};
