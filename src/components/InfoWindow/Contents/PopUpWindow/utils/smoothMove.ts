/* eslint-disable no-param-reassign */
import modifyInfoWindowTop from '@components/InfoWindow/view/modifyInfoWindowTop';
import { TabState } from '@libs/types/infowindow';

interface SmoothMoveArgs {
  parentElement: HTMLDivElement;
  endPointTabState: TabState;
  smoothLoopId: { id: number };
}

export default function smoothMove({ parentElement, endPointTabState, smoothLoopId }: SmoothMoveArgs) {
  let debounce = 60;
  let curY = parentElement.getBoundingClientRect().y;
  function loop() {
    const endY = endPointTabState.top;
    const acc = 0.1;
    curY += (endY - curY) * acc;

    modifyInfoWindowTop({ currentTop: curY });
    const check = curY - endPointTabState.top > -1 && curY - endPointTabState.top < 1;
    if (debounce <= 1 || check) {
      return modifyInfoWindowTop({ currentTop: endPointTabState.top });
    }
    debounce -= 1;
    smoothLoopId.id = requestAnimationFrame(loop);
    return smoothLoopId.id;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  smoothLoopId.id = loop()!;
}
