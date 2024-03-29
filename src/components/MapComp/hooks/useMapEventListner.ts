import { useEffect } from 'react';
import useMap from './useMap';
import mapboxgl, { EventData, MapEventType, MapboxEvent } from 'mapbox-gl';

interface UseMapEventListnerProps {
  type: keyof MapEventType;
  callback: (e: MapboxEvent<undefined> & EventData) => void;
  effect: (map: mapboxgl.Map) => void;
}
function useMapEventListner({ type, callback, effect }: UseMapEventListnerProps, dep: any[]) {
  const mapRef = useMap();

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    effect(map);
    map.on(type, callback);

    return () => {
      map.off(type, callback);
    };
  }, dep);
}

export default useMapEventListner;
