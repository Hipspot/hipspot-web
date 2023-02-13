import { FilterId } from '@libs/types/filter';
import { MarkerRenderProps } from '@libs/types/marker';
import { atom } from 'recoil';

export const openClusterListAtom = atom<boolean>({
  key: 'openClusterList',
  default: false,
});

export const clusterListAtom = atom<MarkerRenderProps[]>({
  key: 'clusterList',
  default: [],
});

export const activeFilterIdAtom = atom<FilterId>({
  key: 'filterId',
  default: FilterId.Hipspot,
});

// export const clusterListStateSelector = selectorFamily({
//   key: 'selector / clusteListState',
//   get:
//     (leafIds: number[]) =>
//     ({ get }) => {
//       if (!leafIds.length) return [];

//       const geoJsonData = get(geoJsonAtom);
//       const filterByleafId = (leafId: number) =>
//         geoJsonData.filter(({ properties }) => Number(properties.id) === leafId)[0] || null;

//       return leafIds.map((leafId: number) => filterByleafId(leafId));
//     },

//   // 파라미터로 전달하는 id Array 값 계속 바뀌니까 캐싱 하지 않음
//   cachePolicy_UNSTABLE: { eviction: 'most-recent' },
// });
