import { LngLatLike } from 'mapbox-gl';

interface CustomGeoJSONProperties {
  instaId: string;
  id: number;
  placeName: string;
  filterList: number[];
}

interface GeoJSONPointType {
  type: 'point';
  coordinates: LngLatLike;
}

/**
 * @description mapbox source에 들어갈 GeoJSON 타입
 *
 */
export interface CustomGeoJSONFeatures {
  type: 'feature';
  properties: CustomGeoJSONProperties;
  geometry: GeoJSONPointType;
}
