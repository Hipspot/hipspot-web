import { BarSizes, BarSizeType } from './barSizes';

export enum PopUpHeightsType {
  top,
  middle,
  thumbnail,
  bottom,
}
export const popUpHeights = {
  [PopUpHeightsType.top]: -BarSizes[BarSizeType.BOTTOM],
  [PopUpHeightsType.middle]: window.innerHeight * 0.6,
  [PopUpHeightsType.thumbnail]: window.innerHeight - 140,
  [PopUpHeightsType.bottom]: window.innerHeight - 30,
};
