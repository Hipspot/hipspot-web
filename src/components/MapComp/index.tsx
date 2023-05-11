import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { geoJsonAtom } from '@states/map';
import { activeFilterIdAtom } from '@states/clusterList';
import { MapboxEvent } from 'mapbox-gl';

import { DOMID_MAP_COMPONENT } from '@constants/DOM';
import 'mapbox-gl/dist/mapbox-gl.css';
import addFeatureLayer from './eventHandler/addFeatureLayer';

import useCameraMove from './hooks/useCameraMove';
import useMap from './hooks/useMap';
import useMarkerUpdate from './hooks/useMarkerUpdate';
import useActivateCafeMarker from './hooks/useActivateCafeMarker';
import useMyLocationMarker from './hooks/useMyLocationMarker';

function MapComp() {
  const activeFilterId = useRecoilValue(activeFilterIdAtom);
  const allFeatures = useRecoilValue(geoJsonAtom);
  const mapRef = useMap();
  const { savePrevPostion } = useCameraMove();
  const { updateMarkers, removeAllMarkers, addActivatedCafeMarker, removeActivatedCafeMarker } = useMarkerUpdate();

  const onMapLoad = ({ target: targetMap }: MapboxEvent) =>
    addFeatureLayer({ map: targetMap, allFeatures, activeFilterId });
  const onRender = () => updateMarkers();
  const onMoveEnd = ({ target: targetMap }: MapboxEvent) =>
    savePrevPostion(targetMap.getCenter(), { zoom: targetMap.getZoom() });

  useActivateCafeMarker({
    add: addActivatedCafeMarker,
    remove: removeActivatedCafeMarker,
    features: [allFeatures],
  });

  /**
   * myLocation 마커 사용
   */
  useMyLocationMarker();

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!allFeatures) return;

    removeAllMarkers();
    removeActivatedCafeMarker();
    updateMarkers();

    if (map.getLayer('cafeList')) {
      map.removeLayer('cafeList');
      map.removeSource('cafeList');
      addFeatureLayer({ map, allFeatures, activeFilterId });
    }

    map.on('load', onMapLoad);
    map.on('render', onRender);
    map.on('moveend', onMoveEnd);

    return () => {
      map.off('load', onMapLoad);
      map.off('render', onRender);
      map.off('moveend', onMoveEnd);
    };
  }, [activeFilterId]);

  return (
    <div
      id={DOMID_MAP_COMPONENT}
      css={css`
        width: 100%;
        height: 100%;
        position: absolute;
      `}
    />
  );
}

export default MapComp;
