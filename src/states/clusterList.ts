import { FilterId } from '@libs/types/filter';
import { CafeInfo } from '@libs/types/cafe';
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

      const geoJsonData = get(geoJsonAtom);
      const filterByleafId = (leafId: number) =>
        geoJsonData.filter(({ properties }) => Number(properties.id) === leafId)[0] || null;

      return leafIds.map((leafId: number) => filterByleafId(leafId));
    },

  // 파라미터로 전달하는 id Array 값 계속 바뀌니까 캐싱 하지 않음
  cachePolicy_UNSTABLE: { eviction: 'most-recent' },
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
