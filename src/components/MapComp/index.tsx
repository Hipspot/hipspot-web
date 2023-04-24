import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { geoJsonAtom } from '@states/map';
import { activeFilterIdAtom } from '@states/clusterList';
import { GeoJSONSourceOptions, MapboxEvent } from 'mapbox-gl';
import { FindMyLocationEvent } from '@libs/types/customEvents';
import { EVENT_FIND_MY_LOCATION } from '@constants/event';
import { DOMID_MAP_COMPONENT } from '@constants/DOM';
import 'mapbox-gl/dist/mapbox-gl.css';
import { activatedCafeIdAtom, tabStateAtom } from '@states/infoWindow';
import addFeatureLayer from './eventHandler/addFeatureLayer';
import drawPulsingDotMarker from './eventHandler/drawPulsingDotMarker';
import { DOMTargetList } from '../../constants/DOM';
import useCameraMove from './hooks/useCameraMove';
import useMap from './hooks/useMap';
import useMarkerUpdate from './hooks/useMarkerUpdate';

function MapComp() {
  const activeFilterId = useRecoilValue(activeFilterIdAtom);
  const allFeatures = useRecoilValue(geoJsonAtom);
  const tabState = useRecoilValue(tabStateAtom);
  const activatedCafeId = useRecoilValue(activatedCafeIdAtom);
  const mapRef = useMap();
  const { flyTo, savePrevPostion } = useCameraMove();
  const { updateMarkers, removeAllMarkers, getPointMarkerById } = useMarkerUpdate();
  const onMapLoad = ({ target: targetMap }: MapboxEvent) =>
    addFeatureLayer({ map: targetMap, allFeatures, activeFilterId });
  const onRender = () => updateMarkers();
  const onMoveEnd = ({ target: targetMap }: MapboxEvent) =>
    savePrevPostion(targetMap.getCenter(), { zoom: targetMap.getZoom() });

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!allFeatures) return;

    removeAllMarkers();
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

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const style = map.getStyle();
    const source = style.sources.cafeList as GeoJSONSourceOptions;
    const { popUpState } = tabState;

    if (popUpState === 'thumbNail') {
      source.cluster = true;
      map.setStyle(style);
    } else {
      source.cluster = false;
      map.setStyle(style);
    }
  }, [tabState]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const marker = getPointMarkerById(activatedCafeId);
    if (!marker) return;

    const elem = marker.getElement();

    elem.style.zIndex = '10';

    return () => {
      elem.style.zIndex = '0';
    };
  }, [activatedCafeId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!allFeatures) return;
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
