import { MouseEventHandler } from 'react';
import { DOMID_POP_UP_WINDOW, DOMID_POP_UP_WINDOW_HANDLER } from '@constants/DOM';
import {
  HandleEventEndCaptureProps,
  HandleEventMoveCaptureProps,
  HandleEventStartCaptureProps,
} from '@libs/types/infowindow';

export const handleMouseDownCapture: (props: HandleEventStartCaptureProps) => MouseEventHandler<HTMLDivElement> =
  ({ recordGesture }) =>
  (e) => {
    const target = e.target as HTMLElement;
    if (target.id === DOMID_POP_UP_WINDOW_HANDLER) return;
    const timeStamp: number = performance.now();
    recordGesture.start({ clientX: e.clientX, clientY: e.clientY, timeStamp });
  };

export const handleMouseMoveCapture: (props: HandleEventMoveCaptureProps) => MouseEventHandler<HTMLDivElement> =
  ({ model, method, recordGesture, check, tabState }) =>
  (e) => {
    if (check.isOnGesture()) {
      const { point, layoutState } = model;
      const { setPopUpWindowPosition } = method;
      const { clientX: baseX, clientY: baseY } = point;
      const { clientX: curX, clientY: curY } = e;

      const timeGap = e.timeStamp - layoutState.timeStamp;
      const moveY = curY - baseY;
      const moveX = curX - baseX;

      const isFlicking = check.isFlicking({ moveY, timeGap });

      if (check.isHorizontalMove(moveX) || check.isLongPress(timeGap) || isFlicking) recordGesture.end();

      if (isFlicking === 'moveUp') {
        if (tabState.popUpState === 'half') setPopUpWindowPosition({ to: 'full' });
        if (tabState.popUpState === 'invisible') setPopUpWindowPosition({ to: 'half' });
      }

      if (isFlicking === 'moveDown') {
        if (tabState.popUpState === 'full') setPopUpWindowPosition({ to: 'half' });
        if (tabState.popUpState === 'half') setPopUpWindowPosition({ to: 'invisible' });
      }
    }
  };

export const handleMouseUpCapture: (props: HandleEventEndCaptureProps) => MouseEventHandler<HTMLDivElement> =
  ({ recordGesture, check }) =>
  () => {
    if (check.isOnGesture()) recordGesture.end();
  };

export const handleMouseOutCapture: (props: HandleEventEndCaptureProps) => MouseEventHandler<HTMLDivElement> =
  ({ recordGesture, check }) =>
  (e) => {
    if (!check.isOnGesture()) return;

    const target = e.target as HTMLDivElement;
    const relatedTarget = e.relatedTarget as HTMLDivElement;
    const outCheck1 = target.closest(`#${DOMID_POP_UP_WINDOW}`);
    const outCheck2 = relatedTarget.closest(`#${DOMID_POP_UP_WINDOW}`);

    if (outCheck1 && !outCheck2) recordGesture.end();
  };
