export enum PopUpHeightsType {
  top,
  middle,
  thumbnail,
  bottom,
}

export const popUpHeights = {
  [PopUpHeightsType.top]: -30,
  [PopUpHeightsType.middle]: window.innerHeight / 2,
  [PopUpHeightsType.thumbnail]: window.innerHeight - 140,
  [PopUpHeightsType.bottom]: window.innerHeight - 30,
};
