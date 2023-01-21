import { FilterId } from '@libs/types/filter';
import { TintColor } from '@libs/types/style';

export const filterColor = {
  [FilterId.Hipspot]: TintColor.pink,
  [FilterId.Study]: TintColor.green,
  [FilterId.Reasonable]: TintColor.yellow,
  [FilterId.Dessert]: TintColor.brown,
  [FilterId.Franchise]: TintColor.blue,
  [FilterId.Personal]: TintColor.violet,
};
