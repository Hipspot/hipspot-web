import { DOMID_POP_UP_WINDOW_HANDLER } from '@constants/DOM';
import {
  HandleEventEndCaptureProps,
  HandleEventMoveCaptureProps,
  HandleEventStartCaptureProps,
} from '@libs/types/infowindow';
import { TouchEventHandler } from 'react';

export const handleTouchStartCapture: (props: HandleEventStartCaptureProps) => TouchEventHandler<HTMLDivElement> =
  ({ setUp }) =>
  (e) => {
    const target = e.target as HTMLElement;
    if (target.id === DOMID_POP_UP_WINDOW_HANDLER) return;
    const timeStamp: number = performance.now();
    setUp.start({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY, timeStamp });
  };

export const handleTouchMoveCapture: (props: HandleEventMoveCaptureProps) => TouchEventHandler<HTMLDivElement> =
  ({ state, action, setUp, check }) =>
  (e) => {
    if (check.isOnHandling()) {
      const { pointRef, layoutStateRef } = state;
      const { clientX: baseX, clientY: baseY } = pointRef.current;
      const { clientX: curX, clientY: curY } = e.touches[0];

      const timeGap = performance.now() - layoutStateRef.current.timeStamp;
      const moveY = curY - baseY;
      const moveX = curX - baseX;

      if (check.isHorizontalMove(moveX) || check.isLongPress(timeGap)) setUp.end();

      const isFlicking = check.isFlicking({ moveY, timeGap });

      if (isFlicking === 'moveUp') {
        if (state.tabState.popUpState === 'half') action({ from: 'half', to: 'full' });
        if (state.tabState.popUpState === 'invisible') action({ from: 'invisible', to: 'half' });
      }

      if (isFlicking === 'moveDown') {
        if (state.tabState.popUpState === 'full') action({ from: 'full', to: 'half' });
        if (state.tabState.popUpState === 'half') action({ from: 'half', to: 'invisible' });
      }
    }
  };

export const handleTouchEndCapture: (props: HandleEventEndCaptureProps) => TouchEventHandler<HTMLDivElement> =
  ({ setUp, check }) =>
  () => {
    if (check.isOnHandling()) setUp.end();
  };
