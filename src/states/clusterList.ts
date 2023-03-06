import { FilterId } from '@libs/types/filter';
import { CustomGeoJSONProperties } from '@libs/types/map';
import { atom } from 'recoil';

export const openClusterListAtom = atom<boolean>({
  key: 'openClusterList',
  default: false,
});

export const clusterListAtom = atom<CustomGeoJSONProperties[]>({
  key: 'clusterList',
  default: [],
});

export const activeFilterIdAtom = atom<FilterId>({
  key: 'filterId',
  default: FilterId.Hipspot,
});
