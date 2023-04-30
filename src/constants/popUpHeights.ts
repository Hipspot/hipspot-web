import { BarSizes, BarSizeType } from './barSizes';

export enum PopUpHeightsType {
  top,
  middle,
  bottom,
}

export const popUpHeights = {
  [PopUpHeightsType.top]: -BarSizes[BarSizeType.BOTTOM],
  [PopUpHeightsType.middle]: window.innerHeight * 0.6,
  [PopUpHeightsType.bottom]: window.innerHeight - 30,
  invisible: window.innerHeight - 30,
  half: window.innerHeight * 0.6,
  full: -BarSizes[BarSizeType.BOTTOM],
};
