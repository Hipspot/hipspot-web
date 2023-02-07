import React, { useEffect, useMemo, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import PointMarker from '@components/Marker/pointMarker';
import ClusterMarker from '@components/Marker/clusterMarker';
import { CustomGeoJSONFeatures } from '@libs/types/map';
import { renderEmotionElementToHtml } from '@libs/utils/renderEmotionElementToHtml';
import { geoJsonSelector } from '@states/map';
import { activeFilterIdAtom } from '@states/ui';
import mapboxgl, { MapboxGeoJSONFeature, Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FilterId } from '@libs/types/filter';
import { FeatureCollection } from 'geojson';
import { mapConfig } from './utils/mapConfig';

type MapCompProps = {
  handleClickMarker: (id: number) => void;
};

function MapComp({ handleClickMarker }: MapCompProps) {
  const activeFilterId = useRecoilValue(activeFilterIdAtom);
  const allFeatures = useRecoilValue(geoJsonSelector);
  const mapRef = useRef<mapboxgl.Map>();
  const activeFilterIdRef = useRef(activeFilterId);
  const pointMarkerList: { [id in number | string]: Marker } = useMemo(() => ({}), []);
  const clusterMarkerList: Marker[] = useMemo(() => [], []);

  const updateMarkers = () => {
    const map = mapRef.current;
    const filterId = activeFilterIdRef.current;

    if (!map) return;
    const mapboxFeaturesOnScreen = map.querySourceFeatures(`cafeList/${filterId}`);
    const clustersOnScreen: MapboxGeoJSONFeature[] = [];
    const uniqueClusterIds = new Set<number>();
    const uniquePointIds = new Set<number>();
    mapboxFeaturesOnScreen.forEach((feature) => {
      if (feature.properties?.cluster) {
        if (uniqueClusterIds.has(feature.properties.cluster_id)) return;
        clustersOnScreen.push(feature);
        uniqueClusterIds.add(feature.properties.cluster_id);
      } else {
        const id = feature.properties?.id;
        if (id !== undefined) {
          uniquePointIds.add(id);
        }
      }
    });
    const pointsOnScreen = allFeatures.filter((feature: CustomGeoJSONFeatures) =>
      uniquePointIds.has(feature.properties.id)
    );

    Object.entries(pointMarkerList).forEach((markerEntry) => {
      const [id, marker] = markerEntry as [string, Marker];
      marker.remove();
      delete pointMarkerList[id];
    });

    pointsOnScreen.forEach((feature: CustomGeoJSONFeatures) => {
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
          elem: <ClusterMarker number={count} filterId={filterId} />,
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
  };

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKKEN}`;
    mapRef.current = new mapboxgl.Map(mapConfig);
    const map = mapRef.current;

    map.on('load', () => {
      const filterValues = Object.values(FilterId)
        .filter((v) => !Number.isNaN(Number(v)))
        .map((v) => Number(v));
      const filteredFeatures: CustomGeoJSONFeatures[][] = filterValues.map(() => []);

      allFeatures.forEach((feature: CustomGeoJSONFeatures) => {
        feature.properties?.filterList.forEach((filterId: number) => {
          filteredFeatures[filterId].push(feature);
        });
      });

      filterValues.forEach((filterId) => {
        map.addSource(`cafeList/${filterId}`, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: filteredFeatures[filterId],
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

    map.on('render', updateMarkers);
    map.on('moveend', updateMarkers);
    map.once('movestart', () => {
      map.off('render', updateMarkers);
    });
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    activeFilterIdRef.current = activeFilterId;
    updateMarkers();
  }, [activeFilterId]);

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
