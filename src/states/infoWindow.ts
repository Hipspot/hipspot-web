import { atom, selectorFamily } from 'recoil';
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import { getCafeInfo } from '@libs/apis/cafe';
import { TabState } from '../libs/types/infowindow';

export const tabStateAtom = atom<TabState>({
  key: 'atom / tabState',
  default: {
    startTop: popUpHeights[PopUpHeightsType.bottom],
    top: popUpHeights[PopUpHeightsType.bottom],
    onHandling: false,
    popUpState: 'invisible',
  },
});

export const activatedCafeIdAtom = atom<number | null>({
  key: 'atom / activatedCafeId',
  default: null,
});

export const selectedImageTabAtom = atom({
  key: 'atom / selectedImage',
  default: null,
});

export const cafeInfoQuery = selectorFamily({
  key: 'selector / infoWindowQuery',
  get: (id: number | null) => () => id ? getCafeInfo(id) : null,
});
