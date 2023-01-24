import { TouchEventHandler } from 'react';
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import { TabState, HandleEventEndProps, HandleEventMoveProps, HandleEventStartProps } from '@libs/types/infowindow';
import { reactRefUpdate } from '../utils/reactRefUpdate';
import { cancelAnimation } from '../utils/cancelAnimation';

export const handleTouchStart: (props: HandleEventStartProps) => TouchEventHandler<HTMLDivElement> =
  ({ smoothLoopId, modifyRef, setTabState }) =>
  (e) => {
    cancelAnimation(smoothLoopId);

    const target = e.target as HTMLDivElement;
    setTabState((prev: TabState) => ({ ...prev, onHandling: true }));
    target.style.setProperty('padding', 'calc(var(--vh,1vh) * 100) 0');
    target.style.setProperty('transform', 'translateY(-50%)');

    const infoWindowElem = target.parentElement as HTMLDivElement;
    const pointedTop = infoWindowElem.getBoundingClientRect().top - e.touches[0].clientY;
    reactRefUpdate({ ref: modifyRef, update: pointedTop });
  };

export const handleTouchMove: (props: HandleEventMoveProps) => TouchEventHandler<HTMLDivElement> =
  ({ tabState, modifyRef, topCoordRef }) =>
  (e) => {
    const { onHandling } = tabState;
    if (onHandling) {
      reactRefUpdate({ ref: topCoordRef, update: e.touches[0].clientY });

      const target = e.target as HTMLDivElement;
      const infoWindowElem = target.parentElement as HTMLDivElement;
      infoWindowElem.style.setProperty('top', `${e.touches[0].clientY + modifyRef.current}px`);

      const slideEvent: Event = Object.assign(new Event('forSlide'), { clientY: e.touches[0].clientY });
      document.getElementById('slide')?.dispatchEvent(slideEvent);
    }
  };

export const handleTouchEnd: (props: HandleEventEndProps) => TouchEventHandler<HTMLDivElement> =
  ({ setCameraState, cameraState, tabState, setTabState, topCoordRef }) =>
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
