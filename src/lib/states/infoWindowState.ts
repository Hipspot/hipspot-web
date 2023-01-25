import { atom } from 'recoil';
import { CoordState, TabState } from '../types/infowindow';

export interface PlaceInfo {
  title: string;
  content: string;
}

export type ScreenSizeStateType = {
  innerHeight: number;
  innerWidth: number;
};

export interface ImageTabListType {
  name: string;
  selected: boolean;
  type: string;
}

export type InfoPropsStateType = {
  contentsArgs: {
    placeName: string;
    infoList: PlaceInfo[];
    instaId: string;
  };
  menuInfoList: MenuInfo[];
};

export interface MenuInfo {
  menu: string;
  price: number | string;
}

export type PopUpHeightsType = {
  top: number;
  middle: number;
  thumbnail?: number;
  bottom: number;
};

export const screenSizeStateAtom = atom({
  key: 'atom / screenSizeState',
  default: {
    innerWidth: 0,
    innerHeight: 0,
  },
});

export const tabStateAtom = atom<TabState>({
  key: 'atom / tabState',
  default: {
    top: 10000,
    onHandling: false,
    popUpState: 'thumbNail',
  },
});

export const coordStateAtom = atom<CoordState>({
  key: 'atom/ coordState',
  default: {
    startX: 0,
    startY: 0,
  },
});

export const modifyNumState = atom<number>({
  key: 'atom / modifyNumState',
  default: 0,
});

export const infoPropsStateAtom = atom<{
  contentsArgs: {
    placeName: string;
    infoList: PlaceInfo[];
    instaId: string;
  };
  menuInfoList: MenuInfo[];
}>({
  key: 'atom / infoPropsState',
  default: {
    contentsArgs: {
      placeName: '',
      infoList: [
        {
          title: '',
          content: '',
        },
      ],
      instaId: '',
    },

    menuInfoList: [],
  },
});

const initTabListState: ImageTabListType[] = [
  { name: '내부사진', type: 'storeImage', selected: false },
  { name: '외부사진', type: 'storeImage', selected: true },
  { name: '추가로', type: 'storeImage', selected: false },
  { name: '여러 메뉴의', type: 'storeImage', selected: false },
  { name: '사진 탭을', type: 'storeImage', selected: false },
  { name: '만들수', type: 'storeImage', selected: false },
  { name: '있고', type: 'storeImage', selected: false },
  { name: '스크롤로', type: 'storeImage', selected: false },
  { name: '넘길수있어요', type: 'storeImage', selected: false },
  { name: '메뉴', type: 'menuImage', selected: false },
];

export const imageTabListStateAtom = atom({
  key: 'atom / imageTabListState',
  default: initTabListState,
});

// export const imageListStateAtom = atom({
// 	key: 'atom / imageListState',
// 	default: initImageList,
// });

export const imageRenderStateAtom = atom({
  key: 'atom / imageRenderState',
  default: false,
});
