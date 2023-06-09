import ClusterMarker from '@components/Marker/clusterMarker';
import PointMarker from '@components/Marker/pointMarker';
import ReasonableMarker from '@components/Marker/ReasonableMarker';
import FranchiseMarker from '@components/Marker/FranchiseMarker';
import { CustomGeoJSONFeatures, MarkerList } from '@libs/types/map';
import { renderEmotionElementToHtml } from '@libs/utils/renderEmotionElementToHtml';
import { GeoJSONSource, Marker, Map, MapboxGeoJSONFeature, LngLatLike } from 'mapbox-gl';
import useMarkerClickAction from './useMarkerClickAction';
import getFranchiseByName from '../utils/getFranchiseByName';
import useMap from './useMap';
import { FilterId } from '@libs/types/filter';
import { MAP_SOURCE_RENDER_CAFE_LIST } from '@constants/map';
import { Franchise } from '@libs/types/marker';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
/**
 * 마커 캐싱해두는 objext
 */
const cachedPointMarkerList: MarkerList = {};
const cachedClusterMarkerList: MarkerList = {};
let activatedCafeMarker: Marker;

function useMarkerUpdate({ filterId }: { filterId: FilterId }) {
  const mapRef = useMap();
  const { pointMarkerClickAction, clusterMarkerClickAction } = useMarkerClickAction();

  // generateMarker 함수들에 handler 전달해서 사용
  const generateMarkerHTML = useMarkerUpdate.generateMarkerHTMLFuncInterCeptor(pointMarkerClickAction);
  const generateClusterHTML = useMarkerUpdate.generateClusterHTMLFuncInterCeptor(filterId, clusterMarkerClickAction);

  /**
   * @abstract
   *  features 확인 -> 포인트마커 업로드 -> 포인트마커 삭제 ->  클러스터마커 업로드 -> 클러스터마커 삭제
   *
   */
  const updateMarkers = () => {
    const map = mapRef.current;
    if (!map || map.isRotating()) return;

    /**
     * 1. features 확인
     */
    const {
      onScreenPointMarkerFeatures,
      onScreenClusterMarkerFeatures,
      onScreenClusterMarkerIds,
      onScreenPointMarkerIds,
    } = useMarkerUpdate.getOnScreenFeatures({ map });

    /**
     * 마커 생성 및 추가 페이즈
     * 캐싱된 마커가 있으면 사용, 없으면 새로 만들어서 추가
     */
    onScreenPointMarkerFeatures.forEach(async (feature) => {
      const { cafeId } = feature.properties;
      const { coordinates } = feature.geometry;

      if (Object.hasOwn(cachedPointMarkerList, cafeId)) return cachedPointMarkerList[cafeId].addTo(map);

      const marker = generateMarkerHTML({ filterId, feature });
      cachedPointMarkerList[cafeId] = useMarkerUpdate.createMarkerAndAddToMap({ map, marker, coordinates });
    });

    if (filterId === FilterId.Favorite) {
      return;
    }

    /**
     * 포인트마커 삭제 페이즈
     */
    Object.entries(cachedPointMarkerList).forEach((markerEntry) => {
      const [id, marker] = markerEntry as [string, Marker];
      if (!onScreenPointMarkerIds.has(Number(id))) marker.remove(); // O(1)로 조회
    });

    /**
     *  cluster markers 추가 페이즈
     */

    onScreenClusterMarkerFeatures.forEach(async (feature) => {
      const { cluster_id: clusterId } = feature.properties!;
      const { type } = feature.geometry;
      if (Object.hasOwn(cachedClusterMarkerList, clusterId)) return cachedClusterMarkerList[clusterId].addTo(map);

      if (type === 'GeometryCollection') return;

      const source = map.getSource(MAP_SOURCE_RENDER_CAFE_LIST) as GeoJSONSource;
      const marker = generateClusterHTML({ feature, source });

      cachedClusterMarkerList[clusterId] = useMarkerUpdate.createMarkerAndAddToMap({
        map,
        marker,
        coordinates: feature.geometry.coordinates as LngLatLike,
      });
    });

    /**
     * 클러스터마커 삭제 페이즈
     */
    Object.entries(cachedClusterMarkerList).forEach((markerEntry) => {
      const [id, marker] = markerEntry as [string, Marker];
      if (!onScreenClusterMarkerIds.has(Number(id))) marker.remove();
    });
  };

  const removeAllMarkers = () => {
    Object.entries(cachedPointMarkerList).forEach((markerEntry) => {
      const [id, marker] = markerEntry as [string, Marker];
      marker.remove();
      delete cachedPointMarkerList[id];
    });

    Object.entries(cachedClusterMarkerList).forEach((markerEntry) => {
      const [id, marker] = markerEntry as [string, Marker];
      marker.remove();
      delete cachedClusterMarkerList[id];
    });
  };

  const addActivatedCafeMarker = (feature: CustomGeoJSONFeatures) => {
    const map = mapRef.current;
    if (!map) return;
    const { coordinates } = feature.geometry;
    try {
      const marker = generateMarkerHTML({ filterId, feature });
      marker.style.zIndex = '9';
      activatedCafeMarker = useMarkerUpdate.createMarkerAndAddToMap({ map, marker, coordinates });
      return;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const removeActivatedCafeMarker = () => activatedCafeMarker?.remove();

  return { updateMarkers, removeAllMarkers, addActivatedCafeMarker, removeActivatedCafeMarker };
}

export default useMarkerUpdate;

useMarkerUpdate.createMarkerAndAddToMap = ({
  map,
  marker,
  coordinates,
}: {
  map: Map;
  marker: HTMLDivElement;
  coordinates: LngLatLike;
}) => new Marker(marker, { anchor: 'bottom' }).setLngLat(coordinates).addTo(map);

interface GetFeaturesOnScreenReturns {
  onScreenPointMarkerFeatures: CustomGeoJSONFeatures[];
  onScreenClusterMarkerFeatures: MapboxGeoJSONFeature[];
  onScreenPointMarkerIds: Set<number>;
  onScreenClusterMarkerIds: Set<number>;
}
/**
 *
 * @param param0
 * @returns
 */
useMarkerUpdate.getOnScreenFeatures = ({ map }: { map: Map | undefined }) => {
  const onScreenPointMarkerFeatures: CustomGeoJSONFeatures[] = []; // 화면에 보이는 포인트마커 리스트
  const onScreenClusterMarkerFeatures: MapboxGeoJSONFeature[] = []; // 화면에 보이는 클러스터마커 리스트
  const onScreenPointMarkerIds = new Set<number>(); // Set으로
  const onScreenClusterMarkerIds = new Set<number>(); // 유니크 클러스터 id

  if (!map || !map.getSource(MAP_SOURCE_RENDER_CAFE_LIST))
    return {
      onScreenPointMarkerFeatures,
      onScreenClusterMarkerFeatures,
      onScreenPointMarkerIds,
      onScreenClusterMarkerIds,
    };

  const mapboxFeaturesOnScreen = map.querySourceFeatures(MAP_SOURCE_RENDER_CAFE_LIST);

  mapboxFeaturesOnScreen.forEach((feature) => {
    const { cluster_id: clusterId, cafeId, cluster } = feature.properties!;

    if (onScreenClusterMarkerIds.has(Number(clusterId))) return;
    if (onScreenPointMarkerIds.has(Number(cafeId))) return;

    if (cluster) {
      onScreenClusterMarkerFeatures.push(feature);
      onScreenClusterMarkerIds.add(clusterId);
    }

    if (cafeId) {
      const featureTypeCast = feature as unknown as CustomGeoJSONFeatures;
      onScreenPointMarkerFeatures.push(featureTypeCast);
      onScreenPointMarkerIds.add(Number(cafeId));
    }
  });

  return {
    onScreenPointMarkerFeatures,
    onScreenClusterMarkerFeatures,
    onScreenPointMarkerIds,
    onScreenClusterMarkerIds,
  } as GetFeaturesOnScreenReturns;
};

/**
 * @abstract
 *  (handle) => ({type, feature, customHandle}) => marker
 *  generateMarkerHTMLFuncInterCeptor(handle) = generateMarkerHTML({type, feature})
 *
 * @description
 *   generateMarkerHTML 함수를 생성하기 위한 유틸함수,
 *   generateMarkerHTML 함수는 type, feature, customHandle을 받아서 실제 마커를 생성해줄 수 있는 함수,
 *   마커 클릭에대한 동일한 액션을 param으로 먼저 받아서 generate 함수를 만들어 리턴하고
 *   마커마다  핸들러를 커스텀 하려면 generateMarkerHTML 함수에 커스텀 핸들러를 넣어준다.
 *
 *
 * @param handle : pointerMaker 클릭시 동작할 함수
 * @returns generateMarkerHTML : 마커 생성 함수, 이 함수를 실행시켜야 HTML로 이루어진 마커가 생성됨
 *
 *
 */
// prettier-ignore
useMarkerUpdate.generateMarkerHTMLFuncInterCeptor =
  (handle: (id: number) => void) =>
  ({ filterId, feature, customHandle }: { filterId: FilterId; feature: CustomGeoJSONFeatures, customHandle?:(id:number)=>void }) => {

    let elem: EmotionJSX.Element;
    const handleClickPointMarker  = handle || customHandle;
    
    switch (filterId) {
    
      case FilterId.Reasonable:
        elem = ReasonableMarker({ handleClickPointMarker, feature });
        break;
      case FilterId.Franchise: {
        const { cafeName } = feature.properties;
        const franchise = getFranchiseByName(cafeName) as Franchise;
        elem = FranchiseMarker({ handleClickPointMarker, feature, franchise });
        break;
      }
      case FilterId.Favorite:
        break;
      default:
          elem = PointMarker({ handleClickPointMarker , feature});
          break;
    }

    return renderEmotionElementToHtml({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      elem: elem!,
      cssDataKey: 'marker',
    });
  };
/**
 * @abstract
 *  (handle) => ({type, feature, customHandle}) => clusterMarker
 *  generateClusterHTMLFuncInterCeptor(handle) = generateClusterHTML({type, feature})
 *
 * @description
 *   generateClusterHTML 함수를 생성하기 위한 유틸함수,
 *   generateClusterHTML 함수는 type, feature, customHandle을 받아서 실제 마커를 생성해줄 수 있는 함수,
 *   클러스터마커 클릭에대한 동일한 액션을 param으로 먼저 받아서 generate 함수를 만들어 리턴하고
 *   마커마다  핸들러를 커스텀 하려면 generateClusterHTML 함수에 커스텀 핸들러를 넣어준다.
 *
 * @param filterId : 필터링 아이디
 * @param handle : clusterMaker 클릭시 동작할 함수
 * @returns generateClusterHTML : 마커 생성 함수, 이 함수를 실행시켜야 HTML로 이루어진 마커가 생성됨
 *
 *
 */
// prettier-ignore
useMarkerUpdate.generateClusterHTMLFuncInterCeptor =
  (filterId: FilterId, handle :  (clusterList: any) => void) =>
  ({ feature, source, customHandle }: { feature: MapboxGeoJSONFeature; source: GeoJSONSource, customHandle?:(clusterList:any)=>void }) => {

    const clusterMarkerClickAction = handle || customHandle;

    const handleClickClusterMarker = (id: number) => {
      source.getClusterLeaves(id, 200, 0, (err, leaves) => {
        const properties = leaves.map((leaf) => ({
          ...leaf.properties,
        }));

        clusterMarkerClickAction(properties);
      });
    };


    const clusterId = feature.properties?.cluster_id;
    const count = feature.properties?.point_count;
    return renderEmotionElementToHtml({
      elem: ClusterMarker({
        count,
        filterId,
        handleClickClusterMarker,
        clusterId,
      }),
      cssDataKey: 'cluster',
    });
  };
