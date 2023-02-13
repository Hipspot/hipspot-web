import React, { useEffect, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import { CustomGeoJSONFeatures } from '@libs/types/map';
import { geoJsonAtom } from '@states/map';
import { activeFilterIdAtom } from '@states/clusterList';
import mapboxgl, { Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FilterId } from '@libs/types/filter';
import { FeatureCollection } from 'geojson';
import getEnumNumberValues from '@libs/utils/getEnumNumberValues';
import { mapConfig } from './utils/mapConfig';
import { updateMarkers } from './utils/updateMarkers';
import removeAllMarkers from './utils/removeAllMarkers';

type MapCompProps = {
  handleClickMarker: (id: number) => void;
};

function MapComp({ handleClickMarker }: MapCompProps) {
  const activeFilterId = useRecoilValue(activeFilterIdAtom);
  const allFeatures = useRecoilValue(geoJsonAtom);
  const mapRef = useRef<mapboxgl.Map>();
  const activeFilterIdRef = useRef(activeFilterId);
  const pointMarkerList: { [id in number | string]: Marker } = useMemo(() => ({}), []);
  const clusterMarkerList: { [id in number | string]: Marker } = useMemo(() => ({}), []);

  const handleUpdateMarkers = () => {
    const map = mapRef.current;
    if (!map) return;

    const filterId = activeFilterIdRef.current;

    updateMarkers({
      map,
      filterId,
      allFeatures,
      pointMarkerList,
      clusterMarkerList,
      handleClickMarker,
    });
  };

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKKEN}`;
    mapRef.current = new mapboxgl.Map(mapConfig);
    const map = mapRef.current;

    map.on('load', () => {
      const filterValues = getEnumNumberValues(FilterId);
      const filteredFeatures: CustomGeoJSONFeatures[][] = filterValues.map(() => []);

      allFeatures.forEach((feature: CustomGeoJSONFeatures) => {
        feature.properties?.filterList.forEach((filterId: number) => {
          filteredFeatures[filterId].push(feature);
        });
      });

      filterValues.forEach((filterId) => {
        map.addSource(`cafeList/${filterId}`, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: filteredFeatures[filterId],
          } as FeatureCollection,
          cluster: true,
          clusterMaxZoom: 16,
          clusterRadius: 60,
        });
        map.addLayer({
          id: `cafeList/${filterId}`,
          type: 'circle',
          source: `cafeList/${filterId}`,
          paint: {
            'circle-opacity': 0,
          },
        });
      });
    });

    map.on('render', handleUpdateMarkers);
    map.on('moveend', handleUpdateMarkers);
    map.once('movestart', () => {
      map.off('render', handleUpdateMarkers);
    });
  }, []);

  useEffect(() => {
    activeFilterIdRef.current = activeFilterId;

    removeAllMarkers({ pointMarkerList, clusterMarkerList });

    handleUpdateMarkers();
  }, [activeFilterId]);

  return (
    <div
      id="map"
      css={css`
        width: 100%;
        height: 100%;
        position: absolute;
      `}
    />
  );
}

export default MapComp;
