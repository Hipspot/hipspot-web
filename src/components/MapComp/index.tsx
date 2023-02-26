import React, { useEffect, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { geoJsonAtom } from '@states/map';
import { activeFilterIdAtom } from '@states/clusterList';
import { cameraStateAtom, CameraStateType } from '@states/infoWindow';
import mapboxgl, { MapboxEvent } from 'mapbox-gl';
import { MarkerList } from '@libs/types/map';
import { FindMyLocationEvent } from '@libs/types/customEvents';
import { EVENT_FIND_MY_LOCATION } from '@constants/event';
import { DOMID_MAP_COMPONENT } from '@constants/DOM';
import 'mapbox-gl/dist/mapbox-gl.css';
import removeAllMarkers from './utils/removeAllMarkers';
import { mapConfig } from './utils/mapConfig';
import addFeatureLayerByFilterId from './eventHandler/addFeatureLayerByFilterId';
import updateMarker from './eventHandler/updateMarker';
import drawPulsingDotMarker from './eventHandler/drawPulsingDotMarker';
import { DOMTargetList } from '../../constants/DOM';

type MapCompProps = {
  pointMarkerClickAction: (id: number) => void;
  clusterMarkerClickAction: (id: any[]) => void;
};

function MapComp({ pointMarkerClickAction, clusterMarkerClickAction }: MapCompProps) {
  const activeFilterId = useRecoilValue(activeFilterIdAtom);
  const allFeatures = useRecoilValue(geoJsonAtom);
  const cameraState = useRecoilValue(cameraStateAtom);
  const pointMarkerList: MarkerList = useMemo(() => ({}), []);
  const clusterMarkerList: MarkerList = useMemo(() => ({}), []);
  const activeFilterIdRef = useRef(activeFilterId);
  const mapRef = useRef<mapboxgl.Map>();
  const cameraRef = useRef<CameraStateType>({
    center: [127.0582071, 37.5447481],
    pitch: 0,
    bearing: 0,
    markerClicked: false,
    zoom: 17,
  });

  const onMapLoad = ({ target: map }: MapboxEvent) => addFeatureLayerByFilterId({ map, allFeatures });
  const onRender = ({ target: map }: MapboxEvent) => {
    const filterId = activeFilterIdRef.current;
    updateMarker({
      map,
      allFeatures,
      pointMarkerList,
      clusterMarkerList,
      clusterMarkerClickAction,
      pointMarkerClickAction,
      filterId,
    });
  };

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKKEN}`;
    const map = new mapboxgl.Map(mapConfig);
    mapRef.current = map;
    map.on('load', onMapLoad);
    map.on('render', onRender);
  }, []);

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
      pointMarkerClickAction,
      filterId,
    });
  }, [activeFilterId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }
    const { pitch, bearing, center, zoom } = cameraState;
    map.flyTo({
      pitch,
      bearing,
      center,
      duration: 500,
      zoom,
    });
    cameraRef.current = {
      ...cameraState,
    };
  }, [cameraState]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    DOMTargetList[DOMID_MAP_COMPONENT] = document.getElementById(DOMID_MAP_COMPONENT);
    const mapElem = DOMTargetList[DOMID_MAP_COMPONENT];
    mapElem?.addEventListener(EVENT_FIND_MY_LOCATION, (e: FindMyLocationEvent) => {
      drawPulsingDotMarker({ map, coordinates: e.coordinates });
      map.flyTo({ center: e.coordinates });
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
