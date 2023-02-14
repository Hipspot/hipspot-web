import React, { useEffect, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { geoJsonAtom } from '@states/map';
import { activeFilterIdAtom } from '@states/clusterList';
import mapboxgl, { MapboxEvent, Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { DOMID_MAP_COMPONENT } from '@constants/DOM';
import removeAllMarkers from './utils/removeAllMarkers';
import handleMapLoad from './eventHandler/mapLoad';
import handleRender from './eventHandler/render';
import { mapConfig } from './utils/mapConfig';

type MapCompProps = {
  pointMarkerClickAction: (id: number) => void;
  clusterMarkerClickAction: (id: any[]) => void;
};

function MapComp({ pointMarkerClickAction, clusterMarkerClickAction }: MapCompProps) {
  const activeFilterId = useRecoilValue(activeFilterIdAtom);
  const allFeatures = useRecoilValue(geoJsonAtom);
  const pointMarkerList: { [id in number | string]: Marker } = useMemo(() => ({}), []);
  const clusterMarkerList: { [id in number | string]: Marker } = useMemo(() => ({}), []);

  const mapRef = useRef<mapboxgl.Map>();

  const onMapLoad = ({ target: map }: MapboxEvent) => handleMapLoad({ map, allFeatures });
  const onRender = ({ target: map }: MapboxEvent) =>
    handleRender({
      map,
      allFeatures,
      pointMarkerList,
      clusterMarkerList,
      clusterMarkerClickAction,
      pointMarkerClickAction,
      activeFilterId,
    });

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKKEN}`;
    const map = new mapboxgl.Map(mapConfig);
    map.on('load', onMapLoad);
    map.on('render', onRender);
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    removeAllMarkers({ pointMarkerList, clusterMarkerList });
    handleRender({
      map,
      allFeatures,
      pointMarkerList,
      clusterMarkerList,
      clusterMarkerClickAction,
      pointMarkerClickAction,
      activeFilterId,
    });
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
