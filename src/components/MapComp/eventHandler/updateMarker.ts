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
  activeFilterId: number;
}

function updateMarker({
  map,
  allFeatures,
  pointMarkerList,
  clusterMarkerList,
  clusterMarkerClickAction,
  pointMarkerClickAction,
  activeFilterId,
}: UpdateMarkerProps) {
  const { pointFeaturesOnScreen, clusterFeaturesOnScreen, uniquePointIds, uniqueClusterIds } = getFeaturesOnScreen({
    map,
    allFeatures,
    filterId: activeFilterId,
  });

  updatePointMarkers({
    map,
    pointFeaturesOnScreen,
    pointMarkerList,
    handleClickPointMarker: pointMarkerClickAction,
    filterId: activeFilterId,
    uniquePointIds,
  });

  updateClusterMarkers({
    map,
    clusterFeaturesOnScreen,
    clusterMarkerList,
    handleClickClusterMarker: (id: number) => {
      const source = map.getSource(`cafeList/${activeFilterId}`) as GeoJSONSource;

      source.getClusterLeaves(id, 200, 0, (err, aFeatures) => {
        const properties = aFeatures.map((feature) => ({
          ...feature.properties,
          image: 'https://hipspot.s3.ap-northeast-2.amazonaws.com/store/0.jpg',
        }));
        clusterMarkerClickAction(properties);
      });
    },
    filterId: activeFilterId,
    uniqueClusterIds,
  });
}

export default updateMarker;
