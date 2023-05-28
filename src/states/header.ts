import { atom } from 'recoil';

export const notchHeightAtom = atom<number>({
  key: 'notchHeight',
  default: 0,
});
