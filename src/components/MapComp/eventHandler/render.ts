import { CustomGeoJSONFeatures } from '@libs/types/map';
import { GeoJSONSource, Marker } from 'mapbox-gl';
import { updateMarkers } from '../utils/updateMarkers';

interface HandlerRenderProps {
  map: mapboxgl.Map;
  allFeatures: CustomGeoJSONFeatures[];
  pointMarkerList: { [id in number | string]: Marker };
  clusterMarkerList: { [id in number | string]: Marker };
  pointMarkerClickAction: (id: number) => void;
  clusterMarkerClickAction: (id: any[]) => void;
  activeFilterId: number;
}

function handleRender({
  map,
  allFeatures,
  pointMarkerList,
  clusterMarkerList,
  clusterMarkerClickAction,
  pointMarkerClickAction,
  activeFilterId,
}: HandlerRenderProps) {
  updateMarkers({
    map,
    filterId: activeFilterId,
    allFeatures,
    pointMarkerList,
    clusterMarkerList,
    handleClickPointMarker: pointMarkerClickAction,
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
  });
}

export default handleRender;
