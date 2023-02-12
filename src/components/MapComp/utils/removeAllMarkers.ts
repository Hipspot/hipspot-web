import { Marker } from 'mapbox-gl';

interface RemoveAllMarkersArgs {
  pointMarkerList: { [id in number | string]: Marker };
  clusterMarkerList: { [id in number | string]: Marker };
}

const removeAllMarkers = ({ pointMarkerList, clusterMarkerList }: RemoveAllMarkersArgs) => {
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

export default removeAllMarkers;
