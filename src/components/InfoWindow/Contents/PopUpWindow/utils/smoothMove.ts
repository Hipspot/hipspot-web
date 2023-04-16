/* eslint-disable no-param-reassign */
import modifyInfoWindowTop from '@components/InfoWindow/view/modifyInfoWindowTop';
import { TabState } from '@libs/types/infowindow';

interface SmoothMoveArgs {
  parentElement: HTMLDivElement;
  endPointTabState: TabState;
  smoothLoopId: { id: number };
}

export default function smoothMove({ parentElement, endPointTabState, smoothLoopId }: SmoothMoveArgs) {
  let curY = parentElement.getBoundingClientRect().y;

  function loop() {
    const endY = endPointTabState.top;
    const acc = 0.1;
    curY += (endY - curY) * acc;

    modifyInfoWindowTop({ currentTop: curY });

    if (Math.abs(curY - endY) > 1) {
      smoothLoopId.id = requestAnimationFrame(loop);
    } else {
      modifyInfoWindowTop({ currentTop: endY });
    }
  }

  smoothLoopId.id = requestAnimationFrame(loop);
}
