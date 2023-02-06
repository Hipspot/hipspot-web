import { PopUpHeightsType } from '@constants/popUpHeights';
import { SlideUpWindowEvent } from '@libs/types/customEvents';
import modifyImageSlideHeight from '@components/InfoWindow/view/modifyImageSlideHeight';
import { carouselHeightsTween } from '@constants/Tween';
import { calcInterpolation, calcProgressRatio } from '@libs/utils/calc';

export interface HandleSlidePopUpWindowForCarouselProps {
  popUpHeights: { [key in PopUpHeightsType]: number };
}

export const handleSlidePopUpWindowForCarousel =
  (props: HandleSlidePopUpWindowForCarouselProps) => (e: SlideUpWindowEvent) => {
    const { popUpHeights } = props;

    const { [PopUpHeightsType.middle]: middleHeight, [PopUpHeightsType.top]: topHeight } = popUpHeights;
    const { max, min } = carouselHeightsTween;
    const ratio = calcProgressRatio({
      current: e.currentTop + 30,
      start: middleHeight,
      end: topHeight,
    });
    const carouselHeight = calcInterpolation({
      min,
      max,
      ratio,
    });

    modifyImageSlideHeight({ carouselHeight });
  };
