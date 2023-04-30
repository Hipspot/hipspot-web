import { DOMID_BLURFRAME, DOMID_POP_UP_WINDOW_HANDLER } from '@constants/DOM';
import {
  HandleEventEndCaptureProps,
  HandleEventMoveCaptureProps,
  HandleEventStartCaptureProps,
} from '@libs/types/infowindow';
import { TouchEventHandler } from 'react';

export const handleTouchStartCapture: (props: HandleEventStartCaptureProps) => TouchEventHandler<HTMLDivElement> =
  ({ recordGesture }) =>
  (e) => {
    const target = e.target as HTMLElement;
    if (target.id === DOMID_POP_UP_WINDOW_HANDLER) return;
    const timeStamp: number = performance.now();
    recordGesture.start({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY, timeStamp });
  };

export const handleTouchMoveCapture: (props: HandleEventMoveCaptureProps) => TouchEventHandler<HTMLDivElement> =
  ({ model, method, recordGesture, check, tabState }) =>
  (e) => {
    if (check.isOnGesture()) {
      const { point, layoutState } = model;
      const { setPopUpWindowPosition } = method;
      const { clientX: baseX, clientY: baseY } = point;
      const { clientX: curX, clientY: curY } = e.touches[0];

      const timeGap = performance.now() - layoutState.timeStamp;
      const moveY = curY - baseY;
      const moveX = curX - baseX;

      const isFlicking = check.isFlicking({ moveY, timeGap });

      if (check.isHorizontalMove(moveX) || check.isLongPress(timeGap) || isFlicking) recordGesture.end();

      if (isFlicking === 'moveUp') {
        if (tabState.popUpState === 'half') setPopUpWindowPosition({ to: 'full' });
        if (tabState.popUpState === 'invisible') setPopUpWindowPosition({ to: 'half' });
      }

      if (isFlicking === 'moveDown') {
        if (tabState.popUpState === 'full' && !check.isScrolled(DOMID_BLURFRAME)) {
          setPopUpWindowPosition({ to: 'half' });
        }
        if (tabState.popUpState === 'half') setPopUpWindowPosition({ to: 'invisible' });
      }
    }
  };
export const handleTouchEndCapture: (props: HandleEventEndCaptureProps) => TouchEventHandler<HTMLDivElement> =
  ({ recordGesture }) =>
  () => {
    recordGesture.end();
  };
