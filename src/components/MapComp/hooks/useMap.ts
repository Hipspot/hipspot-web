import mapboxgl, { Map, MapboxOptions } from 'mapbox-gl';
import { useEffect, useState } from 'react';

export const mapConfig: MapboxOptions = {
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
};

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
