import { DOMID_CAROUSEL, DOMTargetList } from '@constants/DOM';

interface MoveCarouselProps {
  leftCorrectionValue: number;
}

const moveCarousel = ({ leftCorrectionValue }: MoveCarouselProps) => {
  const dom = DOMTargetList[DOMID_CAROUSEL];
  if (!dom) return;

  dom.style.setProperty('--image-translate', `${leftCorrectionValue}px`);
  dom.style.setProperty('--transition-duration', `0.2s`);
};

export default moveCarousel;
