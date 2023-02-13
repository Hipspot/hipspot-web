import { FilterId } from '@libs/types/filter';
import { CafeInfo } from '@libs/types/cafe';
import { CustomGeoJSONFeatures } from '@libs/types/map';
import { atom, selectorFamily } from 'recoil';
import { geoJsonAtom } from './map';

export const openClusterListAtom = atom<boolean>({
  key: 'openClusterList',
  default: true,
});

export const clusterListStateSelector = selectorFamily({
  key: 'selector / clusteListState',
  get:
    (leafIds: number[]) =>
    ({ get }) => {
      if (!leafIds.length) return [];

      const featureList: CustomGeoJSONFeatures['properties'][] = [];
      const geoJsonData = get(geoJsonAtom);
      leafIds.forEach((leafId: number) => {
        for (let i = 0; i < geoJsonData.length; i += 1) {
          if (featureList.length === leafIds.length) break;
          const { properties } = geoJsonData[i];
          if (Number(properties.id) === leafId) featureList.push(properties);
        }
      });
      return featureList;
    },
});

export const clusterListAtom = atom({
  key: 'clusterList',
  default: [
    {
      id: 1,
      placeName: 'Honor',
      imageList: [
        'https://user-images.githubusercontent.com/24623403/213137042-bdc48dba-fd97-4466-8a20-d1f2f2194d78.png',
      ],
    },
    {
      id: 2,
      placeName: 'Honor',
      imageList: [
        'https://user-images.githubusercontent.com/24623403/213137042-bdc48dba-fd97-4466-8a20-d1f2f2194d78.png',
      ],
    },
    {
      id: 3,
      placeName: 'Honor',
      imageList: [
        'https://user-images.githubusercontent.com/24623403/213137042-bdc48dba-fd97-4466-8a20-d1f2f2194d78.png',
      ],
    },
    {
      id: 4,
      placeName: 'Honor',
      imageList: [
        'https://user-images.githubusercontent.com/24623403/213137042-bdc48dba-fd97-4466-8a20-d1f2f2194d78.png',
      ],
    },
    {
      id: 5,
      placeName: 'Honor',
      imageList: [
        'https://user-images.githubusercontent.com/24623403/213137042-bdc48dba-fd97-4466-8a20-d1f2f2194d78.png',
      ],
    },
    {
      id: 6,
      placeName: 'Honor',
      imageList: [
        'https://user-images.githubusercontent.com/24623403/213137042-bdc48dba-fd97-4466-8a20-d1f2f2194d78.png',
      ],
    },
  ] as CafeInfo[],
});

export const activeFilterIdAtom = atom<FilterId>({
  key: 'filterId',
  default: FilterId.Hipspot,
});
