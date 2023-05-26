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
const pointMarkerList: MarkerList = {};
const clusterMarkerList: MarkerList = {};
let activatedCafeMarker: Marker;

function useMarkerUpdate({ featureList, filterId }: { featureList: CustomGeoJSONFeatures[]; filterId: FilterId }) {
  const mapRef = useMap();
  const { pointMarkerClickAction, clusterMarkerClickAction } = useMarkerClickAction();
  const generateMarkerHTML = useMarkerUpdate.generateMarkerHTMLFuncInterCeptor(pointMarkerClickAction);
  const generateClusterHTML = useMarkerUpdate.generateClusterHTMLFuncInterCeptor(filterId, clusterMarkerClickAction);

  /**
   * @abstract
   *  포인트마커 캐싱, 필터링 확인 -> 마커 생성 -> 클러스터마커 존재 확인 -> 클러스터마커 생성
   *
   */
  const updateMarkers = () => {
    const map = mapRef.current;
    if (!map) return;

    const { pointFeaturesOnScreen, clusterFeaturesOnScreen, uniqueClusterIds, uniquePointIds } =
      useMarkerUpdate.getFeaturesOnScreen({
        map,
        featureList,
      });

    /**
     * 마커 생성 페이즈
     */
    pointFeaturesOnScreen.forEach((feature) => {
      const { cafeId } = feature.properties;
      if (Object.hasOwn(pointMarkerList, cafeId)) return;

      const marker = generateMarkerHTML({ filterId, feature });

      const { coordinates } = feature.geometry;

      // 마커 생성과 동시에 맵에 추가
      pointMarkerList[cafeId] = useMarkerUpdate.createMarkerAndAddToMap({ map, marker, coordinates });
    });

    if (filterId === FilterId.Favorite) {
      return;
    }

    /**
     *
     */
    Object.entries(pointMarkerList).forEach((markerEntry) => {
      const [id, marker] = markerEntry as [string, Marker];
      if (uniquePointIds.has(Number(id))) {
        marker.addTo(map);
        return;
      }
      marker.remove();
    });

    // cluster markers 생성
    clusterFeaturesOnScreen.forEach((feature) => {
      const { cluster_id: clusterId } = feature.properties!;
      if (Object.hasOwn(clusterMarkerList, clusterId)) return;

      const { type } = feature.geometry;
      if (type === 'GeometryCollection') return;

      const source = map.getSource(MAP_SOURCE_RENDER_CAFE_LIST) as GeoJSONSource;
      const marker = generateClusterHTML({ feature, source });

      clusterMarkerList[clusterId] = useMarkerUpdate.createMarkerAndAddToMap({
        map,
        marker,
        coordinates: feature.geometry.coordinates as LngLatLike,
      });
    });

    // remove cluster markers
    Object.entries(clusterMarkerList).forEach((markerEntry) => {
      const [id, marker] = markerEntry as [string, Marker];
      if (uniqueClusterIds.has(Number(id))) {
        marker.addTo(map);
        return;
      }
      marker.remove();
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

/**
 * pointFeaturesOnScreen : 화면에 보이는 point feature
 * clusterFeaturesOnScreen : 화면에 보이는 cluster feature
 * uniquePointIds : 유니크 feature의 id
 * uniqueClusterIds : 유니크 클러스터 Id
 */
interface GetFeaturesOnScreenReturns {
  pointFeaturesOnScreen: CustomGeoJSONFeatures[];
  clusterFeaturesOnScreen: MapboxGeoJSONFeature[];
  uniquePointIds: Set<number>;
  uniqueClusterIds: Set<number>;
}

/**
 *
 * @param param0
 * @returns
 */
useMarkerUpdate.getFeaturesOnScreen = ({ map }: { map: Map | undefined; featureList: CustomGeoJSONFeatures[] }) => {
  const pointFeaturesOnScreen: CustomGeoJSONFeatures[] = []; // 화면에 보이는 포인트마커 리스트
  const clusterFeaturesOnScreen: MapboxGeoJSONFeature[] = []; // 화면에 보이는 클러스터마커 리스트
  const uniquePointIds = new Set<number>(); // 유니크 포인트 id
  const uniqueClusterIds = new Set<number>(); // 유니크 클러스터 id

  if (!map || !map.getSource(MAP_SOURCE_RENDER_CAFE_LIST))
    return {
      pointFeaturesOnScreen,
      clusterFeaturesOnScreen,
      uniquePointIds,
      uniqueClusterIds,
    };

  const mapboxFeaturesOnScreen = map.querySourceFeatures(MAP_SOURCE_RENDER_CAFE_LIST);

  mapboxFeaturesOnScreen.forEach((feature) => {
    const { cluster_id: clusterId, cafeId, cluster } = feature.properties!;

    if (uniqueClusterIds.has(Number(clusterId))) return;
    if (uniquePointIds.has(Number(cafeId))) return;

    if (cluster) {
      clusterFeaturesOnScreen.push(feature);
      uniqueClusterIds.add(clusterId);
    }

    if (cafeId) {
      const featureTypeCast = feature as unknown as CustomGeoJSONFeatures;
      pointFeaturesOnScreen.push(featureTypeCast);
      uniquePointIds.add(Number(cafeId));
    }
  });

  return {
    pointFeaturesOnScreen,
    clusterFeaturesOnScreen,
    uniquePointIds,
    uniqueClusterIds,
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
