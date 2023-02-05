import { RefObject } from 'react';

export interface ImageSliderRef {
  onHandling: boolean;
  x: number;
  startX: number;
  index: number;
  left: number;
  imageListLength: number;
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
