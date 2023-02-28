import { LngLatLike, Marker } from 'mapbox-gl';
import { CafeInfo } from './cafe';

export interface CustomGeoJSONProperties extends Pick<CafeInfo, 'cafeId' | 'cafeName'> {
  filterList: number[];
  reasonablePrice: number;
  thumbNail: string;
}

export interface GeoJSONPointType {
  type: 'Point';
  coordinates: LngLatLike;
}

/**
 * @description mapbox source에 들어갈 GeoJSON 타입
 * 
 * @example
 * {
  properties: {
    thumbNail:`https://hipspot.s3.ap-northeast-2.amazonaws.com/1/store/0.jpg`
    resonablePrice:1600,
    filterList: [4, 3]
    cafeId:1,
    cafeName:'상상과자점';
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
