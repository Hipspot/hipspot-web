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
  const allFeatures = useRecoilValue(geoJsonSelector);
  const [mapRenderTrigger, setMapRenderTrigger] = useState<boolean>(false);
  const mapRef = useRef<mapboxgl.Map>();
  const pointMarkerList: { [id in number | string]: Marker } = useMemo(() => ({}), []);
  const clusterMarkerList: Marker[] = useMemo(() => [], []);

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKKEN}`;
    mapRef.current = new mapboxgl.Map(mapConfig);
    const map = mapRef.current;

    const handleMapRenderTrigger = () => {
      setMapRenderTrigger((state) => !state);
    };

    map.on('load', () => {
      Object.values(FilterId).forEach((filterId) => {
        map.addSource(`cafeList/${filterId}`, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: allFeatures.filter((feature: CustomGeoJSONFeatures) =>
              feature.properties.filterList.includes(filterId as number)
            ),
          } as FeatureCollection,
          cluster: true,
          clusterMaxZoom: 16,
          clusterRadius: 60,
        });
        map.addLayer({
          id: `cafeList/${filterId}`,
          type: 'circle',
          source: `cafeList/${filterId}`,
          paint: {
            'circle-opacity': 0,
          },
        });
      });
    });

    map.on('render', handleMapRenderTrigger);
    map.on('moveend', handleMapRenderTrigger);
    map.once('movestart', () => {
      map.off('render', handleMapRenderTrigger);
    });
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const mapboxFeaturesOnScreen = map.querySourceFeatures(`cafeList/${activeFilterId}`);
    const clustersOnScreen: MapboxGeoJSONFeature[] = [];
    const uniquePointMarkersId = new Set<number>();
    mapboxFeaturesOnScreen.forEach((feature) => {
      if (feature.properties?.cluster) {
        clustersOnScreen.push(feature);
        return;
      }

      const id = feature.properties?.id;
      if (id !== undefined) {
        uniquePointMarkersId.add(id);
      }
    });
    const featuresOnScreen = allFeatures.filter((feature: CustomGeoJSONFeatures) =>
      uniquePointMarkersId.has(feature.properties.id)
    );

    Object.entries(pointMarkerList).forEach((markerEntry) => {
      const [id, marker] = markerEntry as [string, Marker];
      marker.remove();
      delete pointMarkerList[id];
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
        pointMarkerList[id] = new mapboxgl.Marker(marker).setLngLat(feature.geometry.coordinates).addTo(map);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    });

    clusterMarkerList.forEach((marker) => {
      marker.remove();
    });
    clusterMarkerList.length = 0;

    try {
      clustersOnScreen.forEach((feature) => {
        const count = feature.properties?.point_count;
        const geo = feature.geometry;

        const marker = renderEmotionElementToHtml({
          elem: <ClusterMarker number={count} filterId={activeFilterId} />,
          cssDataKey: 'cluster',
        });

        if (geo.type === 'GeometryCollection') return;
        const newMarker = new mapboxgl.Marker(marker).setLngLat(geo.coordinates as [number, number]).addTo(map);
        clusterMarkerList.push(newMarker);
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
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
