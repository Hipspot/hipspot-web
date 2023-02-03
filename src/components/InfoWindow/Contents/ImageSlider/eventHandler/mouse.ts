import { HandleImageSliderStartProps, HandleImageSlideMoveProps, HandleImageSliderEndProps } from '@libs/types/slider';
import { MouseEventHandler } from 'react';
import { reactRefUpdate } from '../../PopUpWindow/utils/reactRefUpdate';

export const handleMouseDown: (props: HandleImageSliderStartProps) => MouseEventHandler<HTMLElement> =
  ({ imageSliderRef }) =>
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(imageSliderRef.current);

    reactRefUpdate({
      ref: imageSliderRef,
      update: { ...imageSliderRef.current, x: e.clientX, y: e.clientY, onHandling: true },
    });
  };

export const handleMouseMove: (props: HandleImageSlideMoveProps) => MouseEventHandler<HTMLElement> =
  ({ imageSliderRef }) =>
  (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (imageSliderRef.current && imageSliderRef.current.onHandling && imageSliderRef.current) {
      const left = imageSliderRef.current.left + e.clientX - imageSliderRef.current.x;
      const target = e.target as HTMLElement;
      const container = target.parentElement as HTMLDivElement;

      container.style.setProperty('--image-translate', `${left}px`);
      reactRefUpdate({ ref: imageSliderRef, update: { ...imageSliderRef.current, x: e.clientX, y: e.clientY, left } });
    }
  };

export const handleMouseUp: (props: HandleImageSliderEndProps) => MouseEventHandler<HTMLElement> =
  ({ imageSliderRef }) =>
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const container = target.parentElement as HTMLDivElement;
    container.style.setProperty('transition', `all 0.2s ease-in-out`);

    reactRefUpdate({ ref: imageSliderRef, update: { ...imageSliderRef.current, x: 0, y: 0, onHandling: false } });
  };
