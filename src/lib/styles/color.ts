import { FilterId } from '@lib/types/filter';
import { TintColor } from '@lib/types/style';

export const filterColor = {
  [FilterId.Hipspot]: TintColor.pink,
  [FilterId.Study]: TintColor.green,
  [FilterId.Reasonable]: TintColor.yellow,
  [FilterId.Dessert]: TintColor.brown,
  [FilterId.Franchise]: TintColor.blue,
  [FilterId.Personal]: TintColor.violet,
};
