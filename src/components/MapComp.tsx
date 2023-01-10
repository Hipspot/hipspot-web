import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import geoJson from './mockCafeData.json';

const geoJson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        title: 'tom n toms',
        description: 'many toms',
      },
      geometry: {
        coordinates: [127.05522175167386, 37.539976853347],
        type: 'Point',
      },
    },
    {
      type: 'Feature',
      properties: {
        title: '업사이드커피',
        description: '업업',
      },
      geometry: {
        coordinates: [127.05644480375474, 37.54193464961139],
        type: 'Point',
      },
    },
    {
      type: 'Feature',
      properties: {
        title: 'Cafe ONION',
        description: '눈물',
      },
      geometry: {
        coordinates: [127.05822982086192, 37.54471367435555],
        type: 'Point',
      },
    },
  ],
};

function MapComp() {
  useEffect(() => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKKEN}`;
    if (!mapboxgl.supported()) alert('mapbox지도를 지원하지 않는 브라우저입니다, 다른 브라우저로 접속해주세요');

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [127.0582071, 37.5447481],
      zoom: 17,
      maxZoom: 18,
      minZoom: 13,
      maxBounds: [
        [127.03, 37.53],
        [127.07, 37.56],
      ],
      projection: {
        name: 'lambertConformalConic',
        parallels: [36, 35],
      },
    });
    map.on('load', () => {
      map.addSource('placeList', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                title: 'tom n toms',
                description: 'many toms',
              },
              geometry: {
                coordinates: [127.05522175167386, 37.539976853347],
                type: 'Point',
              },
            },
            {
              type: 'Feature',
              properties: {
                title: '업사이드커피',
                description: '업업',
              },
              geometry: {
                coordinates: [127.05644480375474, 37.54193464961139],
                type: 'Point',
              },
            },
            {
              type: 'Feature',
              properties: {
                title: 'Cafe ONION',
                description: '눈물',
              },
              geometry: {
                coordinates: [127.05822982086192, 37.54471367435555],
                type: 'Point',
              },
            },
          ],
        },
      });
      map.addLayer({
        id: 'placeList',
        type: 'circle',
        source: 'placeList',
        paint: {
          'circle-opacity': 0,
        },
      });
    });

    geoJson.features.map((feature) =>
      new mapboxgl.Marker().setLngLat([feature.geometry.coordinates[0], feature.geometry.coordinates[1]]).addTo(map)
    );

    return () => map.remove();
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
