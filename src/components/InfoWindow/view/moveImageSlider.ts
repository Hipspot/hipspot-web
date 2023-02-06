import { CSSVAR_IMAGE_TRANSLATE } from '@constants/cssVar';
import { DOMID_IMAGE_SLIDER, DOMTargetList } from '@constants/DOM';

interface MoveImageSliderProps {
  left: number;
}

const moveImageSlider = ({ left }: MoveImageSliderProps) => {
  const dom = DOMTargetList[DOMID_IMAGE_SLIDER];
  if (!dom) return;

  dom.style.setProperty(CSSVAR_IMAGE_TRANSLATE, `${left}px`);
};

export default moveImageSlider;
