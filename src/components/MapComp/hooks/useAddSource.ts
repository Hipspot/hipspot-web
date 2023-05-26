import { geoJsonAtom } from '@states/map';
import { MAP_SOURCE_RENDER_CAFE_LIST } from '@constants/map';
import { CustomGeoJSONFeatures } from '@libs/types/map';
import { FeatureCollection } from 'geojson';
import { useRecoilValue } from 'recoil';
import { MapboxEvent } from 'mapbox-gl';
import { FilterId } from '@libs/types/filter';
import useMapEventListner from './useMapEventListner';
import { useEffect, useState } from 'react';
import useMap from './useMap';

function useMapSources(filterId: FilterId) {
  const mapRef = useMap();
  const allFeatures = useRecoilValue(geoJsonAtom);
  const [loaded, setLoaded] = useState(false);
  const onMapLoad = ({ target: targetMap }: MapboxEvent) => {
    const filteredFeatures = useMapSources.filterFeatures({ features: allFeatures, filterId });
    useMapSources.addSourceAndLayer({
      map: targetMap,
      sourceFeatures: filteredFeatures,
      name: MAP_SOURCE_RENDER_CAFE_LIST,
    });
    setLoaded(true);
  };

  useMapEventListner({
    type: 'load',
    callback: onMapLoad,
    effect: (map) => {
      if (map.getLayer(MAP_SOURCE_RENDER_CAFE_LIST)) {
        map.removeLayer(MAP_SOURCE_RENDER_CAFE_LIST);
        map.removeSource(MAP_SOURCE_RENDER_CAFE_LIST);
      }
    },
    dep: [],
  });

  useEffect(() => {
    const map = mapRef.current;
    if (!(map && allFeatures && loaded)) return;
    if (map.getLayer(MAP_SOURCE_RENDER_CAFE_LIST)) {
      map.removeLayer(MAP_SOURCE_RENDER_CAFE_LIST);
      map.removeSource(MAP_SOURCE_RENDER_CAFE_LIST);
    }
    const filteredFeatures = useMapSources.filterFeatures({ features: allFeatures, filterId });
    useMapSources.addSourceAndLayer({
      map,
      sourceFeatures: filteredFeatures,
      name: MAP_SOURCE_RENDER_CAFE_LIST,
    });
  }, [filterId, loaded]);

  return allFeatures;
}

export default useMapSources;

interface AddSourceAndLayerProps {
  map: mapboxgl.Map;
  sourceFeatures: CustomGeoJSONFeatures[];
  name: string;
}

useMapSources.addSourceAndLayer = ({ map, sourceFeatures, name }: AddSourceAndLayerProps) => {
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
useMapSources.filterFeatures = ({ features, filterId }: { features: CustomGeoJSONFeatures[]; filterId: FilterId }) => {
  const filteredFeatures: CustomGeoJSONFeatures[] = [];

  features.forEach((feature: CustomGeoJSONFeatures) => {
    if (feature.properties?.filterList.includes(filterId)) {
      filteredFeatures.push(feature);
    }
  });
  return filteredFeatures;
};
