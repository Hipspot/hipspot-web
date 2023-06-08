import { atom } from 'recoil';

export const isWebViewAtom = atom<boolean>({
  key: 'isWebView',
  default: false,
});
