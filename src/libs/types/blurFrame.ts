import { PopUpHeightsType } from '@constants/popUpHeights';

export interface HandleSlideUpWindowForBlurFrameEventProps {
  popUpHeights: { [key in PopUpHeightsType]: number };
}
