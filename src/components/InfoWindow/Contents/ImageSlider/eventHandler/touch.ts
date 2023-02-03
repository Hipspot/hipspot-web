import { HandleImageSliderStartProps, HandleImageSlideMoveProps, HandleImageSliderEndProps } from '@libs/types/slider';
import { TouchEventHandler } from 'react';
import { reactRefUpdate } from '../../PopUpWindow/utils/reactRefUpdate';

export const handleTouchStart: (props: HandleImageSliderStartProps) => TouchEventHandler<HTMLElement> =
  ({ imageSliderRef }) =>
  (e) => {
    e.stopPropagation();
    reactRefUpdate({
      ref: imageSliderRef,
      update: { ...imageSliderRef.current, x: e.touches[0].clientX, y: e.touches[0].clientY, onHandling: true },
    });
  };

export const handleTouchMove: (props: HandleImageSlideMoveProps) => TouchEventHandler<HTMLElement> =
  ({ imageSliderRef }) =>
  (e) => {
    e.stopPropagation();

    if (imageSliderRef.current && imageSliderRef.current.onHandling && imageSliderRef.current) {
      const left = imageSliderRef.current.left + e.touches[0].clientX - imageSliderRef.current.x;
      const target = e.target as HTMLElement;
      const container = target.parentElement as HTMLDivElement;

      container.style.setProperty('--image-translate', `${left}px`);
      reactRefUpdate({
        ref: imageSliderRef,
        update: { ...imageSliderRef.current, x: e.touches[0].clientX, y: e.touches[0].clientY, left },
      });
    }
  };

export const handleTouchEnd: (props: HandleImageSliderEndProps) => TouchEventHandler<HTMLElement> =
  ({ imageSliderRef }) =>
  (e) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const container = target.parentElement as HTMLDivElement;
    container.style.setProperty('transition', `all 0.2s ease-in-out`);

    reactRefUpdate({ ref: imageSliderRef, update: { ...imageSliderRef.current, x: 0, y: 0, onHandling: false } });
  };
