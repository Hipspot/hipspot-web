import { FilterId } from '@libs/types/filter';

export const colors = {
  black: '#000000',
  white: '#FFFFFF',
  gray: {
    10: '#0D0D0D',
    9: '#262626',
    8: '#404040',
    7: '#595959',
    6: '#737373',
    5: '#999999',
    4: '#B3B3B3',
    3: '#CCCCCC',
    2: '#F0F0F0',
    1: '#FAFAFA',
  },
  error: '#D32F2F',
  success: '#4CAF50',
  warning: '#F9A825',
  filterColor: {
    pink: '#C55CC7',
    green: '#43BE84',
    yellow: '#F2BE19',
    brown: '#BF8D69',
    blue: '#418DFF',
    violet: '#B46FEA',
  },
};

export const filterColor = {
  /** 힙스팟 #C55CC7 */
  [FilterId.Hipspot]: colors.filterColor.pink,
  /** 스터디 #43BE84 */
  [FilterId.Study]: colors.filterColor.green,
  /** 가성비 #F2BE19 */
  [FilterId.Reasonable]: colors.filterColor.yellow,
  /** 디저트 #BF8D69 */
  [FilterId.Dessert]: colors.filterColor.brown,
  /** 프렌차이즈 #418DFF */
  [FilterId.Franchise]: colors.filterColor.blue,
  /** 개인카페 #B46FEA */
  [FilterId.Personal]: colors.filterColor.violet,
};
