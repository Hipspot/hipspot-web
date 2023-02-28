import ClusterMarker from '@components/Marker/clusterMarker';
import PointMarker from '@components/Marker/pointMarker';
import ReasonableMarker from '@components/Marker/ReasonableMarker';
import { S3_URL } from '@constants/s3Url';
import { MarkerList } from '@libs/types/map';
import { renderEmotionElementToHtml } from '@libs/utils/renderEmotionElementToHtml';
import { activeFilterIdAtom } from '@states/clusterList';
import { geoJsonAtom } from '@states/map';
import mapboxgl, { GeoJSONSource, Marker } from 'mapbox-gl';
import { useRecoilValue } from 'recoil';
import getFeaturesOnScreen from '../utils/getFeaturesOnScreen';
import useMapRef from './useMap';
import useMarkerClickAction from './useMarkerClickAction';

const pointMarkerList: MarkerList = {};
const clusterMarkerList: MarkerList = {};

function useMarkerUpdate() {
  const mapRef = useMapRef();
  const allFeatures = useRecoilValue(geoJsonAtom);
  const filterId = useRecoilValue(activeFilterIdAtom);
  const { pointMarkerClickAction, clusterMarkerClickAction } = useMarkerClickAction();

  const updateMarkers: () => void = () => {
    const map = mapRef.current;
    if (!map) return;
    const { pointFeaturesOnScreen, clusterFeaturesOnScreen, uniquePointIds, uniqueClusterIds } = getFeaturesOnScreen({
      map,
      allFeatures,
      filterId,
    });

    // point markers
    pointFeaturesOnScreen.forEach((feature) => {
      const { cafeId, thumbNail } = feature.properties;
      if (Object.hasOwn(pointMarkerList, cafeId)) return;
      try {
        if (filterId === 2) {
          // 가성비 아아 가격 임시 데이터. 이후 properties 값으로 수정해야 함
          const reasonablePrice = 2345;
          const marker = renderEmotionElementToHtml({
            elem: ReasonableMarker({
              handleClickPointMarker: pointMarkerClickAction(filterId),
              feature,
              cafeId,
              reasonablePrice,
            }),
            cssDataKey: 'marker',
          });
          pointMarkerList[cafeId] = new mapboxgl.Marker(marker, { anchor: 'bottom' }).setLngLat(
            feature.geometry.coordinates
          );

          return;
        }
        const marker = renderEmotionElementToHtml({
          elem: PointMarker({
            handleClickPointMarker: pointMarkerClickAction(filterId),
            feature,
            image: `${S3_URL}/${cafeId}/store/${thumbNail}`,
            cafeId,
          }),
          cssDataKey: 'marker',
        });
        pointMarkerList[cafeId] = new mapboxgl.Marker(marker, { anchor: 'bottom' }).setLngLat(
          feature.geometry.coordinates
        );
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    });

    // remove points markers
    Object.entries(pointMarkerList).forEach((markerEntry) => {
      const [id, marker] = markerEntry as [string, Marker];

      if (uniquePointIds.has(Number(id))) {
        marker.addTo(map);
      } else {
        marker.remove();
      }
    });

    // cluster markers
    clusterFeaturesOnScreen.forEach((feature) => {
      const clusterId = feature.properties?.cluster_id;
      if (Object.hasOwn(clusterMarkerList, clusterId)) return;

      const count = feature.properties?.point_count;
      const geo = feature.geometry;

      const marker = renderEmotionElementToHtml({
        elem: ClusterMarker({
          count,
          filterId,
          handleClickClusterMarker: (id: number) => {
            const source = map.getSource(`cafeList/${filterId}`) as GeoJSONSource;

            source.getClusterLeaves(id, 200, 0, (err, leaves) => {
              const properties = leaves.map((leaf) => ({
                ...leaf.properties,
                // 서버에서 geojson 피쳐에 이미지 담아주면 그 이미지 링크로 수정 필요
                image: 'https://hipspotimage.s3.ap-northeast-2.amazonaws.com/bluemilescoffee/store/0.jpg',
              }));
              clusterMarkerClickAction(properties);
            });
          },
          clusterId,
        }),
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

  const removeAllMarkers = () => {
    Object.entries(pointMarkerList).forEach((markerEntry) => {
      const [id, marker] = markerEntry as [string, Marker];
      marker.remove();
      delete pointMarkerList[id];
    });

    Object.entries(clusterMarkerList).forEach((markerEntry) => {
      const [id, marker] = markerEntry as [string, Marker];
      marker.remove();
      delete clusterMarkerList[id];
    });
  };

  return { updateMarkers, removeAllMarkers };
}

export default useMarkerUpdate;
