import { blurFrameTween } from '@constants/Tween';
import { PopUpHeightsType } from '@constants/popUpHeights';
import { SlideUpWindowEvent } from '@libs/types/customEvents';
import { calcProgressRatio, calcInterpolation } from '@libs/utils/calc';
import { CSSVAR_BLER_FRAME_PIXELS } from '@constants/cssVar';

export interface HandleSlideUpWindowForBlurEventProps {
  popUpHeights: { [key in PopUpHeightsType]: number };
}

export const handleSlideUpWindowForBlurFrame =
  (props: HandleSlideUpWindowForBlurEventProps) => (e: SlideUpWindowEvent) => {
    const { popUpHeights } = props;
    const { [PopUpHeightsType.middle]: middleHeight, [PopUpHeightsType.top]: topHeight } = popUpHeights;
    const { max, min } = blurFrameTween;
    const ratio = calcProgressRatio({
      current: e.currentTop + 30,
      start: middleHeight,
      end: topHeight,
    });

    const blurPixels = calcInterpolation({
      min,
      max,
      ratio,
    });

    const r = document.querySelector(':root') as HTMLHtmlElement;

    const target = e.target as HTMLDivElement;
    target.style.backgroundColor = `rgba(250, 255, 255, 1}`;
    r.style.setProperty(CSSVAR_BLER_FRAME_PIXELS, `${blurPixels}px`);
  };
