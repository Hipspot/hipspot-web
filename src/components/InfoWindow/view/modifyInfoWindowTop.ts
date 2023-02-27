import { DOMID_POP_UP_WINDOW, DOMTargetList } from '@constants/DOM';

interface ModifyInfoWindowTopProps {
  currentTop: number;
}

const modifyInfoWindowTop = ({ currentTop }: ModifyInfoWindowTopProps) => {
  const dom = DOMTargetList[DOMID_POP_UP_WINDOW];
  if (!dom) return;
  dom.style.setProperty('top', `${currentTop}px`);
};

export default modifyInfoWindowTop;
