import interpolateBlur from '@components/InfoWindow/view/interpolateBlur';
import { PopUpHeightsType } from '@constants/popUpHeights';
import { SlideUpWindowEvent } from '@libs/types/customEvents';
import { calcProgressRatio } from '@libs/utils/calc';

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

    interpolateBlur({ ratio });

    if (e.currentTop === middleHeight) {
      const target = e.target as HTMLDivElement;
      target.style.removeProperty('backdrop-filter');
    }
  };
