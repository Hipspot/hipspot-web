import { FilterId } from '@libs/types/filter';
import { PlaceInfo } from '@libs/types/place';
import { atom } from 'recoil';

export const openClusterListAtom = atom<boolean>({
  key: 'openClusterList',
  default: true,
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
  ] as PlaceInfo[],
});

export const activeFilterIdAtom = atom<FilterId>({
  key: 'filterId',
  default: FilterId.Hipspot,
});

export const themeModeAtom = atom<'light' | 'dark'>({
  key: 'themeMode',
  default: 'light',
});
