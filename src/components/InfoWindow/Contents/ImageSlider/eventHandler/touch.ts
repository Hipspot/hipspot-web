import { CSSVAR_CAROUSEL_HEIGHT } from '@constants/cssVar';
import { HandleImageSliderStartProps, HandleImageSlideMoveProps, HandleImageSliderEndProps } from '@libs/types/slider';
import { calcImageIndex, calcImageListPosition, calcNumberClamp } from '@libs/utils/calc';
import { TouchEventHandler } from 'react';
import { reactRefUpdate } from '../../PopUpWindow/utils/reactRefUpdate';

export const handleTouchStart: (props: HandleImageSliderStartProps) => TouchEventHandler<HTMLElement> =
  ({ imageSliderRef }) =>
  (e) => {

    const target = e.currentTarget as HTMLDivElement;
    target.style.setProperty('--transition-duration', `0s`);

    reactRefUpdate({
      ref: imageSliderRef,
      update: { ...imageSliderRef.current, x: e.touches[0].clientX, startX: e.touches[0].clientX, onHandling: true },
    });
  };

export const handleTouchMove: (props: HandleImageSlideMoveProps) => TouchEventHandler<HTMLElement> =
  ({ imageSliderRef }) =>
  (e) => {

    if (imageSliderRef.current && imageSliderRef.current.onHandling) {
      const { left: prevLeft, x } = imageSliderRef.current;
      const move = e.touches[0].clientX - x;
      const left = prevLeft + move;
      const target = e.currentTarget as HTMLElement;

      target.style.setProperty('--image-translate', `${left}px`);
      reactRefUpdate({
        ref: imageSliderRef,
        update: { ...imageSliderRef.current, x: e.touches[0].clientX, left },
      });
    }
  };

export const handleTouchEnd: (props: HandleImageSliderEndProps) => TouchEventHandler<HTMLElement> =
  ({ imageSliderRef }) =>
  (e) => {
    e.preventDefault();
    if (imageSliderRef.current) {
      const target = e.currentTarget as HTMLElement;
      const r = document.querySelector(':root') as HTMLDivElement;
      const width = parseFloat(r.style.getPropertyValue(CSSVAR_CAROUSEL_HEIGHT));
      const blockWidth = width + 16;
      const { left, imageListLength, startX, index: prevIndex } = imageSliderRef.current;
      const displacement = e.changedTouches[0].clientX - startX;

      const index =
        Math.abs(displacement) < blockWidth
          ? calcNumberClamp({ num: prevIndex + Math.sign(displacement) * -1, min: 0, max: imageListLength - 1 })
          : calcImageIndex({ width: blockWidth, left: -left, imageListLength });

      const leftCorrectionValue = calcImageListPosition({ left, width: blockWidth, index });

      target.style.setProperty('--image-translate', `${leftCorrectionValue}px`);
      target.style.setProperty('--transition-duration', `0.2s`);

      reactRefUpdate({
        ref: imageSliderRef,
        update: { ...imageSliderRef.current, x: 0, startX: 0, onHandling: false, left: leftCorrectionValue, index },
      });
    }
  };
