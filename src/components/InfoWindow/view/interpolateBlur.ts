import { DOMID_BLURFRAME, DOMTargetList } from '@constants/DOM';
import { blurFrameTween, blurOpacityTween } from '@constants/Tween';
import { calcInterpolation } from '@libs/utils/calc';

const interpolateBlur = ({ ratio }: { ratio: number }) => {
  const dom = DOMTargetList[DOMID_BLURFRAME];
  if (!dom) return;
  const opacity = calcInterpolation({
    min: blurOpacityTween.min,
    max: blurOpacityTween.max,
    ratio,
  });

  const blurPixels = calcInterpolation({
    min: blurFrameTween.min,
    max: blurFrameTween.max,
    ratio,
  });

  dom.style.setProperty('backdrop-filter', `blur(${blurPixels}px)`);
  dom.style.setProperty('background', `rgba(255, 255, 255, ${opacity})`);
};

export default interpolateBlur;
