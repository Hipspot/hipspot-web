import { MouseEventHandler } from 'react';
import { DOMID_POP_UP_WINDOW, DOMID_POP_UP_WINDOW_HANDLER } from '@constants/DOM';
import {
  HandleEventEndCaptureProps,
  HandleEventMoveCaptureProps,
  HandleEventStartCaptureProps,
} from '@libs/types/infowindow';

export const handleMouseDownCapture: (props: HandleEventStartCaptureProps) => MouseEventHandler<HTMLDivElement> =
  ({ setUp }) =>
  (e) => {
    const target = e.target as HTMLElement;
    if (target.id === DOMID_POP_UP_WINDOW_HANDLER) return;
    const timeStamp: number = performance.now();
    setUp.start({ clientX: e.clientX, clientY: e.clientY, timeStamp });
  };

export const handleMouseMoveCapture: (props: HandleEventMoveCaptureProps) => MouseEventHandler<HTMLDivElement> =
  ({ refs, action, setUp, check, tabState }) =>
  (e) => {
    if (check.isOnHandling()) {
      const { pointRef, layoutStateRef } = refs;
      const { clientX: baseX, clientY: baseY } = pointRef.current;
      const { clientX: curX, clientY: curY } = e;

      const timeGap = performance.now() - layoutStateRef.current.timeStamp;
      const moveY = curY - baseY;
      const moveX = curX - baseX;

      if (check.isHorizontalMove(moveX) || check.isLongPress(timeGap)) setUp.end();

      const isFlicking = check.isFlicking({ moveY, timeGap });

      if (isFlicking === 'moveUp') {
        if (tabState.popUpState === 'half') action({ from: 'half', to: 'full' });
        if (tabState.popUpState === 'invisible') action({ from: 'invisible', to: 'half' });
      }

      if (isFlicking === 'moveDown') {
        if (tabState.popUpState === 'full') action({ from: 'full', to: 'half' });
        if (tabState.popUpState === 'half') action({ from: 'half', to: 'invisible' });
      }
    }
  };

export const handleMouseUpCapture: (props: HandleEventEndCaptureProps) => MouseEventHandler<HTMLDivElement> =
  ({ setUp, check }) =>
  () => {
    if (check.isOnHandling()) setUp.end();
  };

export const handleMouseOutCapture: (props: HandleEventEndCaptureProps) => MouseEventHandler<HTMLDivElement> =
  ({ setUp, check }) =>
  (e) => {
    if (!check.isOnHandling()) return;

    const target = e.target as HTMLDivElement;
    const relatedTarget = e.relatedTarget as HTMLDivElement;
    const outCheck1 = target.closest(`#${DOMID_POP_UP_WINDOW}`);
    const outCheck2 = relatedTarget.closest(`#${DOMID_POP_UP_WINDOW}`);

    if (outCheck1 && !outCheck2) setUp.end();
  };
