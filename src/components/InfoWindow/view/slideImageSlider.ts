import { CSSVAR_IMAGE_SLIDER_TRANSITION_DURATION, CSSVAR_IMAGE_TRANSLATE } from '@constants/cssVar';
import { DOMID_IMAGE_SLIDER, DOMTargetList } from '@constants/DOM';

interface SlideImageSliderProps {
  leftCorrectionValue: number;
}

const slideImageSlider = ({ leftCorrectionValue }: SlideImageSliderProps) => {
  const dom = DOMTargetList[DOMID_IMAGE_SLIDER];
  if (!dom) return;

  dom.style.setProperty(CSSVAR_IMAGE_TRANSLATE, `${leftCorrectionValue}px`);
  dom.style.setProperty(CSSVAR_IMAGE_SLIDER_TRANSITION_DURATION, `0.2s`);
};

export default slideImageSlider;
