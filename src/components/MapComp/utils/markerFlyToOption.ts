import { FlyToOptions, LngLatLike } from 'mapbox-gl';

export const markerFlytoOption = ({ coordinate }: { coordinate: LngLatLike }): FlyToOptions => {
  const RAD = 15;
  const DURATION = 500;
  const PITCH = 50;

  return {
    center: coordinate,
    bearing: -2 * RAD - 3,
    pitch: PITCH,
    duration: DURATION,
    zoom: 18,
  };
};
