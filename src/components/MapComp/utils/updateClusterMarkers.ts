import ClusterMarker from '@components/Marker/clusterMarker';
import { renderEmotionElementToHtml } from '@libs/utils/renderEmotionElementToHtml';
import mapboxgl, { Map, MapboxGeoJSONFeature, Marker } from 'mapbox-gl';

interface UpdateClusterMarkersParam {
  map: Map;
  clusterFeaturesOnScreen: MapboxGeoJSONFeature[];
  clusterMarkerList: { [id in number | string]: Marker };
  filterId: number;
  handleClickClusterMarker: (id: number) => void;
  uniqueClusterIds: Set<number>;
}

export const updateClusterMarkers = ({
  map,
  clusterFeaturesOnScreen,
  clusterMarkerList,
  filterId,
  handleClickClusterMarker,
  uniqueClusterIds,
}: UpdateClusterMarkersParam) => {
  clusterFeaturesOnScreen.forEach((feature) => {
    const clusterId = feature.properties?.cluster_id;
    if (Object.hasOwn(clusterMarkerList, clusterId)) return;

    const count = feature.properties?.point_count;
    const geo = feature.geometry;

    const marker = renderEmotionElementToHtml({
      elem: ClusterMarker({ count, filterId, handleClickClusterMarker, clusterId }),
      cssDataKey: 'cluster',
    });

    if (geo.type === 'GeometryCollection') return;
    clusterMarkerList[clusterId] = new mapboxgl.Marker(marker)
      .setLngLat(geo.coordinates as [number, number])
      .addTo(map);
  });

  // remove cluster markers
  Object.entries(clusterMarkerList).forEach((markerEntry) => {
    const [id, marker] = markerEntry as [string, Marker];

    if (uniqueClusterIds.has(Number(id))) return;
    marker.remove();
    delete clusterMarkerList[id];
  });
};
