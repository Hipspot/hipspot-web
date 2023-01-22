import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import PointMarker from '@components/Marker/pointMarker';
import { CustomGeoJSONFeatures } from '@libs/types/map';
import { renderEmotionElementToHtml } from '@libs/utils/renderEmotionElementToHtml';
import { geoJsonSelector } from '@recoil/map';
import mapboxgl, { GeoJSONSourceRaw } from 'mapbox-gl';
import { FeatureCollection } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapConfig } from './utils/mapConfig';

function MapComp() {
  const features = useRecoilValue(geoJsonSelector);

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKKEN}`;

    const map = new mapboxgl.Map(mapConfig);

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

    if (features) {
      features.forEach((feature: CustomGeoJSONFeatures) => {
        const { id } = feature.properties;
        const marker = renderEmotionElementToHtml({
          elem: (
            <PointMarker
              feature={feature}
              image="https://hipspot.s3.ap-northeast-2.amazonaws.com/store/0.jpg"
              id={id}
            />
          ),
          cssDataKey: 'marker',
          render: true,
        });
        new mapboxgl.Marker(marker).setLngLat(feature.geometry.coordinates).addTo(map);
      });
    }
  }, []);

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
