import { CSSVAR_IMAGE_CONCEAL } from '@constants/cssVar';
import { DOMID_IMAGE_SLIDER, DOMTargetList } from '@constants/DOM';

const concealNotSelectedImage = (on: boolean) => {
  const dom = DOMTargetList[DOMID_IMAGE_SLIDER];
  if (!dom) return;

  dom.style.setProperty(CSSVAR_IMAGE_CONCEAL, on ? 'hidden' : 'visible');
};

export default concealNotSelectedImage;
