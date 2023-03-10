import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { geoJsonAtom } from '@states/map';
import { activeFilterIdAtom } from '@states/clusterList';
import { MapboxEvent } from 'mapbox-gl';
import { FindMyLocationEvent } from '@libs/types/customEvents';
import { EVENT_FIND_MY_LOCATION } from '@constants/event';
import { DOMID_MAP_COMPONENT } from '@constants/DOM';
import 'mapbox-gl/dist/mapbox-gl.css';
import addFeatureLayerByFilterId from './eventHandler/addFeatureLayerByFilterId';
import drawPulsingDotMarker from './eventHandler/drawPulsingDotMarker';
import { DOMTargetList } from '../../constants/DOM';
import useCameraMove from './hooks/useCameraMove';
import useMap from './hooks/useMap';
import useMarkerUpdate from './hooks/useMarkerUpdate';

function MapComp() {
  const activeFilterId = useRecoilValue(activeFilterIdAtom);
  const allFeatures = useRecoilValue(geoJsonAtom);
  const mapRef = useMap();

  const { flyTo, savePrevPostion } = useCameraMove();
  const { updateMarkers, removeAllMarkers } = useMarkerUpdate();
  const onMapLoad = ({ target: targetMap }: MapboxEvent) => addFeatureLayerByFilterId({ map: targetMap, allFeatures });
  const onRender = () => updateMarkers();
  const onMoveEnd = ({ target: targetMap }: MapboxEvent) =>
    savePrevPostion(targetMap.getCenter(), { zoom: targetMap.getZoom() });

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    removeAllMarkers();
    updateMarkers();
    map.on('load', onMapLoad);
    map.on('render', onRender);
    map.on('moveend', onMoveEnd);

    return () => {
      map.off('load', onMapLoad);
      map.off('render', onRender);
      map.off('moveend', onMoveEnd);
    };
  }, [activeFilterId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    DOMTargetList[DOMID_MAP_COMPONENT] = document.getElementById(DOMID_MAP_COMPONENT);
    const mapElem = DOMTargetList[DOMID_MAP_COMPONENT];
    mapElem?.addEventListener(EVENT_FIND_MY_LOCATION, (e: FindMyLocationEvent) => {
      drawPulsingDotMarker({ map, coordinates: e.coordinates });
      flyTo(e.coordinates);
    });
  }, []);

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
