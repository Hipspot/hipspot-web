import { toast } from 'react-hot-toast';
import { atom, selectorFamily } from 'recoil';

export const favoriteListAtom = atom<number[]>({
  key: 'favoriteListAtom',
  default: [],
});

export const isBookmarkedSelector = selectorFamily<boolean, number | null>({
  key: 'isBookmarkedSelector',
  get:
    (id: number | null) =>
    ({ get }) => {
      if (!id) return false;
      const favoriteList = get(favoriteListAtom);
      toast(favoriteList.toString());
      favoriteList.includes(id);
      return favoriteList.includes(id);
    },
});
