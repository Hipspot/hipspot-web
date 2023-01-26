import getGeoJson from '@libs/apis/getGeoJson';
import { atom, selector } from 'recoil';

export const geoJsonAtom = atom({
  key: 'atom/geoJoson',
  default: {},
});

export const geoJsonSelector = selector({
  key: 'selector/geoJSon',
  get: async () => {
    const result = await getGeoJson();
    return result;
  },
  set: async () => {},
});
