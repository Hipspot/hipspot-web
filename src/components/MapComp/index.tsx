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
  const activatedCafeId = useRecoilValue(activatedCafeIdAtom);
  const tabState = useRecoilValue(tabStateAtom);
  const mapRef = useMap();
  const { flyTo, savePrevPostion } = useCameraMove();
  const { updateMarkers, removeAllMarkers, addActivatedCafeMarker, removeActivatedCafeMarker } = useMarkerUpdate();
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

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const activatedCafeFeature = allFeatures.find((feature) => feature.properties.cafeId === activatedCafeId);
    if (!activatedCafeFeature) return;

    addActivatedCafeMarker(activatedCafeFeature);

    return () => {
      removeActivatedCafeMarker();
    };
  }, [activatedCafeId]);

  useEffect(() => {
    if (tabState.popUpState !== 'thumbNail') return;
    removeActivatedCafeMarker();
  }, [tabState.popUpState]);

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
