import { css } from '@emotion/react';
import { MapboxEvent } from 'mapbox-gl';
import { DOMID_MAP_COMPONENT } from '@constants/DOM';
import 'mapbox-gl/dist/mapbox-gl.css';
import useCameraMove from './hooks/useCameraMove';
import useMarkerUpdate from './hooks/useMarkerUpdate';
import useActivateCafeMarker from './hooks/useActivateCafeMarker';
import useMyLocationMarker from './hooks/useMyLocationMarker';
import useMapSources from './hooks/useAddSource';
import useMapEventListner from './hooks/useMapEventListner';
import useFiltering from './hooks/useFiltering';

function MapComp() {
  const activeFilterId = useFiltering();
  const featureList = useMapSources(activeFilterId);

  const { savePrevPostion } = useCameraMove();
  const { updateMarkers, removeAllMarkers, addActivatedCafeMarker, removeActivatedCafeMarker } = useMarkerUpdate({
    featureList,
    filterId: activeFilterId,
  });

  const onRender = () => updateMarkers();

  const onMoveEnd = ({ target: targetMap }: MapboxEvent) =>
    savePrevPostion(targetMap.getCenter(), { zoom: targetMap.getZoom() });

  /**
   * ActiveCafeMarker 사용
   */
  useActivateCafeMarker({
    add: addActivatedCafeMarker,
    remove: removeActivatedCafeMarker,
    features: [featureList],
  });

  /**
   * myLocation 마커 사용
   */
  useMyLocationMarker();

  /**
   * 랜더링 이벤트 발생시 실행되는 이벤트리스너
   */
  useMapEventListner({
    type: 'render',
    callback: onRender,
    effect: () => {
      removeAllMarkers();
      removeActivatedCafeMarker();
      updateMarkers();
    },
    dep: [activeFilterId],
  });

  /**
   * moveEnd 이벤트 발생시 실행되는 이벤트리스너
   */
  useMapEventListner({
    type: 'moveend',
    callback: onMoveEnd,
    effect: () => {},
    dep: [activeFilterId],
  });

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
