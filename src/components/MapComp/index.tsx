import React, { useEffect, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import PointMarker from '@components/Marker/pointMarker';
import { CustomGeoJSONFeatures } from '@libs/types/map';
import { renderEmotionElementToHtml } from '@libs/utils/renderEmotionElementToHtml';
import { geoJsonSelector } from '@recoil/map';
import { activeFilterIdAtom } from '@recoil/ui';
import mapboxgl, { GeoJSONSourceRaw, Marker } from 'mapbox-gl';
import { FeatureCollection } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapConfig } from './utils/mapConfig';

function MapComp() {
  const features = useRecoilValue(geoJsonSelector);
  const activeFilterId = useRecoilValue(activeFilterIdAtom);
  const mapRef = useRef<mapboxgl.Map>();
  const markerList: { [id in number | string]: mapboxgl.Marker } = useMemo(() => ({}), []);

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKKEN}`;
    mapRef.current = new mapboxgl.Map(mapConfig);
    const map = mapRef.current;

    map.on('load', () => {
      const sourceJson: GeoJSONSourceRaw = {
        type: 'geojson',
        data: { type: 'FeatureCollection', features } as FeatureCollection,
      };
      map.addSource('placeList', sourceJson);
      map.addLayer({
        id: 'placeList',
        type: 'circle',
        source: 'placeList',
        paint: {
          'circle-opacity': 0,
        },
      });
    });
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!features) return;

    Object.entries(markerList).forEach((markerEntry) => {
      const [id, marker] = markerEntry as [string, Marker];
      marker.remove();
      delete markerList[id];
    });

    features.forEach((feature: CustomGeoJSONFeatures) => {
      const { id, filterList } = feature.properties;

      if (!filterList.includes(activeFilterId)) return;

      try {
        const marker = renderEmotionElementToHtml({
          elem: (
            <PointMarker
              feature={feature}
              image="https://hipspot.s3.ap-northeast-2.amazonaws.com/store/0.jpg"
              id={id}
            />
          ),
          cssDataKey: 'marker',
        });
        markerList[id] = new mapboxgl.Marker(marker).setLngLat(feature.geometry.coordinates).addTo(map);
      } catch (e) {
        console.error(e);
      }
    });
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
