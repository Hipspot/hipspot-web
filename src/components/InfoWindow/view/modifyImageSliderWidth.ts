import { CSSVAR_IMAGE_SLIDER_TRANSITION_DURATION, CSSVAR_IMAGE_SLIDER_WIDTH } from '@constants/cssVar';
import { DOMID_IMAGE_SLIDER, DOMTargetList } from '@constants/DOM';

interface ModifyImageSliderHeightProps {
  width: number;
}

const modifyImageSliderWidth = ({ width }: ModifyImageSliderHeightProps) => {
  const dom = DOMTargetList[DOMID_IMAGE_SLIDER];
  if (!dom) return;

  dom.style.setProperty(CSSVAR_IMAGE_SLIDER_WIDTH, `${width}px`);
  dom.style.setProperty(CSSVAR_IMAGE_SLIDER_TRANSITION_DURATION, '0s');
};

export default modifyImageSliderWidth;
