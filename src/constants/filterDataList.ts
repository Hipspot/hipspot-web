import {
  DessertColored,
  DessertGray,
  EffectiveColored,
  EffectiveGray,
  FranchiseColored,
  FranchiseGray,
  HipspotColored,
  HipspotGray,
  IndividualColored,
  IndividualGray,
  StudyColored,
  StudyGray,
} from '@assets/svg';
import { filterColor } from '@lib/styles/color';
import { FilterDataList, FilterId } from '@lib/types/filter';

const filterDataList: FilterDataList = {
  [FilterId.Hipspot]: {
    label: '힙스팟',
    icon: HipspotColored,
    iconDisabled: HipspotGray,
    color: filterColor[FilterId.Hipspot],
  },
  [FilterId.Study]: {
    label: '스터디',
    icon: StudyColored,
    iconDisabled: StudyGray,
    color: filterColor[FilterId.Study],
  },
  [FilterId.Reasonable]: {
    label: '가성비',
    icon: EffectiveColored,
    iconDisabled: EffectiveGray,
    color: filterColor[FilterId.Reasonable],
  },
  [FilterId.Dessert]: {
    label: '디저트',
    icon: DessertColored,
    iconDisabled: DessertGray,
    color: filterColor[FilterId.Dessert],
  },
  [FilterId.Franchise]: {
    label: '프랜차이즈',
    icon: FranchiseColored,
    iconDisabled: FranchiseGray,
    color: filterColor[FilterId.Franchise],
  },
  [FilterId.Personal]: {
    label: '개인카페',
    icon: IndividualColored,
    iconDisabled: IndividualGray,
    color: filterColor[FilterId.Personal],
  },
};
export default filterDataList;
