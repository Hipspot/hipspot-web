import { DOMID_BLURFRAME, DOMTargetList } from '@constants/DOM';

interface ModifyBlurAndOpacityProps {
  blurPixels: number;
  opacity: number;
}

const modifyBlurFrameBackground = ({ blurPixels, opacity }: ModifyBlurAndOpacityProps) => {
  const dom = DOMTargetList[DOMID_BLURFRAME];

  if (!dom) return;
  dom.style.setProperty('backdrop-filter', `blur(${blurPixels}px)`);
  dom.style.setProperty('-webkit-backdrop-filter', `blur(${blurPixels}px)`);
  dom.style.setProperty('background', `rgba(255, 255, 255, ${opacity})`);
};

export default modifyBlurFrameBackground;
