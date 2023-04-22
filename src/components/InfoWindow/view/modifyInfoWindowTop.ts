import { DOMID_POP_UP_WINDOW, DOMTargetList } from '@constants/DOM';
import { CSSVAR_POP_UP_WINDOW_TOP } from '@constants/cssVar';

interface ModifyInfoWindowTopProps {
  currentTop: number;
}

const modifyInfoWindowTop = async ({ currentTop }: ModifyInfoWindowTopProps) => {
  const dom = DOMTargetList[DOMID_POP_UP_WINDOW];
  if (!dom) return;
  dom.style.setProperty(CSSVAR_POP_UP_WINDOW_TOP, `${currentTop}px`);
};

export default modifyInfoWindowTop;
