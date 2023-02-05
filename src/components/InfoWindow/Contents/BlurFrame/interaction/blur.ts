import { DOMID_BLURFRAME, DOMTargetList } from '@constants/DOM';
import { blurFrameTween, blurOpacityTween } from '@constants/Tween';
import { calcInterpolation } from '@libs/utils/calc';

export const blurInteraction = ({ ratio }: { ratio: number }) => {
  const target = DOMTargetList[DOMID_BLURFRAME];
  if (!target) return;
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

  target.style.setProperty('backdrop-filter', `blur(${blurPixels}px)`);
  target.style.setProperty('background', `rgba(255, 255, 255, ${opacity})`);
};
