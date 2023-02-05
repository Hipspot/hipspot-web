import { CSSVAR_CAROUSEL_HEIGHT } from '@constants/cssVar';
import { HandleImageSliderStartProps, HandleImageSlideMoveProps, HandleImageSliderEndProps } from '@libs/types/slider';
import { calcImageIndex, calcImageListPosition, calcNumberClamp } from '@libs/utils/calc';
import { MouseEventHandler } from 'react';
import { reactRefUpdate } from '../../PopUpWindow/utils/reactRefUpdate';

export const handleMouseDown: (props: HandleImageSliderStartProps) => MouseEventHandler<HTMLElement> =
  ({ imageSliderRef }) =>
  (e) => {
    e.preventDefault();
    e.stopPropagation();

    const r = document.getElementById('carousel') as HTMLDivElement;

    r.style.setProperty('--transition-duration', `0s`);

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
      const r = document.getElementById('carousel') as HTMLDivElement;

      r.style.setProperty('--image-translate', `${left}px`);
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
      const r = document.getElementById('carousel') as HTMLDivElement;
      const width = parseFloat(r.style.getPropertyValue(CSSVAR_CAROUSEL_HEIGHT));
      const blockWidth = width + 16;
      const { left, imageListLength, startX, index: prevIndex } = imageSliderRef.current;
      const displacement = e.clientX - startX;

      const index =
        Math.abs(displacement) < blockWidth
          ? calcNumberClamp({ num: prevIndex + Math.sign(displacement) * -1, min: 0, max: imageListLength - 1 })
          : calcImageIndex({ width: blockWidth, left: -left, imageListLength });

      const leftCorrectionValue = calcImageListPosition({ left, width: blockWidth, index });

      r.style.setProperty('--image-translate', `${leftCorrectionValue}px`);
      r.style.setProperty('--transition-duration', `0.2s`);

      reactRefUpdate({
        ref: imageSliderRef,
        update: { ...imageSliderRef.current, x: 0, startX: 0, onHandling: false, left: leftCorrectionValue, index },
      });
      setImageIndex(index);
    }
  };
