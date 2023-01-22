import { MapboxOptions } from 'mapbox-gl';

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
