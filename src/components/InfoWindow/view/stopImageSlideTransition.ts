import { CSSVAR_IMAGE_SLIDER_TRANSITION_DURATION } from '@constants/cssVar';
import { DOMID_IMAGE_SLIDER, DOMTargetList } from '@constants/DOM';

const stopImageSlideTransition = () => {
  const dom = DOMTargetList[DOMID_IMAGE_SLIDER];
  if (!dom) return;

  dom.style.setProperty(CSSVAR_IMAGE_SLIDER_TRANSITION_DURATION, `0s`);
};

export default stopImageSlideTransition;
