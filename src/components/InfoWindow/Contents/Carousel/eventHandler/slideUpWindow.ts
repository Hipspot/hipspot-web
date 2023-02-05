import { carouselHeightsTween } from '@constants/Tween';
import { CSSVAR_CAROUSEL_HEIGHT } from '@constants/cssVar';
import { PopUpHeightsType } from '@constants/popUpHeights';
import { SlideUpWindowEvent } from '@libs/types/customEvents';
import { calcProgressRatio, calcInterpolation } from '@libs/utils/calc';

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

    const r = document.getElementById('carousel') as HTMLHtmlElement;
    r.style.setProperty(CSSVAR_CAROUSEL_HEIGHT, `${carouselHeight}px`);
    r.style.setProperty('--transition-duration', '0s');
  };
