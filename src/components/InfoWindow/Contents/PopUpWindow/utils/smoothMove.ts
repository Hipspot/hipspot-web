/* eslint-disable no-param-reassign */
import modifyInfoWindowTop from '@components/InfoWindow/view/modifyInfoWindowTop';
import { DOMID_BLURFRAME, DOMID_IMAGE_SLIDER } from '@constants/DOM';
import { EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import { DURATION } from '@constants/interaction';
import { TabState } from '@libs/types/infowindow';
import { calcInterpolation, calcProgressRatio } from '@libs/utils/calc';
import { createCustomEvent, dispatchCustomEvent } from '@libs/utils/customEvent';
import { ease } from '@libs/utils/easings';

interface SmoothMoveArgs {
  parentElement: HTMLDivElement;
  tabState: TabState;
  smoothLoopId: { id: number };
  recordCurrentTop: (top: number) => void;
}
const duration = DURATION;

export default function smoothMove({ parentElement, tabState, smoothLoopId, recordCurrentTop }: SmoothMoveArgs) {
  const start = performance.now();
  const [startY, endY] = [tabState.startTop, tabState.top];
  let curY = parentElement.getBoundingClientRect().y;
  let curT = 0;
  let timeRef = start;

  function loop() {
    const loopT = performance.now();
    const timeRatio = calcProgressRatio({ start, end: start + duration, current: loopT });
    const easedRatio = ease.easeOutQuint(timeRatio);
    const nextY = calcInterpolation({ min: startY, max: endY, ratio: easedRatio });
    curY = nextY;

    const slideEvent = createCustomEvent(EVENT_SLIDE_UP_WINDOW, { currentTop: curY });

    modifyInfoWindowTop({ currentTop: curY });
    dispatchCustomEvent(DOMID_BLURFRAME, slideEvent);
    dispatchCustomEvent(DOMID_IMAGE_SLIDER, slideEvent);
    recordCurrentTop(curY);

    if (Math.abs(curY - endY) > 1 && curT < duration) {
      smoothLoopId.id = requestAnimationFrame(loop);
    } else {
      modifyInfoWindowTop({ currentTop: endY });
      dispatchCustomEvent(DOMID_BLURFRAME, slideEvent);
      dispatchCustomEvent(DOMID_IMAGE_SLIDER, slideEvent);
      recordCurrentTop(curY);
    }
    curT += loopT - timeRef;
    timeRef = loopT;
  }

  smoothLoopId.id = requestAnimationFrame(loop);
}
