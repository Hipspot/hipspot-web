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
