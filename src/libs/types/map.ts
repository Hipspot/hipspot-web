import { LngLatLike } from 'mapbox-gl';
import { CafeInfo } from './cafe';

interface CustomGeoJSONProperties extends Pick<CafeInfo, 'id' | 'placeName' | 'instaId'> {
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
