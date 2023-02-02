import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { css } from '@emotion/react';
import PointMarker from '@components/Marker/pointMarker';
import ClusterMarker from '@components/Marker/clusterMarker';
import { CustomGeoJSONFeatures } from '@libs/types/map';
import { renderEmotionElementToHtml } from '@libs/utils/renderEmotionElementToHtml';
import { geoJsonSelector } from '@states/map';
import { activeFilterIdAtom } from '@states/ui';
import mapboxgl, { GeoJSONSource, GeoJSONSourceRaw, MapboxGeoJSONFeature, Marker } from 'mapbox-gl';
import { FeatureCollection } from 'geojson';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapConfig } from './utils/mapConfig';

type MapCompProps = {
  handleClickMarker: (id: number) => void;
};

function MapComp({ handleClickMarker }: MapCompProps) {
  const features = useRecoilValue(geoJsonSelector);
  const [featuresOnScreen, setFeaturesOnScreen] = useState<CustomGeoJSONFeatures[]>();
  const [clustersOnScreen, setClustersOnScreen] = useState<MapboxGeoJSONFeature[]>([]);
  const activeFilterId = useRecoilValue(activeFilterIdAtom);
  const mapRef = useRef<mapboxgl.Map>();
  const markerList: { [id in number | string]: mapboxgl.Marker } = useMemo(() => ({}), []);

  useEffect(() => {
    mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKKEN}`;
    mapRef.current = new mapboxgl.Map(mapConfig);
    const map = mapRef.current;

    const updateFeaturesOnScreen = () => {
      const mapboxFeaturesOnScreen = map.querySourceFeatures('placeList');
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

      setClustersOnScreen(clusters);
      setFeaturesOnScreen(features.filter((feature: CustomGeoJSONFeatures) => uniqueIds.has(feature.properties.id)));
    };

    map.on('load', () => {
      const sourceJson: GeoJSONSourceRaw = {
        type: 'geojson',
        data: { type: 'FeatureCollection', features } as FeatureCollection,
        cluster: true,
        clusterMaxZoom: 16,
        clusterRadius: 60,
      };
      map.addSource('placeList', sourceJson);
      map.addLayer({
        id: 'placeList',
        type: 'circle',
        source: 'placeList',
        paint: {
          'circle-opacity': 0,
        },
      });
    });

    map.on('render', updateFeaturesOnScreen);
    map.once('movestart', () => {
      map.off('render', updateFeaturesOnScreen);
    });
    map.on('moveend', updateFeaturesOnScreen);
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!featuresOnScreen) return;

    const source = map.getSource('placeList') as GeoJSONSource;
    clustersOnScreen.forEach((feature) => {
      console.log(feature.geometry);

      const id = feature.properties?.cluster_id;
      const count = feature.properties?.point_count;

      const geo = feature.geometry;
      source.getClusterLeaves(id, 99, 0, (err, leaves) => {
        console.log(leaves);
      });
      const marker = renderEmotionElementToHtml({
        elem: <ClusterMarker number={count} />,
        cssDataKey: 'cluster',
      });
      if (geo.type === 'GeometryCollection') return;
      new mapboxgl.Marker(marker).setLngLat(geo.coordinates as [number, number]).addTo(map);
    });
    console.log(clustersOnScreen);

    Object.entries(markerList).forEach((markerEntry) => {
      const [id, marker] = markerEntry as [string, Marker];
      marker.remove();
      delete markerList[id];
    });

    featuresOnScreen.forEach((feature: CustomGeoJSONFeatures) => {
      const { id, filterList } = feature.properties;

      if (!filterList.includes(activeFilterId)) return;

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
  }, [activeFilterId, featuresOnScreen]);

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
