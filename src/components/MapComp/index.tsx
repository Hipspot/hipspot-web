import { useEffect } from 'react';
import { css } from '@emotion/react';
import { MapboxEvent } from 'mapbox-gl';
import { DOMID_MAP_COMPONENT } from '@constants/DOM';
import 'mapbox-gl/dist/mapbox-gl.css';

import useCameraMove from './hooks/useCameraMove';
import useMap from './hooks/useMap';
import useMarkerUpdate from './hooks/useMarkerUpdate';
import useActivateCafeMarker from './hooks/useActivateCafeMarker';
import useMyLocationMarker from './hooks/useMyLocationMarker';
import useFiltering from './hooks/useFiltering';
import useMapSources from './hooks/useAddSource';

function MapComp() {
  const allFeatures = useMapSources();
  const activeFilterId = useFiltering();
  const mapRef = useMap();
  const { savePrevPostion } = useCameraMove();
  const { updateMarkers, removeAllMarkers, addActivatedCafeMarker, removeActivatedCafeMarker } =
    useMarkerUpdate(allFeatures);

  const onRender = () => updateMarkers();
  const onMoveEnd = ({ target: targetMap }: MapboxEvent) =>
    savePrevPostion(targetMap.getCenter(), { zoom: targetMap.getZoom() });

  /**
   * ActiveCafeMarker 사용
   */
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

    map.on('render', onRender);
    map.on('moveend', onMoveEnd);

    return () => {
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
