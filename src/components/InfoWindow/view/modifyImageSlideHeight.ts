import { CSSVAR_CAROUSEL_HEIGHT } from '@constants/cssVar';
import { DOMID_CAROUSEL, DOMTargetList } from '@constants/DOM';

interface ModifyImageSlideHeightProps {
  carouselHeight: number;
}

const modifyImageSlideHeight = ({ carouselHeight }: ModifyImageSlideHeightProps) => {
  const dom = DOMTargetList[DOMID_CAROUSEL];
  if (!dom) return;

  dom.style.setProperty(CSSVAR_CAROUSEL_HEIGHT, `${carouselHeight}px`);
  dom.style.setProperty('--transition-duration', '0s');
};

export default modifyImageSlideHeight;
