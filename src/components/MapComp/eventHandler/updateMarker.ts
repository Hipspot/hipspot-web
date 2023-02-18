import { CustomGeoJSONFeatures } from '@libs/types/map';
import { GeoJSONSource, Marker } from 'mapbox-gl';
import getFeaturesOnScreen from '../utils/getFeaturesOnScreen';
import { updateClusterMarkers } from '../utils/updateClusterMarkers';
import { updatePointMarkers } from '../utils/updatePointMarkers';

interface UpdateMarkerProps {
  map: mapboxgl.Map;
  allFeatures: CustomGeoJSONFeatures[];
  pointMarkerList: { [id in number | string]: Marker };
  clusterMarkerList: { [id in number | string]: Marker };
  pointMarkerClickAction: (id: number) => void;
  clusterMarkerClickAction: (id: any[]) => void;
  filterId: number;
}

function updateMarker({
  map,
  allFeatures,
  pointMarkerList,
  clusterMarkerList,
  clusterMarkerClickAction,
  pointMarkerClickAction,
  filterId,
}: UpdateMarkerProps) {
  const { pointFeaturesOnScreen, clusterFeaturesOnScreen, uniquePointIds, uniqueClusterIds } = getFeaturesOnScreen({
    map,
    allFeatures,
    filterId,
  });

  updatePointMarkers({
    map,
    pointFeaturesOnScreen,
    pointMarkerList,
    handleClickPointMarker: pointMarkerClickAction,
    filterId,
    uniquePointIds,
  });

  updateClusterMarkers({
    map,
    clusterFeaturesOnScreen,
    clusterMarkerList,
    handleClickClusterMarker: (id: number) => {
      const source = map.getSource(`cafeList/${filterId}`) as GeoJSONSource;

      source.getClusterLeaves(id, 200, 0, (err, aFeatures) => {
        const properties = aFeatures.map((feature) => ({
          ...feature.properties,
          // 서버에서 geojson 피쳐에 이미지 담아주면 그 이미지 링크로 수정 필요
          image: 'https://hipspot.s3.ap-northeast-2.amazonaws.com/store/0.jpg',
        }));
        clusterMarkerClickAction(properties);
      });
    },
    filterId,
    uniqueClusterIds,
  });
}

export default updateMarker;
