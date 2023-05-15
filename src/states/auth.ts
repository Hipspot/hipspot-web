import { atom } from 'recoil';

interface AuthState {
  isAuth: boolean;
  accessToken: string | null;
}

export const authAtom = atom<AuthState>({
  key: 'auth',
  default: {
    isAuth: false,
    accessToken: null,
  },
});
