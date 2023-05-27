import { MAP_SOURCE_RENDER_CAFE_LIST } from '@constants/map';
import { CustomGeoJSONFeatures } from '@libs/types/map';
import { FeatureCollection } from 'geojson';
import { MapboxEvent } from 'mapbox-gl';
import useMapEventListner from './useMapEventListner';
import { useEffect, useState } from 'react';
import useMap from './useMap';

interface UseMapSourceProps {
  filteredFeatures: CustomGeoJSONFeatures[];
}
function useMapSourceAndLayer({ filteredFeatures }: UseMapSourceProps, deps: any[]) {
  const mapRef = useMap();
  const [loaded, setLoaded] = useState(false);
  const onMapLoad = ({ target: targetMap }: MapboxEvent) => {
    useMapSourceAndLayer.addSourceAndLayer({
      map: targetMap,
      sourceFeatures: filteredFeatures,
      name: MAP_SOURCE_RENDER_CAFE_LIST,
    });
    setLoaded(true);
  };

  useMapEventListner(
    {
      type: 'load',
      callback: onMapLoad,
      effect: (map) => {
        if (map.getLayer(MAP_SOURCE_RENDER_CAFE_LIST)) {
          map.removeLayer(MAP_SOURCE_RENDER_CAFE_LIST);
          map.removeSource(MAP_SOURCE_RENDER_CAFE_LIST);
        }
      },
    },
    []
  );

  useEffect(() => {
    console.log(deps);
    const map = mapRef.current;
    if (!(map && loaded)) return;
    if (map.getLayer(MAP_SOURCE_RENDER_CAFE_LIST)) {
      map.removeLayer(MAP_SOURCE_RENDER_CAFE_LIST);
      map.removeSource(MAP_SOURCE_RENDER_CAFE_LIST);
    }
    useMapSourceAndLayer.addSourceAndLayer({
      map,
      sourceFeatures: filteredFeatures,
      name: MAP_SOURCE_RENDER_CAFE_LIST,
    });
  }, [...deps, loaded]);
}

export default useMapSourceAndLayer;

interface AddSourceAndLayerProps {
  map: mapboxgl.Map;
  sourceFeatures: CustomGeoJSONFeatures[];
  name: string;
}

useMapSourceAndLayer.addSourceAndLayer = ({ map, sourceFeatures, name }: AddSourceAndLayerProps) => {
  map.addSource(name, {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: sourceFeatures,
    } as FeatureCollection,
    cluster: true,
    clusterMaxZoom: 18,
    clusterRadius: 60,
  });
  map.addLayer({
    id: name,
    type: 'circle',
    source: name,
    paint: {
      'circle-opacity': 0,
    },
  });
};
