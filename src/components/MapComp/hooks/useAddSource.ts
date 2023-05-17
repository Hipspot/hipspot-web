import { geoJsonAtom } from '@states/map';
import { MAP_SOURCE_RENDER_CAFE_LIST } from '@constants/map';
import { CustomGeoJSONFeatures } from '@libs/types/map';
import { FeatureCollection } from 'geojson';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useMap from './useMap';
import { MapboxEvent } from 'mapbox-gl';

function useMapSources() {
  const allFeatures = useRecoilValue(geoJsonAtom);
  const mapRef = useMap();

  const onMapLoad = ({ target: targetMap }: MapboxEvent) => addFeatureLayer({ map: targetMap, allFeatures });

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!allFeatures) return;
    map.on('load', onMapLoad);
    return () => {
      map.off('load', onMapLoad);
    };
  }, []);
  return allFeatures;
}

export default useMapSources;

interface HandleMapLoadProps {
  map: mapboxgl.Map;
  allFeatures: CustomGeoJSONFeatures[];
}

function addFeatureLayer({ map, allFeatures }: HandleMapLoadProps) {
  // add source layer
  map.addSource(MAP_SOURCE_RENDER_CAFE_LIST, {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: allFeatures,
    } as FeatureCollection,
    cluster: true,
    clusterMaxZoom: 18,
    clusterRadius: 60,
  });
  map.addLayer({
    id: MAP_SOURCE_RENDER_CAFE_LIST,
    type: 'circle',
    source: MAP_SOURCE_RENDER_CAFE_LIST,
    paint: {
      'circle-opacity': 0,
    },
  });
}
