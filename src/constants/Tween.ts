import { calcNumberClamp } from '@libs/utils/calc';

export const imageSliderHeightTween = {
  min: 170,
  get max() {
    return calcNumberClamp({ num: window.innerWidth, min: 170, max: 343 });
  },
};

export const imageSliderWidthTween = {
  min: 170,
  get max() {
    return calcNumberClamp({ num: window.innerWidth, min: 170, max: 600 }) - 32;
  },
};

export const blurFrameTween = {
  min: 0,
  max: 8,
};

export const blurOpacityTween = {
  min: 1,
  max: 0.06,
};
