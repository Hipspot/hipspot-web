import detectDevice from '@libs/utils/detectDevice';
import mapboxgl, { Map, MapboxOptions } from 'mapbox-gl';
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, @typescript-eslint/no-var-requires
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const style = {
  mobile: 'mapbox://styles/sangjun/cli3dxlnw00xl01rh67rm3rbf', // layer 53
  desktop: 'mapbox://styles/sangjun/cli3dqu07007901rb6l456z76', // layer 104
  origin: 'mapbox://styles/sangjun/clgwfbvxr003s01r88wfc14jo', // layer 134
};

export const mapConfig: (deviceType: 'mobile' | 'desktop') => MapboxOptions = (deviceType) => ({
  container: 'map',
  style: `${style[deviceType]}?optimize=true`,
  center: [127.0770389, 37.6257614],
  zoom: 17,
  maxZoom: 18,
  minZoom: 15,
  maxBounds: [
    [127.05, 37.59],
    [127.09, 37.65],
  ],
  projection: {
    name: 'lambertConformalConic',
    parallels: [36, 35],
  },
});

/**
 * mapboxgl.Map 인스턴스 저장 객체
 */
const mapRef: { current: Map | null } = { current: null };

/**
 * @description map 객채 불러올 수 있는 custom hook, map State로 담는 경우 Object.freeze때문에 수정 불가
 * @returns Map | null
 *
 */
function useMap() {
  const [, setLoad] = useState(false);

  useEffect(() => {
    const device = detectDevice();
    if (mapRef.current instanceof Map) return;
    try {
      mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKKEN}`;
      mapRef.current = new mapboxgl.Map(mapConfig(device));
      setLoad(true);
    } catch (e) {
      /* empty */
    }
  }, []);
  return mapRef;
}
export default useMap;
