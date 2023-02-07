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
  clusterMarkerList: Marker[];
  handleClickMarker: (id: number) => void;
}

export const updateMarkers = ({
  map,
  filterId,
  allFeatures,
  pointMarkerList,
  clusterMarkerList,
  handleClickMarker,
}: UpdateMarkersArgs) => {
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
      uniquePointIds.add(feature.properties.id);
    }
  });
  const pointsOnScreen = allFeatures.filter((feature: CustomGeoJSONFeatures) =>
    uniquePointIds.has(feature.properties.id)
  );

  Object.entries(pointMarkerList).forEach((markerEntry) => {
    const [id, marker] = markerEntry as [string, Marker];
    marker.remove();
    delete pointMarkerList[id];
  });

  pointsOnScreen.forEach((feature: CustomGeoJSONFeatures) => {
    const { id } = feature.properties;

    try {
      const marker = renderEmotionElementToHtml({
        elem: (
          <PointMarker
            handleClickMarker={handleClickMarker}
            feature={feature}
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

  clusterMarkerList.forEach((marker) => {
    marker.remove();
  });
  clusterMarkerList.length = 0;

  clustersOnScreen.forEach((feature) => {
    const count = feature.properties?.point_count;
    const geo = feature.geometry;

    const marker = renderEmotionElementToHtml({
      elem: <ClusterMarker number={count} filterId={filterId} />,
      cssDataKey: 'cluster',
    });

    if (geo.type === 'GeometryCollection') return;
    const newMarker = new mapboxgl.Marker(marker).setLngLat(geo.coordinates as [number, number]).addTo(map);
    clusterMarkerList.push(newMarker);
  });
};
