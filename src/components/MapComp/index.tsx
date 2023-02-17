import React, { useEffect, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { geoJsonAtom } from '@states/map';
import { activeFilterIdAtom } from '@states/clusterList';
import mapboxgl, { MapboxEvent } from 'mapbox-gl';
import { MarkerList } from '@libs/types/map';
import PulsingDotMarker from '@components/Marker/PulsingDotMarker';
import 'mapbox-gl/dist/mapbox-gl.css';
import { DOMID_MAP_COMPONENT } from '@constants/DOM';
import removeAllMarkers from './utils/removeAllMarkers';
import { mapConfig } from './utils/mapConfig';
import addFeatureLayerByFilterId from './eventHandler/addFeatureLayerByFilterId';
import updateMarker from './eventHandler/updateMarker';

type MapCompProps = {
  pointMarkerClickAction: (id: number) => void;
  clusterMarkerClickAction: (id: any[]) => void;
};

function MapComp({ pointMarkerClickAction, clusterMarkerClickAction }: MapCompProps) {
  const activeFilterId = useRecoilValue(activeFilterIdAtom);
  const allFeatures = useRecoilValue(geoJsonAtom);
  const pointMarkerList: MarkerList = useMemo(() => ({}), []);
  const clusterMarkerList: MarkerList = useMemo(() => ({}), []);

  const mapRef = useRef<mapboxgl.Map>();

  const onMapLoad = ({ target: map }: MapboxEvent) => addFeatureLayerByFilterId({ map, allFeatures });
  const onRender = ({ target: map }: MapboxEvent) =>
    updateMarker({
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
    mapRef.current = map;
    map.on('load', onMapLoad);
    map.on('render', onRender);

    map.on('load', () => {
      map.addImage('pulsing-dot', PulsingDotMarker(map), { pixelRatio: 2 });
      map.addSource('dot-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [127.0582071, 37.5447481],
              },
            },
          ],
        },
      });
      map.addLayer({
        id: 'layer-with-pulsing-dot',
        type: 'symbol',
        source: 'dot-point',
        layout: {
          'icon-image': 'pulsing-dot',
        },
      });
    });
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    removeAllMarkers({ pointMarkerList, clusterMarkerList });
    updateMarker({
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
