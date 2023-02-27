import { CSSVAR_IMAGE_SLIDER_HEIGHT, CSSVAR_IMAGE_SLIDER_TRANSITION_DURATION } from '@constants/cssVar';
import { DOMID_IMAGE_SLIDER, DOMTargetList } from '@constants/DOM';

interface ModifyImageSliderHeightProps {
  height: number;
}

const modifyImageSliderHeight = ({ height }: ModifyImageSliderHeightProps) => {
  const dom = DOMTargetList[DOMID_IMAGE_SLIDER];
  if (!dom) return;

  dom.style.setProperty(CSSVAR_IMAGE_SLIDER_HEIGHT, `${height}px`);
  dom.style.setProperty(CSSVAR_IMAGE_SLIDER_TRANSITION_DURATION, '0s');
};

export default modifyImageSliderHeight;
