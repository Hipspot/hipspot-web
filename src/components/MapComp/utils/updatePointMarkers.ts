import PointMarker from '@components/Marker/pointMarker';
import { S3_URL } from '@constants/s3Url';
import { CustomGeoJSONFeatures } from '@libs/types/map';
import { renderEmotionElementToHtml } from '@libs/utils/renderEmotionElementToHtml';
import mapboxgl, { Map, Marker } from 'mapbox-gl';

interface UpdatePointMarkersParam {
  map: Map;
  pointFeaturesOnScreen: CustomGeoJSONFeatures[];
  pointMarkerList: { [id in number | string]: Marker };
  filterId: number;
  handleClickPointMarker: (id: number) => void;
  uniquePointIds: Set<number>;
}

export const updatePointMarkers = ({
  map,
  pointFeaturesOnScreen,
  pointMarkerList,
  handleClickPointMarker,
  filterId,
  uniquePointIds,
}: UpdatePointMarkersParam) => {
  pointFeaturesOnScreen.forEach((feature) => {
    const { cafeId, thumbNail } = feature.properties;
    if (Object.hasOwn(pointMarkerList, cafeId)) return;
    try {
      const marker = renderEmotionElementToHtml({
        elem: PointMarker({
          handleClickPointMarker,
          feature,
          activeFilterId: filterId,
          image: `${S3_URL}/${cafeId}/store/${thumbNail}`,
          id: cafeId,
        }),
        cssDataKey: 'marker',
      });
      pointMarkerList[cafeId] = new mapboxgl.Marker(marker, { anchor: 'bottom' })
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  });

  // remove points markers
  Object.entries(pointMarkerList).forEach((markerEntry) => {
    const [id, marker] = markerEntry as [string, Marker];
    if (uniquePointIds.has(Number(id))) return;
    marker.remove();
    delete pointMarkerList[id];
  });
};