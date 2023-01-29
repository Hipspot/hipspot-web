import { atom, selectorFamily } from 'recoil';
import { LngLatLike } from 'mapbox-gl';
import { getPlaceInfo } from '@libs/apis/place';
import { TabState } from '../libs/types/infowindow';

export type CameraStateType = {
  center: LngLatLike;
  pitch: number;
  bearing: number;
  markerClicked: boolean;
  zoom: number;
};

export const tabStateAtom = atom<TabState>({
  key: 'atom / tabState',
  default: {
    // eslint-disable-next-line no-restricted-globals
    top: innerHeight,
    onHandling: true,
    popUpState: 'thumbNail',
  },
});

export const cameraStateAtom = atom<CameraStateType>({
  key: 'atom / camera',
  default: {
    center: [127.0582071, 37.5447481],
    pitch: 0,
    bearing: 0,
    markerClicked: false,
    zoom: 17,
  },
});

export const activatedCafeIdAtom = atom<number | null>({
  key: 'atom / activatedCafeId',
  default: null,
});

export const placeInfoQuery = selectorFamily({
  key: 'selector / infoWindowQuery',
  get: (id: number | null) => () => id ? getPlaceInfo(id) : null,
});
