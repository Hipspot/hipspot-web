import { MouseEventHandler } from 'react';
import { HandleEventEndProps, HandleEventMoveProps, HandleEventStartProps, TabState } from '@libs/types/infowindow';
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';

export const handleMouseDown: (eventStartProps: HandleEventStartProps) => MouseEventHandler<HTMLDivElement> =
  ({ setTabState, smoothLoopId, modifyRef }) =>
  (e) => {
    if (smoothLoopId) {
      cancelAnimationFrame(smoothLoopId.id);
    }

    const target = e.target as HTMLDivElement;
    target.style.setProperty('padding', 'calc(var(--vh,1vh) * 100) 0');
    target.style.setProperty('transform', 'translateY(-50%)');

    setTabState((prev: TabState) => ({ ...prev, onHandling: true }));

    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain, no-unsafe-optional-chaining, @typescript-eslint/no-non-null-assertion
    modifyRef.current = target.parentElement?.getBoundingClientRect()?.top! - e.clientY;
  };

export const handleMouseMove: (eventMoveProps: HandleEventMoveProps) => MouseEventHandler<HTMLDivElement> =
  ({ topCoordRef, tabState, modifyRef }) =>
  (e) => {
    const { onHandling } = tabState;

    if (onHandling) {
      topCoordRef.current = e.clientY;
      const target = e.target as HTMLDivElement;
      target.parentElement!.style.setProperty('top', `${e.clientY + modifyRef.current}px`);

      const slideEvent: any = new Event('forSlide');
      slideEvent.clientY = e.clientY;
      document.getElementById('slide')?.dispatchEvent(slideEvent);
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
