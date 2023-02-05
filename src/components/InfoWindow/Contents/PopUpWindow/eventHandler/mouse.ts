import { MouseEventHandler } from 'react';
import { HandleEventEndProps, HandleEventMoveProps, HandleEventStartProps, TabState } from '@libs/types/infowindow';
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import { DOMID_BLURFRAME, DOMID_CAROUSEL } from '@constants/DOM';
import { EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import { SlideUpWindowEvent } from '@libs/types/customEvents';
import { cancelAnimation } from '../utils/cancelAnimation';
import { reactRefUpdate } from '../utils/reactRefUpdate';

export const handleMouseDown: (eventStartProps: HandleEventStartProps) => MouseEventHandler<HTMLDivElement> =
  ({ setTabState, smoothLoopId, modifyRef, available }) =>
  (e) => {
    if (!available) return;

    cancelAnimation(smoothLoopId);

    const target = e.target as HTMLDivElement;
    target.style.setProperty('padding', 'calc(var(--vh,1vh) * 100) 0');
    target.style.setProperty('transform', 'translateY(-50%)');

    setTabState((prev: TabState) => ({ ...prev, onHandling: true }));

    const infoWindowElem = target.parentElement as HTMLDivElement;
    const pointedTop = infoWindowElem.getBoundingClientRect().top - e.clientY;
    reactRefUpdate({ ref: modifyRef, update: pointedTop });
  };

export const handleMouseMove: (eventMoveProps: HandleEventMoveProps) => MouseEventHandler<HTMLDivElement> =
  ({ topCoordRef, tabState, modifyRef, available }) =>
  (e) => {
    const { onHandling } = tabState;

    if (onHandling && available) {
      topCoordRef.current = e.clientY;
      const target = e.target as HTMLDivElement;
      const infoWindowElem = target.parentElement as HTMLDivElement;
      const currentTop = e.clientY + modifyRef.current;

      infoWindowElem.style.setProperty('top', `${currentTop}px`);

      const slideEvent: SlideUpWindowEvent = Object.assign(new Event(EVENT_SLIDE_UP_WINDOW), { currentTop });
      document.getElementById(DOMID_CAROUSEL)?.dispatchEvent(slideEvent);
      document.getElementById(DOMID_BLURFRAME)?.dispatchEvent(slideEvent);
    }
  };

export const handleMouseUp: (eventEndProps: HandleEventEndProps) => MouseEventHandler<HTMLDivElement> =
  ({ setTabState, setCameraState, tabState, cameraState, topCoordRef }) =>
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
        endPointTabState.popUpState = 'thumbNail';
        setCameraState({ ...cameraState, markerClicked: false });
      }

      target.style.setProperty('padding', '0px');
      target.style.removeProperty('transform');

      setTabState(endPointTabState);
    }
  };
