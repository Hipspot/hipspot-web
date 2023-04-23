import mapboxgl, { Map, MapboxOptions } from 'mapbox-gl';
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, @typescript-eslint/no-var-requires
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export const mapConfig: MapboxOptions = {
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
  center: [127.0770389, 37.6257614],
  zoom: 17,
  maxZoom: 18,
  minZoom: 13,
  maxBounds: [
    [127.05, 37.59],
    [127.09, 37.65],
  ],
  projection: {
    name: 'lambertConformalConic',
    parallels: [36, 35],
  },
};

/**
 * mapboxgl.Map 인스턴스 저장 객체
 */
const mapRef: { current: Map | null } = { current: null };

/**
 * @description map 객채 불러올 수 있는 custom hook, map State로 담는 경우 Object.freeze때문에 수정 불가
 * @returns Map | null
 *
 */
function useMapRef() {
  const [, setLoad] = useState(false);

  useEffect(() => {
    if (mapRef.current instanceof Map) return;
    try {
      mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKKEN}`;
      mapRef.current = new mapboxgl.Map(mapConfig);
      setLoad(true);
    } catch (e) {
      /* empty */
    }
  }, []);
  return mapRef;
}
export default useMapRef;
