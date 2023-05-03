import ClusterMarker from '@components/Marker/clusterMarker';
import PointMarker from '@components/Marker/pointMarker';
import ReasonableMarker from '@components/Marker/ReasonableMarker';
import FranchiseMarker from '@components/Marker/FranchiseMarker';
import { CustomGeoJSONFeatures, MarkerList } from '@libs/types/map';
import { renderEmotionElementToHtml } from '@libs/utils/renderEmotionElementToHtml';
import { activeFilterIdAtom } from '@states/clusterList';
import { geoJsonAtom } from '@states/map';
import mapboxgl, { GeoJSONSource, Marker } from 'mapbox-gl';
import { useRecoilValue } from 'recoil';
import getFeaturesOnScreen from '../utils/getFeaturesOnScreen';
import useMapRef from './useMap';
import useMarkerClickAction from './useMarkerClickAction';
import getFranchiseByName from '../utils/getFranchiseByName';

const pointMarkerList: MarkerList = {};
const clusterMarkerList: MarkerList = {};
let activatedCafeMarker: mapboxgl.Marker;

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
      const { cafeId, cafeName } = feature.properties;
      if (Object.hasOwn(pointMarkerList, cafeId)) return;
      try {
        if (filterId === 2) {
          const marker = renderEmotionElementToHtml({
            elem: ReasonableMarker({
              handleClickPointMarker: pointMarkerClickAction,
              feature,
            }),
            cssDataKey: 'marker',
          });
          pointMarkerList[cafeId] = new mapboxgl.Marker(marker, { anchor: 'bottom' }).setLngLat(
            feature.geometry.coordinates
          );

          return;
        }

        const franchise = getFranchiseByName(cafeName);
        if (franchise === undefined) {
          const marker = renderEmotionElementToHtml({
            elem: PointMarker({
              handleClickPointMarker: pointMarkerClickAction,
              feature,
            }),
            cssDataKey: 'marker',
          });
          pointMarkerList[cafeId] = new mapboxgl.Marker(marker, { anchor: 'bottom' }).setLngLat(
            feature.geometry.coordinates
          );

          return;
        }

        const marker = renderEmotionElementToHtml({
          elem: FranchiseMarker({
            handleClickPointMarker: pointMarkerClickAction,
            feature,
            franchise,
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
            const source = map.getSource('cafeList') as GeoJSONSource;

            source.getClusterLeaves(id, 200, 0, (err, leaves) => {
              const properties = leaves.map((leaf) => ({
                ...leaf.properties,
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

  const addActivatedCafeMarker = (feature: CustomGeoJSONFeatures) => {
    const map = mapRef.current;
    if (!map) return;

    const { cafeName } = feature.properties;

    try {
      if (filterId === 2) {
        const marker = renderEmotionElementToHtml({
          elem: ReasonableMarker({
            handleClickPointMarker: pointMarkerClickAction,
            feature,
          }),
          cssDataKey: 'marker',
        });

        marker.style.zIndex = '9';

        activatedCafeMarker = new mapboxgl.Marker(marker, { anchor: 'bottom' })
          .setLngLat(feature.geometry.coordinates)
          .addTo(map);

        return;
      }

      const franchise = getFranchiseByName(cafeName);
      if (franchise === undefined) {
        const marker = renderEmotionElementToHtml({
          elem: PointMarker({
            handleClickPointMarker: pointMarkerClickAction,
            feature,
          }),
          cssDataKey: 'marker',
        });
        marker.style.zIndex = '9';

        activatedCafeMarker = new mapboxgl.Marker(marker, { anchor: 'bottom' })
          .setLngLat(feature.geometry.coordinates)
          .addTo(map);

        return;
      }

      const marker = renderEmotionElementToHtml({
        elem: FranchiseMarker({
          handleClickPointMarker: pointMarkerClickAction,
          feature,
          franchise,
        }),
        cssDataKey: 'marker',
      });
      marker.style.zIndex = '9';

      activatedCafeMarker = new mapboxgl.Marker(marker, { anchor: 'bottom' })
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const removeActivatedCafeMarker = () => activatedCafeMarker?.remove();

  return { updateMarkers, removeAllMarkers, addActivatedCafeMarker, removeActivatedCafeMarker };
}

export default useMarkerUpdate;
