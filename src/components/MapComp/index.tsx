import React, { useEffect, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { geoJsonAtom } from '@states/map';
import { activeFilterIdAtom } from '@states/clusterList';
import { MapboxEvent } from 'mapbox-gl';
import { MarkerList } from '@libs/types/map';
import { FindMyLocationEvent } from '@libs/types/customEvents';
import { EVENT_FIND_MY_LOCATION } from '@constants/event';
import { DOMID_MAP_COMPONENT } from '@constants/DOM';
import 'mapbox-gl/dist/mapbox-gl.css';
import removeAllMarkers from './utils/removeAllMarkers';
import addFeatureLayerByFilterId from './eventHandler/addFeatureLayerByFilterId';
import updateMarker from './eventHandler/updateMarker';
import drawPulsingDotMarker from './eventHandler/drawPulsingDotMarker';
import { DOMTargetList } from '../../constants/DOM';
import useCameraMove from './hooks/useCameraMove';
import useMap from './hooks/useMap';

type MapCompProps = {
  pointMarkerClickAction: (filterId: number) => (id: number) => void;
  clusterMarkerClickAction: (id: any[]) => void;
};

function MapComp({ pointMarkerClickAction, clusterMarkerClickAction }: MapCompProps) {
  const activeFilterId = useRecoilValue(activeFilterIdAtom);
  const allFeatures = useRecoilValue(geoJsonAtom);
  const pointMarkerList: MarkerList = useMemo(() => ({}), []);
  const clusterMarkerList: MarkerList = useMemo(() => ({}), []);
  const activeFilterIdRef = useRef(activeFilterId);
  const mapRef = useMap();

  const { flyTo, savePrevPostion } = useCameraMove();

  const onMapLoad = ({ target: targetMap }: MapboxEvent) => addFeatureLayerByFilterId({ map: targetMap, allFeatures });
  const onRender = ({ target: targetMap }: MapboxEvent) => {
    const filterId = activeFilterIdRef.current;
    updateMarker({
      map: targetMap,
      allFeatures,
      pointMarkerList,
      clusterMarkerList,
      clusterMarkerClickAction,
      pointMarkerClickAction: pointMarkerClickAction(filterId),
      filterId,
    });
  };
  const onMoveEnd = ({ target: targetMap }: MapboxEvent) =>
    savePrevPostion(targetMap.getCenter(), { zoom: targetMap.getZoom() });

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    activeFilterIdRef.current = activeFilterId;
    const filterId = activeFilterIdRef.current;
    removeAllMarkers({ pointMarkerList, clusterMarkerList });
    updateMarker({
      map,
      allFeatures,
      pointMarkerList,
      clusterMarkerList,
      clusterMarkerClickAction,
      pointMarkerClickAction: pointMarkerClickAction(filterId),
      filterId,
    });
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
