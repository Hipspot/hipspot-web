import slideImageSlider from '@components/InfoWindow/view/slideImageSlider';
import moveImageSlider from '@components/InfoWindow/view/moveImageSlider';
import stopImageSlideTransition from '@components/InfoWindow/view/stopImageSlideTransition';
import concealNotSelectedImage from '@components/InfoWindow/view/concealNotSelectedImage';
import { CSSVAR_IMAGE_SLIDER_WIDTH } from '@constants/cssVar';
import { HandleImageSliderStartProps, HandleImageSlideMoveProps, HandleImageSliderEndProps } from '@libs/types/slider';
import { calcImageIndex, calcImageListPosition, calcNumberClamp } from '@libs/utils/calc';
import { DOMID_IMAGE_SLIDER } from '@constants/DOM';
import { TouchEventHandler } from 'react';
import { reactRefUpdate } from '../../PopUpWindow/utils/reactRefUpdate';

export const handleTouchStart: (props: HandleImageSliderStartProps) => TouchEventHandler<HTMLElement> =
  ({ imageSliderRef }) =>
  (e) => {
    stopImageSlideTransition();
    reactRefUpdate({
      ref: imageSliderRef,
      update: { ...imageSliderRef.current, x: e.touches[0].clientX, startX: e.touches[0].clientX, onHandling: true },
    });
  };

export const handleTouchMove: (props: HandleImageSlideMoveProps) => TouchEventHandler<HTMLElement> =
  ({ imageSliderRef }) =>
  (e) => {
    e.preventDefault();
    if (imageSliderRef.current && imageSliderRef.current.onHandling) {
      const { left: prevLeft, x } = imageSliderRef.current;
      const move = e.touches[0].clientX - x;
      const left = prevLeft + move;

      moveImageSlider({ left });

      reactRefUpdate({
        ref: imageSliderRef,
        update: { ...imageSliderRef.current, x: e.touches[0].clientX, left },
      });
    }
  };

export const handleTouchEnd: (props: HandleImageSliderEndProps) => TouchEventHandler<HTMLElement> =
  ({ imageSliderRef, setImageIndex }) =>
  (e) => {
    if (imageSliderRef.current && imageSliderRef.current.onHandling) {
      const r = document.getElementById(DOMID_IMAGE_SLIDER) as HTMLDivElement;
      const width = parseFloat(r.style.getPropertyValue(CSSVAR_IMAGE_SLIDER_WIDTH));
      const blockWidth = width + 16;
      const { left, imageListLength, startX, index: prevIndex } = imageSliderRef.current;
      const displacement = e.changedTouches[0].clientX - startX;

      const index =
        Math.abs(displacement) < blockWidth
          ? calcNumberClamp({ num: prevIndex + Math.sign(displacement) * -1, min: 0, max: imageListLength - 1 })
          : calcImageIndex({ width: blockWidth, left: -left, imageListLength });

      const leftCorrectionValue = calcImageListPosition({ left, width: blockWidth, index });

      slideImageSlider({ leftCorrectionValue });
      concealNotSelectedImage(false);

      reactRefUpdate({
        ref: imageSliderRef,
        update: { ...imageSliderRef.current, x: 0, startX: 0, onHandling: false, left: leftCorrectionValue, index },
      });
      setImageIndex(index);
    }
  };
