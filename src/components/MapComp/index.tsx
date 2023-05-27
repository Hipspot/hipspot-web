import { css } from '@emotion/react';
import { MapboxEvent } from 'mapbox-gl';
import { DOMID_MAP_COMPONENT } from '@constants/DOM';
import 'mapbox-gl/dist/mapbox-gl.css';
import useCameraMove from './hooks/useCameraMove';
import useMarkerUpdate from './hooks/useMarkerUpdate';
import useActivateCafeMarker from './hooks/useActivateCafeMarker';
import useMyLocationMarker from './hooks/useMyLocationMarker';
import useMapSourceAndLayer from './hooks/useAddSource';
import useMapEventListner from './hooks/useMapEventListner';
import useFiltering from './hooks/useFiltering';

function MapComp() {
  const [filterId, filteredFeatures] = useFiltering();

  const { savePrevPostion } = useCameraMove();
  const { updateMarkers, removeAllMarkers, addActivatedCafeMarker, removeActivatedCafeMarker } = useMarkerUpdate({
    filterId,
  });

  // 맵 관련 이벤트리스너
  const onRender = () => updateMarkers();
  const onMoveEnd = ({ target: targetMap }: MapboxEvent) =>
    savePrevPostion(targetMap.getCenter(), { zoom: targetMap.getZoom() });

  /**
   * filterId에 따라 Source와 레이어
   */
  useMapSourceAndLayer({ filteredFeatures }, [filterId]);

  /**
   * ActiveCafeMarker 사용
   */
  useActivateCafeMarker({
    add: addActivatedCafeMarker,
    remove: removeActivatedCafeMarker,
    features: [filteredFeatures],
  });

  /**
   * myLocation 마커 사용
   */
  useMyLocationMarker();

  /**
   * 랜더링 이벤트 발생시 실행되는 이벤트리스너
   */
  useMapEventListner(
    {
      type: 'render',
      callback: onRender,
      effect: () => {
        removeAllMarkers();
        removeActivatedCafeMarker();
        updateMarkers();
      },
    },
    [filterId]
  );

  /**
   * moveEnd 이벤트 발생시 실행되는 이벤트리스너
   */
  useMapEventListner(
    {
      type: 'moveend',
      callback: onMoveEnd,
      effect: () => {},
    },
    [filterId]
  );

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
