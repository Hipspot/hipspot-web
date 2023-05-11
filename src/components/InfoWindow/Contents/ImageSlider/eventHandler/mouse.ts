import slideImageSlider from '@components/InfoWindow/view/slideImageSlider';
import moveImageSlider from '@components/InfoWindow/view/moveImageSlider';
import stopImageSlideTransition from '@components/InfoWindow/view/stopImageSlideTransition';
import { CSSVAR_IMAGE_SLIDER_WIDTH } from '@constants/cssVar';
import { DOMID_IMAGE_SLIDER } from '@constants/DOM';
import {
  HandleImageSliderStartProps,
  HandleImageSlideMoveProps,
  HandleImageSliderEndProps,
} from '@libs/types/imageSlider';
import { calcImageIndex, calcImageListPosition, calcNumberClamp } from '@libs/utils/calc';
import { MouseEventHandler } from 'react';
import { IMAGE_SLIDER_PADDING } from '@constants/imageSlider';

export const handleMouseDown: (props: HandleImageSliderStartProps) => MouseEventHandler<HTMLElement> =
  ({ model }) =>
  (e) => {
    e.preventDefault();
    e.stopPropagation();

    stopImageSlideTransition();

    model.update({
      onHandling: true,
      x: e.clientX,
      anchorX: e.clientX,
    });
  };

export const handleMouseMove: (props: HandleImageSlideMoveProps) => MouseEventHandler<HTMLElement> =
  ({ model }) =>
  (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (model.onHandling) {
      const { left: prevLeft, x } = model;
      const dx = e.clientX - x;
      const left = prevLeft + dx;

      moveImageSlider({ left });

      model.update({
        x: e.clientX,
        left,
      });
    }
  };

export const handleMouseUp: (props: HandleImageSliderEndProps) => MouseEventHandler<HTMLElement> =
  ({ model, setImageIndex }) =>
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (model.onHandling) {
      const r = document.getElementById(DOMID_IMAGE_SLIDER) as HTMLDivElement;
      const width = parseFloat(r.style.getPropertyValue(CSSVAR_IMAGE_SLIDER_WIDTH));
      const blockWidth = width + IMAGE_SLIDER_PADDING;
      const { left, imageListLength, anchorX, index: prevIndex } = model;
      const displacement = e.clientX - anchorX;

      const index =
        Math.abs(displacement) < blockWidth
          ? calcNumberClamp({ num: prevIndex + Math.sign(displacement) * -1, min: 0, max: imageListLength - 1 })
          : calcImageIndex({ width: blockWidth, left: -left, imageListLength });

      const leftCorrectionValue = calcImageListPosition({ left, width: blockWidth, index });

      slideImageSlider({ leftCorrectionValue });

      model.update({
        x: 0,
        anchorX: 0,
        onHandling: false,
        left: leftCorrectionValue,
        index,
      });
      setImageIndex(index);
    }
  };
