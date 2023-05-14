import { atom } from 'recoil';

export const authAtom = atom({
  key: 'auth',
  default: {
    isAuth: false,
    accessToken: '',
  },
});
