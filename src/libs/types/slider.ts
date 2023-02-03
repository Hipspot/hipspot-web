import { RefObject } from 'react';

export interface ImageSliderRef {
  onHandling: boolean;
  x: number;
  y: number;
  left: number;
}

export interface HandleImageSliderStartProps {
  imageSliderRef: RefObject<ImageSliderRef>;
}

export interface HandleImageSlideMoveProps {
  imageSliderRef: RefObject<ImageSliderRef>;
}

export interface HandleImageSliderEndProps {
  imageIndex: number;
  imageSliderRef: RefObject<ImageSliderRef>;
}
