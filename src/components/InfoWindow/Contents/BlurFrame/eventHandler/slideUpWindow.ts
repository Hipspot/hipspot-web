import { PopUpHeightsType } from '@constants/popUpHeights';
import { SlideUpWindowEvent } from '@libs/types/customEvents';
import { calcProgressRatio } from '@libs/utils/calc';
import { blurInteraction } from '../interaction/blur';

export interface HandleSlideUpWindowForBlurEventProps {
  popUpHeights: { [key in PopUpHeightsType]: number };
}

export const handleSlideUpWindowForBlurFrame =
  (props: HandleSlideUpWindowForBlurEventProps) => (e: SlideUpWindowEvent) => {
    const { popUpHeights } = props;
    const { [PopUpHeightsType.middle]: middleHeight, [PopUpHeightsType.top]: topHeight } = popUpHeights;
    const ratio = calcProgressRatio({
      current: e.currentTop + 30,
      start: middleHeight,
      end: topHeight,
    });

    blurInteraction({ ratio });
  };
