import slideImageSlider from '@components/InfoWindow/view/slideImageSlider';
import moveImageSlider from '@components/InfoWindow/view/moveImageSlider';
import stopImageSlideTransition from '@components/InfoWindow/view/stopImageSlideTransition';
import { CSSVAR_IMAGE_SLIDER_WIDTH } from '@constants/cssVar';
import { DOMID_IMAGE_SLIDER } from '@constants/DOM';
import { HandleImageSliderStartProps, HandleImageSlideMoveProps, HandleImageSliderEndProps } from '@libs/types/slider';
import { calcImageIndex, calcImageListPosition, calcNumberClamp } from '@libs/utils/calc';
import { MouseEventHandler } from 'react';
import { reactRefUpdate } from '../../PopUpWindow/utils/reactRefUpdate';

export const handleMouseDown: (props: HandleImageSliderStartProps) => MouseEventHandler<HTMLElement> =
  ({ imageSliderRef }) =>
  (e) => {
    e.preventDefault();
    e.stopPropagation();

    stopImageSlideTransition();

    reactRefUpdate({
      ref: imageSliderRef,
      update: { ...imageSliderRef.current, x: e.clientX, startX: e.clientX, onHandling: true },
    });
  };

export const handleMouseMove: (props: HandleImageSlideMoveProps) => MouseEventHandler<HTMLElement> =
  ({ imageSliderRef }) =>
  (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (imageSliderRef.current && imageSliderRef.current.onHandling) {
      const { left: prevLeft, x } = imageSliderRef.current;
      const move = e.clientX - x;
      const left = prevLeft + move;

      moveImageSlider({ left });

      reactRefUpdate({
        ref: imageSliderRef,
        update: { ...imageSliderRef.current, x: e.clientX, left },
      });
    }
  };

export const handleMouseUp: (props: HandleImageSliderEndProps) => MouseEventHandler<HTMLElement> =
  ({ imageSliderRef, setImageIndex }) =>
  (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (imageSliderRef.current && imageSliderRef.current.onHandling) {
      const r = document.getElementById(DOMID_IMAGE_SLIDER) as HTMLDivElement;
      const width = parseFloat(r.style.getPropertyValue(CSSVAR_IMAGE_SLIDER_WIDTH));
      const blockWidth = width + 16;
      const { left, imageListLength, startX, index: prevIndex } = imageSliderRef.current;
      const displacement = e.clientX - startX;

      const index =
        Math.abs(displacement) < blockWidth
          ? calcNumberClamp({ num: prevIndex + Math.sign(displacement) * -1, min: 0, max: imageListLength - 1 })
          : calcImageIndex({ width: blockWidth, left: -left, imageListLength });

      const leftCorrectionValue = calcImageListPosition({ left, width: blockWidth, index });

      slideImageSlider({ leftCorrectionValue });

      reactRefUpdate({
        ref: imageSliderRef,
        update: { ...imageSliderRef.current, x: 0, startX: 0, onHandling: false, left: leftCorrectionValue, index },
      });
      setImageIndex(index);
    }
  };
