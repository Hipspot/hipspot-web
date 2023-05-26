import ClusterMarker from "@components/Marker/clusterMarker";
import PointMarker from "@components/Marker/pointMarker";
import ReasonableMarker from "@components/Marker/ReasonableMarker";
import FranchiseMarker from "@components/Marker/FranchiseMarker";
import { CustomGeoJSONFeatures, MarkerList } from "@libs/types/map";
import { renderEmotionElementToHtml } from "@libs/utils/renderEmotionElementToHtml";
import { GeoJSONSource, Marker, Map, MapboxGeoJSONFeature, LngLatLike } from "mapbox-gl";
import useMarkerClickAction from "./useMarkerClickAction";
import getFranchiseByName from "../utils/getFranchiseByName";
import useMap from "./useMap";
import { FilterId } from "@libs/types/filter";
import { MAP_SOURCE_RENDER_CAFE_LIST } from "@constants/map";
import { Franchise } from "@libs/types/marker";

/**
 * 마커 캐싱해두는 objext
 */
const pointMarkerList: MarkerList = {};
const clusterMarkerList: MarkerList = {};
let activatedCafeMarker: Marker;

function useMarkerUpdate({ allFeatures, filterId }: { allFeatures: CustomGeoJSONFeatures[]; filterId: FilterId }) {
  const mapRef = useMap();
  const { pointMarkerClickAction, clusterMarkerClickAction } = useMarkerClickAction();

  const updateMarkers = () => {
    const map = mapRef.current;
    if (!map) return;
    const { pointFeaturesOnScreen, clusterFeaturesOnScreen, uniquePointIds, uniqueClusterIds } =
      useMarkerUpdate.getFeaturesOnScreen({ map, allFeatures });

    // point markers
    pointFeaturesOnScreen.forEach((feature) => {
      const { cafeId, cafeName, filterList } = feature.properties;
      const { coordinates } = feature.geometry;

      // 현재 필터링 id 아닐 경우 리턴
      if (!filterList.includes(filterId)) return;
      // 캐싱된 pointMarkerList에 이미 존재할 경우 리턴
      if (Object.hasOwn(pointMarkerList, cafeId)) return;

      try {
        let marker: HTMLDivElement;
        if (filterId === FilterId.Reasonable) marker = generatePointMarker(feature);
        else if (filterId === FilterId.Franchise && getFranchiseByName(cafeName))
          marker = generateFranchiseMarker(feature);
        else marker = generatePointMarker(feature);

        console.log("생성된 마커 , marker", marker);

        // pointMarkerList에 캐싱
        pointMarkerList[cafeId] = useMarkerUpdate.addMarkerToMap({ map, marker, coordinates });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    });

    //  remove points markers
    Object.entries(pointMarkerList).forEach((markerEntry) => {
      const [id, marker] = markerEntry as [string, Marker];
      if (uniquePointIds.has(Number(id))) marker.addTo(map);
      else marker.remove();
    });

    if (filterId === FilterId.Favorite) {
      return console.log("즐겨찾기 마커 로직 구현예정");
    }

    // cluster markers 생성
    clusterFeaturesOnScreen.forEach((feature) => {
      const clusterId = feature.properties?.cluster_id;
      const { type } = feature.geometry;

      if (Object.hasOwn(clusterMarkerList, clusterId)) return;
      if (type === "GeometryCollection") return;

      const source = map.getSource(MAP_SOURCE_RENDER_CAFE_LIST) as GeoJSONSource;
      const marker = generateClusterMarker({ feature, source });

      clusterMarkerList[clusterId] = useMarkerUpdate.addMarkerToMap({
        map,
        marker,
        coordinates: feature.geometry.coordinates as LngLatLike,
      });
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
    const { coordinates } = feature.geometry;
    try {
      let marker: HTMLDivElement;
      const franchise = getFranchiseByName(cafeName);

      if (filterId === FilterId.Reasonable) marker = generateResonableMarker(feature);
      else if (filterId === FilterId.Franchise && franchise) marker = generateFranchiseMarker(feature);
      else marker = generatePointMarker(feature);

      marker.style.zIndex = "9";
      activatedCafeMarker = useMarkerUpdate.addMarkerToMap({ map, marker, coordinates });

      return;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const removeActivatedCafeMarker = () => activatedCafeMarker?.remove();

  const generatePointMarker = (feature: CustomGeoJSONFeatures) =>
    renderEmotionElementToHtml({
      elem: PointMarker({
        handleClickPointMarker: pointMarkerClickAction,
        feature,
      }),
      cssDataKey: "marker",
    });

  const generateResonableMarker = (feature: CustomGeoJSONFeatures) =>
    renderEmotionElementToHtml({
      elem: ReasonableMarker({
        handleClickPointMarker: pointMarkerClickAction,
        feature,
      }),
      cssDataKey: "marker",
    });

  const generateFranchiseMarker = (feature: CustomGeoJSONFeatures) => {
    const { cafeName } = feature.properties;
    const franchise = getFranchiseByName(cafeName) as Franchise;
    return renderEmotionElementToHtml({
      elem: FranchiseMarker({
        handleClickPointMarker: pointMarkerClickAction,
        feature,
        franchise,
      }),
      cssDataKey: "marker",
    });
  };

  const generateClusterMarker = ({ feature, source }: { feature: MapboxGeoJSONFeature; source: GeoJSONSource }) => {
    const clusterId = feature.properties?.cluster_id;
    const count = feature.properties?.point_count;
    return renderEmotionElementToHtml({
      elem: ClusterMarker({
        count,
        filterId,
        handleClickClusterMarker: handleClickClusterMarker(source),
        clusterId,
      }),
      cssDataKey: "cluster",
    });
  };

  const handleClickClusterMarker = (source: GeoJSONSource) => (id: number) => {
    source.getClusterLeaves(id, 200, 0, (err, leaves) => {
      const properties = leaves.map((leaf) => ({
        ...leaf.properties,
      }));
      clusterMarkerClickAction(properties);
    });
  };

  return { updateMarkers, removeAllMarkers, addActivatedCafeMarker, removeActivatedCafeMarker };
}

export default useMarkerUpdate;

useMarkerUpdate.addMarkerToMap = ({
  map,
  marker,
  coordinates,
}: {
  map: Map;
  marker: HTMLDivElement;
  coordinates: LngLatLike;
}) => new Marker(marker, { anchor: "bottom" }).setLngLat(coordinates).addTo(map);

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
useMarkerUpdate.getFeaturesOnScreen = ({
  map,
  allFeatures,
}: {
  map: Map | undefined;
  allFeatures: CustomGeoJSONFeatures[];
}) => {
  const clusterFeaturesOnScreen: MapboxGeoJSONFeature[] = [];
  const pointFeaturesOnScreen: CustomGeoJSONFeatures[] = [];
  const uniqueClusterIds = new Set<number>();
  const uniquePointIds = new Set<number>();
  if (!map || !map.getSource(MAP_SOURCE_RENDER_CAFE_LIST))
    return {
      pointFeaturesOnScreen,
      clusterFeaturesOnScreen,
      uniquePointIds,
      uniqueClusterIds,
    };

  const mapboxFeaturesOnScreen = map.querySourceFeatures(MAP_SOURCE_RENDER_CAFE_LIST);

  mapboxFeaturesOnScreen.forEach((feature) => {
    const { cluster_id: clusterId, cafeId } = feature.properties!;

    if (uniqueClusterIds.has(clusterId)) return;

    if (feature.properties?.cluster) {
      clusterFeaturesOnScreen.push(feature);
      uniqueClusterIds.add(clusterId);
    }

    if (cafeId) {
      pointFeaturesOnScreen.push(allFeatures[cafeId]);
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
