import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import PointMarker from '@components/Marker/pointMarker';
import ClusterMarker from '@components/Marker/clusterMarker';
import { CustomGeoJSONFeatures } from '@libs/types/map';
import { renderEmotionElementToHtml } from '@libs/utils/renderEmotionElementToHtml';
import { geoJsonSelector } from '@states/map';
import { activeFilterIdAtom } from '@states/ui';
import mapboxgl, { MapboxGeoJSONFeature, Marker } from 'mapbox-gl';
import { FeatureCollection } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FilterId } from '@libs/types/filter';
import { mapConfig } from './utils/mapConfig';

type MapCompProps = {
  handleClickMarker: (id: number) => void;
};

function MapComp({ handleClickMarker }: MapCompProps) {
  const activeFilterId = useRecoilValue(activeFilterIdAtom);
  const features = useRecoilValue(geoJsonSelector);
  const [mapRenderTrigger, setMapRenderTrigger] = useState<boolean>(false);
  const mapRef = useRef<mapboxgl.Map>();
  const markerList: { [id in number | string]: mapboxgl.Marker } = useMemo(() => ({}), []);
  const clusterMarkerList: mapboxgl.Marker[] = useMemo(() => [], []);

  const handleMapRenderTrigger = () => {
    setMapRenderTrigger((state) => !state);
  };

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKKEN}`;
    mapRef.current = new mapboxgl.Map(mapConfig);
    const map = mapRef.current;

    map.on('load', () => {
      Object.values(FilterId).forEach((filterId) => {
        map.addSource(`placeList/${filterId}`, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: features.filter((feature: CustomGeoJSONFeatures) =>
              feature.properties.filterList.includes(filterId as number)
            ),
          } as FeatureCollection,
          cluster: true,
          clusterMaxZoom: 16,
          clusterRadius: 60,
        });
        map.addLayer({
          id: `placeList/${filterId}`,
          type: 'circle',
          source: `placeList/${filterId}`,
          paint: {
            'circle-opacity': 0,
          },
        });
      });
    });

    map.on('render', handleMapRenderTrigger);
    map.once('movestart', () => {
      map.off('render', handleMapRenderTrigger);
    });
    map.on('moveend', handleMapRenderTrigger);
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!map.isStyleLoaded()) return;

    // const source = map.getSource(`placeList/${activeFilterId}`) as GeoJSONSource;

    const mapboxFeaturesOnScreen = map.querySourceFeatures(`placeList/${activeFilterId}`);
    const uniqueIds = new Set<number>();

    const clusters: MapboxGeoJSONFeature[] = [];
    mapboxFeaturesOnScreen.forEach((feature) => {
      if (feature.properties?.cluster) {
        clusters.push(feature);
        return;
      }

      const id = feature.properties?.id;
      if (id !== undefined) {
        uniqueIds.add(id);
      }
    });

    const clustersOnScreen = clusters;
    const featuresOnScreen = features.filter((feature: CustomGeoJSONFeatures) => uniqueIds.has(feature.properties.id));

    Object.entries(markerList).forEach((markerEntry) => {
      const [id, marker] = markerEntry as [string, Marker];
      marker.remove();
      delete markerList[id];
    });

    featuresOnScreen.forEach((feature: CustomGeoJSONFeatures) => {
      const { id } = feature.properties;

      try {
        const marker = renderEmotionElementToHtml({
          elem: (
            <PointMarker
              handleClickMarker={handleClickMarker}
              feature={feature}
              image="https://hipspot.s3.ap-northeast-2.amazonaws.com/store/0.jpg"
              id={id}
            />
          ),
          cssDataKey: 'marker',
        });
        markerList[id] = new mapboxgl.Marker(marker).setLngLat(feature.geometry.coordinates).addTo(map);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    });

    clusterMarkerList.forEach((marker) => {
      marker.remove();
    });
    clusterMarkerList.length = 0;

    clustersOnScreen.forEach((feature) => {
      // const id = feature.properties?.cluster_id;
      const count = feature.properties?.point_count;

      const geo = feature.geometry;
      /*
      source.getClusterLeaves(id, 99, 0, (err, leaves) => {
        console.log(leaves);
      });
      */
      const marker = renderEmotionElementToHtml({
        elem: <ClusterMarker number={count} filterId={activeFilterId} />,
        cssDataKey: 'cluster',
      });
      if (geo.type === 'GeometryCollection') return;

      const newMarker = new mapboxgl.Marker(marker).setLngLat(geo.coordinates as [number, number]).addTo(map);
      clusterMarkerList.push(newMarker);
    });
  }, [mapRenderTrigger, activeFilterId]);

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
