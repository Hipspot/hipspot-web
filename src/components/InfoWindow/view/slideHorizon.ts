import { DOMID_CAROUSEL, DOMTargetList } from '@constants/DOM';

interface SlideHorizonProps {
  left: number;
}

const slideHorizon = ({ left }: SlideHorizonProps) => {
  const dom = DOMTargetList[DOMID_CAROUSEL];
  if (!dom) return;

  dom.style.setProperty('--image-translate', `${left}px`);
};

export default slideHorizon;
