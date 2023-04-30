import modifyBlurAndOpacity from '@components/InfoWindow/view/modifyBlurFrameBackground';
import { blurFrameTween, blurOpacityTween } from '@constants/Tween';
import { PopUpHeightsType } from '@constants/popUpHeights';
import { SlideUpWindowEvent } from '@libs/types/customEvents';
import { calcInterpolation, calcProgressRatio } from '@libs/utils/calc';

export interface HandleSlideUpWindowForBlurEventProps {
  popUpHeights: { [key in PopUpHeightsType]: number };
}

export const handleSlideUpWindowForBlurFrame =
  (props: HandleSlideUpWindowForBlurEventProps) => (e: SlideUpWindowEvent) => {
    const { popUpHeights } = props;
    const { [PopUpHeightsType.middle]: middleHeight, [PopUpHeightsType.top]: topHeight } = popUpHeights;
    const ratio = calcProgressRatio({
      current: e.currentTop,
      start: middleHeight,
      end: topHeight,
    });

    const blurPixels = calcInterpolation({
      max: blurFrameTween.max,
      min: blurFrameTween.min,
      ratio,
    });
    const opacity = calcInterpolation({
      max: blurOpacityTween.max,
      min: blurOpacityTween.min,
      ratio,
    });

    modifyBlurAndOpacity({ blurPixels, opacity });

    if (e.currentTop === middleHeight) {
      const target = e.target as HTMLDivElement;
      target.style.removeProperty('backdrop-filter');
    }
  };
