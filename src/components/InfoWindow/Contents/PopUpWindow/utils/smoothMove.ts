/* eslint-disable no-param-reassign */
import modifyInfoWindowTop from '@components/InfoWindow/view/modifyInfoWindowTop';
import { DOMID_BLURFRAME, DOMID_IMAGE_SLIDER } from '@constants/DOM';
import { EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import { TabState } from '@libs/types/infowindow';
import { createCustomEvent, dispatchCustomEvent } from '@libs/utils/customEvent';

interface SmoothMoveArgs {
  parentElement: HTMLDivElement;
  endPointTabState: TabState;
  smoothLoopId: { id: number };
  callback?: () => void;
}

export default function smoothMove({ parentElement, endPointTabState, smoothLoopId }: SmoothMoveArgs) {
  let curY = parentElement.getBoundingClientRect().y;

  function loop() {
    const endY = endPointTabState.top;
    const acc = 0.1;
    curY += (endY - curY) * acc;

    const slideEvent = createCustomEvent(EVENT_SLIDE_UP_WINDOW, { currentTop: curY });

    modifyInfoWindowTop({ currentTop: curY });
    dispatchCustomEvent(DOMID_BLURFRAME, slideEvent);
    dispatchCustomEvent(DOMID_IMAGE_SLIDER, slideEvent);

    if (Math.abs(curY - endY) > 1) {
      smoothLoopId.id = requestAnimationFrame(loop);
    } else {
      modifyInfoWindowTop({ currentTop: endY });
      dispatchCustomEvent(DOMID_BLURFRAME, slideEvent);
      dispatchCustomEvent(DOMID_IMAGE_SLIDER, slideEvent);
    }
  }

  smoothLoopId.id = requestAnimationFrame(loop);
}
