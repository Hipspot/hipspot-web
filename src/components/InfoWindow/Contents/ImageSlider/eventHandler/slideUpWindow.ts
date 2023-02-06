import { PopUpHeightsType } from '@constants/popUpHeights';
import { SlideUpWindowEvent } from '@libs/types/customEvents';
import modifyImageSliderHeight from '@components/InfoWindow/view/modifyImageSliderHeight';
import { imageSliderHeightTween, imageSliderWidthTween } from '@constants/Tween';
import { calcInterpolation, calcProgressRatio } from '@libs/utils/calc';
import modifyImageSliderWidth from '@components/InfoWindow/view/modifyImageSliderWidth';
import concealNotSelectedImage from '@components/InfoWindow/view/concealNotSelectedImage';

export interface HandleSlidePopUpWindowForImageSlideProps {
  popUpHeights: { [key in PopUpHeightsType]: number };
}

export const handleSlidePopUpWindowForImageSlide =
  (props: HandleSlidePopUpWindowForImageSlideProps) => (e: SlideUpWindowEvent) => {
    const { popUpHeights } = props;

    const { [PopUpHeightsType.middle]: middleHeight, [PopUpHeightsType.top]: topHeight } = popUpHeights;

    const ratio = calcProgressRatio({
      current: e.currentTop + 30,
      start: middleHeight,
      end: topHeight,
    });
    const height = calcInterpolation({
      min: imageSliderHeightTween.min,
      max: imageSliderHeightTween.max,
      ratio,
    });

    const width = calcInterpolation({
      min: imageSliderWidthTween.min,
      max: imageSliderWidthTween.max,
      ratio,
    });

    modifyImageSliderHeight({ height });
    modifyImageSliderWidth({ width });
    concealNotSelectedImage(true);
  };
