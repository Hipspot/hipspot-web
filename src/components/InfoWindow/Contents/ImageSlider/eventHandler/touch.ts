import slideImageSlider from '@components/InfoWindow/view/slideImageSlider';
import moveImageSlider from '@components/InfoWindow/view/moveImageSlider';
import stopImageSlideTransition from '@components/InfoWindow/view/stopImageSlideTransition';
import { CSSVAR_IMAGE_SLIDER_WIDTH } from '@constants/cssVar';
import { HandleImageSliderStartProps, HandleImageSlideMoveProps, HandleImageSliderEndProps } from '@libs/types/slider';
import { calcImageIndex, calcImageListPosition, calcNumberClamp } from '@libs/utils/calc';
import { DOMID_IMAGE_SLIDER } from '@constants/DOM';
import { TouchEventHandler } from 'react';
import { IMAGE_SLIDER_PADDING } from '@constants/imageSlider';

export const handleTouchStart: (props: HandleImageSliderStartProps) => TouchEventHandler<HTMLElement> =
  ({ model }) =>
  (e) => {
    stopImageSlideTransition();

    model.update({
      onHandling: true,
      x: e.touches[0].clientX,
      startX: e.touches[0].clientX,
    });
  };

export const handleTouchMove: (props: HandleImageSlideMoveProps) => TouchEventHandler<HTMLElement> =
  ({ model }) =>
  (e) => {
    if (model.onHandling) {
      e.preventDefault();
      const { left: prevLeft, x } = model;
      const move = e.touches[0].clientX - x;
      const left = prevLeft + move;
      moveImageSlider({ left });

      model.update({
        x: e.touches[0].clientX,
        left,
      });
    }
  };

export const handleTouchEnd: (props: HandleImageSliderEndProps) => TouchEventHandler<HTMLElement> =
  ({ model, setImageIndex }) =>
  (e) => {
    if (model.onHandling) {
      const r = document.getElementById(DOMID_IMAGE_SLIDER) as HTMLDivElement;
      const width = parseFloat(r.style.getPropertyValue(CSSVAR_IMAGE_SLIDER_WIDTH));
      const blockWidth = width + IMAGE_SLIDER_PADDING;
      const { left, imageListLength, startX, index: prevIndex } = model;
      const displacement = e.changedTouches[0].clientX - startX;

      const index =
        Math.abs(displacement) < blockWidth
          ? calcNumberClamp({ num: prevIndex + Math.sign(displacement) * -1, min: 0, max: imageListLength - 1 })
          : calcImageIndex({ width: blockWidth, left: -left, imageListLength });

      const leftCorrectionValue = calcImageListPosition({ left, width: blockWidth, index });

      slideImageSlider({ leftCorrectionValue });

      model.update({
        x: 0,
        startX: 0,
        onHandling: false,
        left: leftCorrectionValue,
        index,
      });

      setImageIndex(index);
    }
  };
