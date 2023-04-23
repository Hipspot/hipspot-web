import { DOMID_POP_UP_WINDOW, DOMTargetList } from '@constants/DOM';

interface ModifyInfoWindowTopProps {
  currentTop: number;
}

const modifyInfoWindowTop = async ({ currentTop }: ModifyInfoWindowTopProps) => {
  const dom = DOMTargetList[DOMID_POP_UP_WINDOW];
  if (!dom) return;
  dom.style.setProperty('transform', `translate(calc(50vw - 50%), ${currentTop}px)`);
};

export default modifyInfoWindowTop;
