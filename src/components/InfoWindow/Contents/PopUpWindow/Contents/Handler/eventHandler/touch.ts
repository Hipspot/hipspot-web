import { TouchEventHandler } from 'react';
import modifyInfoWindowTop from '@components/InfoWindow/view/modifyInfoWindowTop';
import {
  HandleEventEndProps,
  HandleEventMoveProps,
  HandleEventStartProps,
  PopUpWindowState,
} from '@libs/types/infowindow';
import { DOMID_BLURFRAME, DOMID_IMAGE_SLIDER } from '@constants/DOM';
import { EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import { createCustomEvent } from '@libs/utils/customEvent';
import { cancelAnimation } from '../../../utils/cancelAnimation';
import domUpdater from '../utils/domUpdater';
import { reactRefUpdate } from '../../../utils/reactRefUpdate';

export const handleTouchStart: (props: HandleEventStartProps) => TouchEventHandler<HTMLDivElement> =
  ({ smoothLoopId, modifyRef, model, available }) =>
  (e) => {
    if (!available) return;
    cancelAnimation(smoothLoopId);
    const target = e.target as HTMLDivElement;

    model.update('layoutState', { onHandling: true });
    domUpdater.touchMouseStart(target);
    const infoWindowElem = target.parentElement as HTMLDivElement;
    const pointedTop = infoWindowElem.getBoundingClientRect().top - e.touches[0].clientY;
    reactRefUpdate({ ref: modifyRef, update: pointedTop });
  };

export const handleTouchMove: (props: HandleEventMoveProps) => TouchEventHandler<HTMLDivElement> =
  ({ model, modifyRef, topCoordRef, available, target, smoothLoopId }) =>
  (e) => {
    const { onHandling } = model.layoutState;
    if (onHandling && available) {
      const currentTop = e.touches[0].clientY + modifyRef.current;

      cancelAnimation(smoothLoopId);
      modifyInfoWindowTop({ currentTop });

      const slideEvent = createCustomEvent(EVENT_SLIDE_UP_WINDOW, { currentTop });
      target[DOMID_IMAGE_SLIDER].dispatchEvent(slideEvent);
      target[DOMID_BLURFRAME].dispatchEvent(slideEvent);

      model.update('position', { top: currentTop });
      reactRefUpdate({ ref: topCoordRef, update: e.touches[0].clientY });
    }
  };

export const handleTouchEnd: (props: HandleEventEndProps) => TouchEventHandler<HTMLDivElement> =
  ({ setPopUpWindowPosition, model, tabState, topCoordRef }) =>
  (e) => {
    const { onHandling } = model.layoutState;
    if (onHandling) {
      const target = e.target as HTMLDivElement;
      const top = topCoordRef.current;
      const h = window.innerHeight;
      const ratio = top / h;

      let handleEndResult: PopUpWindowState = tabState.popUpState;

      if (ratio < 0.3) {
        handleEndResult = 'full';
      } else if (ratio >= 0.3 && ratio < 0.8) {
        handleEndResult = 'half';
      } else {
        handleEndResult = 'invisible';
      }
      model.update('layoutState', { onHandling: false });
      domUpdater.touchMouseEnd(target);
      setPopUpWindowPosition({ to: handleEndResult });
    }
  };
