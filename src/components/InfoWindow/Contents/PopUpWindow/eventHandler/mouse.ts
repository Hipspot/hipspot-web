import { MouseEventHandler } from 'react';
import { HandleEventEndProps, HandleEventMoveProps, HandleEventStartProps, TabState } from '@libs/types/infowindow';
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import { DOMID_BLURFRAME, DOMID_IMAGE_SLIDER } from '@constants/DOM';
import { EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import modifyInfoWindowTop from '@components/InfoWindow/view/modifyInfoWindowTop';
import { SlideUpWindowEvent } from '@libs/types/customEvents';
import { cancelAnimation } from '../utils/cancelAnimation';
import { reactRefUpdate } from '../utils/reactRefUpdate';
import domUpdater from '../utils/domUpdater';

export const handleMouseDown: (eventStartProps: HandleEventStartProps) => MouseEventHandler<HTMLDivElement> =
  ({ setTabState, smoothLoopId, modifyRef, available }) =>
  (e) => {
    if (!available) return;

    cancelAnimation(smoothLoopId);
    const target = e.target as HTMLDivElement;

    setTabState((prev: TabState) => ({ ...prev, onHandling: true }));
    domUpdater.touchMouseStart(target);
    const infoWindowElem = target.parentElement as HTMLDivElement;
    const pointedTop = infoWindowElem.getBoundingClientRect().top - e.clientY;
    reactRefUpdate({ ref: modifyRef, update: pointedTop });
  };

export const handleMouseMove: (eventMoveProps: HandleEventMoveProps) => MouseEventHandler<HTMLDivElement> =
  ({ topCoordRef, tabState, modifyRef, available }) =>
  (e) => {
    const { onHandling } = tabState;
    if (onHandling && available) {
      const currentTop = e.clientY + modifyRef.current;

      modifyInfoWindowTop({ currentTop });

      const slideEvent: SlideUpWindowEvent = Object.assign(new Event(EVENT_SLIDE_UP_WINDOW), { currentTop });
      document.getElementById(DOMID_IMAGE_SLIDER)?.dispatchEvent(slideEvent);
      document.getElementById(DOMID_BLURFRAME)?.dispatchEvent(slideEvent);

      reactRefUpdate({ ref: topCoordRef, update: e.clientY });
    }
  };

export const handleMouseUp: (eventEndProps: HandleEventEndProps) => MouseEventHandler<HTMLDivElement> =
  ({ endCameraMove, setTabState, tabState, topCoordRef }) =>
  (e) => {
    const { onHandling } = tabState;
    if (onHandling) {
      const target = e.target as HTMLDivElement;
      const top = topCoordRef.current;
      const h = window.innerHeight;
      const ratio = top / h;

      const endPointTabState = { ...tabState, top: topCoordRef.current, onHandling: false };

      if (ratio < 0.3) {
        endPointTabState.top = popUpHeights[PopUpHeightsType.top];
        endPointTabState.popUpState = 'full';
      } else if (ratio >= 0.3 && ratio < 0.8) {
        endPointTabState.top = popUpHeights[PopUpHeightsType.middle];
        endPointTabState.popUpState = 'half';
      } else {
        endPointTabState.top = popUpHeights[PopUpHeightsType.bottom];
        endPointTabState.popUpState = 'invisible';
        endCameraMove();
      }

      domUpdater.touchMouseEnd(target);

      setTabState(endPointTabState);
    }
  };
