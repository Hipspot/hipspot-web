import { PopUpHeightsType } from '@constants/popUpHeights';

export interface HandleSlideUpWindowForCarouselEventProps {
  popUpHeights: { [key in PopUpHeightsType]: number };
}
