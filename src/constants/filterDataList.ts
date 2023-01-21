import {
  DessertColoredIcon,
  DessertGrayIcon,
  ReasonableColoredIcon,
  ReasonableGrayIcon,
  FranchiseColoredIcon,
  FranchiseGrayIcon,
  HipspotColoredIcon,
  HipspotGrayIcon,
  PersonalColoredIcon,
  PersonalGrayIcon,
  StudyColoredIcon,
  StudyGrayIcon,
} from '@assets/index';
import { filterColor } from 'libs/styles/color';
import { FilterDataList, FilterId } from '@libs/types/filter';

const filterDataList: FilterDataList = {
  [FilterId.Hipspot]: {
    label: '힙스팟',
    icon: HipspotColoredIcon,
    iconDisabled: HipspotGrayIcon,
    color: filterColor[FilterId.Hipspot],
  },
  [FilterId.Study]: {
    label: '스터디',
    icon: StudyColoredIcon,
    iconDisabled: StudyGrayIcon,
    color: filterColor[FilterId.Study],
  },
  [FilterId.Reasonable]: {
    label: '가성비',
    icon: ReasonableColoredIcon,
    iconDisabled: ReasonableGrayIcon,
    color: filterColor[FilterId.Reasonable],
  },
  [FilterId.Dessert]: {
    label: '디저트',
    icon: DessertColoredIcon,
    iconDisabled: DessertGrayIcon,
    color: filterColor[FilterId.Dessert],
  },
  [FilterId.Franchise]: {
    label: '프랜차이즈',
    icon: FranchiseColoredIcon,
    iconDisabled: FranchiseGrayIcon,
    color: filterColor[FilterId.Franchise],
  },
  [FilterId.Personal]: {
    label: '개인카페',
    icon: PersonalColoredIcon,
    iconDisabled: PersonalGrayIcon,
    color: filterColor[FilterId.Personal],
  },
};
export default filterDataList;
