import { DOMID_CAROUSEL, DOMTargetList } from '@constants/DOM';

const stopImageSlideTransition = () => {
  const dom = DOMTargetList[DOMID_CAROUSEL];
  if (!dom) return;

  dom.style.setProperty('--transition-duration', `0s`);
};

export default stopImageSlideTransition;
