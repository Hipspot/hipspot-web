import { LngLatLike, Marker } from 'mapbox-gl';
import { CafeInfo } from './cafe';

interface CustomGeoJSONProperties extends Pick<CafeInfo, 'cafeId' | 'cafeName'> {
  filterList: number[];
  resonablePrice: number;
  thumbNail: string;
}

interface GeoJSONPointType {
  type: 'Point';
  coordinates: LngLatLike;
}

/**
 * @description mapbox source에 들어갈 GeoJSON 타입
 * 
 * @example
 * {
  properties: {
    instaId: "@cafeknotted",
    id: 10,
    placeName: "카페 노티드 성수",
    filterList: [4, 3]
  },
  geometry: {
    type: "Point",
    coordinates: [127.051352, 37.5446694]
  },
  type: "Feature"
}
 */
export interface CustomGeoJSONFeatures {
  type: 'Feature';
  properties: CustomGeoJSONProperties;
  geometry: GeoJSONPointType;
}

export type MarkerList = {
  [id in string | number]: Marker;
};
