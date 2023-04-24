import useCameraMove from '@components/MapComp/hooks/useCameraMove';
import { DOMID_BLURFRAME, DOMID_IMAGE_SLIDER, DOMID_POP_UP_WINDOW_HANDLER, DOMTargetList } from '@constants/DOM';
import {
  HandleEventEndProps,
  HandleEventMoveProps,
  HandleEventStartProps,
  PopUpWindowScopeProps,
  TabState,
} from '@libs/types/infowindow';
import { tabStateAtom } from '@states/infoWindow';
import { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { handleMouseDown, handleMouseMove, handleMouseUp } from './eventHandler/mouse';
import { handleTouchEnd, handleTouchMove, handleTouchStart } from './eventHandler/touch';
import * as S from '../../style';

export interface PopUpWindowHandlerProps {
  tabState: TabState;
  available: boolean;
}

function Handler({ available, tabState, smoothLoopId }: PopUpWindowHandlerProps & PopUpWindowScopeProps) {
  const setTabState = useSetRecoilState(tabStateAtom);
  const { flyToPrev } = useCameraMove();
  const modifyRef = useRef<number>(0);
  const topCoordRef = useRef<number>(window.innerHeight - 30);
  const target = {
    [DOMID_IMAGE_SLIDER]: DOMTargetList[DOMID_IMAGE_SLIDER]!,
    [DOMID_BLURFRAME]: DOMTargetList[DOMID_BLURFRAME]!,
  };

  const eventStartProp: HandleEventStartProps = {
    smoothLoopId,
    modifyRef,
    available,
    setTabState,
  };

  const eventMoveProp: HandleEventMoveProps = { tabState, modifyRef, topCoordRef, available, target, smoothLoopId };
  const eventEndProp: HandleEventEndProps = { endCameraMove: flyToPrev, setTabState, tabState, topCoordRef };

  const onMouseDown = handleMouseDown(eventStartProp);
  const onTouchStart = handleTouchStart(eventStartProp);
  const onMouseMove = handleMouseMove(eventMoveProp);
  const onTouchMove = handleTouchMove(eventMoveProp);
  const onMouseUp = handleMouseUp(eventEndProp);
  const onTouchEnd = handleTouchEnd(eventEndProp);
  const onMouseOut = handleMouseUp(eventEndProp);

  return (
    <S.ResizeSide
      id={DOMID_POP_UP_WINDOW_HANDLER}
      tabState={tabState}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseOut}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    />
  );
}
export default Handler;
