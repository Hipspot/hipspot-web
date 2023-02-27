import getGeoJson from '@libs/apis/getGeoJson';
import { CustomGeoJSONFeatures } from '@libs/types/map';
import { atom, selector } from 'recoil';

export const geoJsonSelector = selector({
  key: 'selector/geoJSon',
  get: async () => {
    const result = await getGeoJson();
    return result;
  },
});

export const geoJsonAtom = atom<CustomGeoJSONFeatures[]>({
  key: 'atom/geoJoson',
  default: geoJsonSelector,
});
