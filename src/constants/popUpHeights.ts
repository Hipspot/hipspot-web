export enum PopUpHeightsType {
  top,
  middle,
  thumbnail,
  bottom,
}

export const popUpHeights = {
  [PopUpHeightsType.top]: -30,
  [PopUpHeightsType.middle]: window.innerHeight * 0.6,
  [PopUpHeightsType.thumbnail]: window.innerHeight - 140,
  [PopUpHeightsType.bottom]: window.innerHeight - 30,
};
