import { MouseEventHandler } from 'react';
import { DOMID_POP_UP_WINDOW, DOMID_POP_UP_WINDOW_HANDLER } from '@constants/DOM';
import {
  HandleEventEndCaptureProps,
  HandleEventMoveCaptureProps,
  HandleEventStartCaptureProps,
} from '@libs/types/infowindow';
import { PopUpHeightsType, popUpHeights } from '@constants/popUpHeights';
import { reactRefUpdate } from '../../../utils/reactRefUpdate';

export const handleMouseDownCapture: (props: HandleEventStartCaptureProps) => MouseEventHandler<HTMLDivElement> =
  ({ pointRef, layoutStateRef }) =>
  (e) => {
    const target = e.target as HTMLElement;
    if (target.id === DOMID_POP_UP_WINDOW_HANDLER) return;
    const timeStamp: number = performance.now();
    reactRefUpdate({ ref: pointRef, update: { clientX: e.clientX, clientY: e.clientY } });
    reactRefUpdate({ ref: layoutStateRef, update: { timeStamp, onHandling: true } });
  };

export const handleMouseMoveCapture: (props: HandleEventMoveCaptureProps) => MouseEventHandler<HTMLDivElement> =
  ({ pointRef, layoutStateRef, setTabState, tabState }) =>
  (e) => {
    if (layoutStateRef.current.onHandling) {
      const { clientX: baseX, clientY: baseY } = pointRef.current;
      const { clientX: curX, clientY: curY } = e;

      const timeGap = performance.now() - layoutStateRef.current.timeStamp;
      const moveY = curY - baseY;
      const moveX = curX - baseX;
      if (moveX < -20 || moveX > 20) {
        reactRefUpdate({ ref: pointRef, update: { clientX: 0, clientY: 0 } });
        reactRefUpdate({ ref: layoutStateRef, update: { onHandling: false, timeStamp: 0 } });
      }
      if (timeGap > 500) {
        reactRefUpdate({ ref: pointRef, update: { clientX: 0, clientY: 0 } });
        reactRefUpdate({ ref: layoutStateRef, update: { onHandling: false, timeStamp: 0 } });
      }
      if (tabState.popUpState === 'half' && moveY < -50 && timeGap < 150) {
        setTabState((prev) => ({ ...prev, top: popUpHeights[PopUpHeightsType.top], popUpState: 'full' }));
        e.target.dispatchEvent(new MouseEvent('mouseup'));
      }
      if (tabState.popUpState === 'full' && moveY > 50 && timeGap < 150) {
        setTabState((prev) => ({ ...prev, top: popUpHeights[PopUpHeightsType.middle], popUpState: 'half' }));
        e.target.dispatchEvent(new MouseEvent('mouseup'));
      }
    }
  };

export const handleMouseUpCapture: (props: HandleEventEndCaptureProps) => MouseEventHandler<HTMLDivElement> =
  ({ pointRef, layoutStateRef }) =>
  () => {
    if (layoutStateRef.current.onHandling) {
      reactRefUpdate({ ref: pointRef, update: { clientX: 0, clientY: 0 } });
      reactRefUpdate({ ref: layoutStateRef, update: { onHandling: false, timeStamp: 0 } });
    }
  };

export const handleMouseOutCapture: (props: HandleEventEndCaptureProps) => MouseEventHandler<HTMLDivElement> =
  ({ pointRef, layoutStateRef }) =>
  (e) => {
    if (!layoutStateRef.current.onHandling) return;
    const target = e.target as HTMLDivElement;
    const relatedTarget = e.relatedTarget as HTMLDivElement;
    const check = target.closest(`#${DOMID_POP_UP_WINDOW}`);
    const check2 = relatedTarget.closest(`#${DOMID_POP_UP_WINDOW}`);

    if (check && !check2) {
      reactRefUpdate({ ref: pointRef, update: { clientX: 0, clientY: 0 } });
      reactRefUpdate({ ref: layoutStateRef, update: { onHandling: false, timeStamp: 0 } });
    }
  };
