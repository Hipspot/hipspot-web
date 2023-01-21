import React, { useEffect, ReactNode, useRef } from 'react';
import { VscGrabber } from 'react-icons/vsc';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { cameraStateAtom, tabStateAtom } from '@recoil/infoWindowState';
import { HandleEventEndProps, HandleEventMoveProps, HandleEventStartProps, TabState } from '@libs/types/infowindow';
import { handleMouseDown, handleMouseMove, handleMouseUp } from './eventHandler/mouse';
import { handleTouchEnd, handleTouchMove, handleTouchStart } from './eventHandler/touch';
import * as S from './style';
import smoothMove from './utils/smoothMove';

export interface PopUpWindowProps {
  id: string;
  tabState: TabState;
  children: ReactNode;
  smoothLoopId: { id: number };
}

function PopUpWindow({ id, tabState, children, smoothLoopId }: PopUpWindowProps) {
  const setTabState = useSetRecoilState(tabStateAtom);
  const [cameraState, setCameraState] = useRecoilState(cameraStateAtom);
  const modifyRef = useRef<number>(0);
  const topCoordRef = useRef<number>(window.innerHeight - 30);

  const eventStartProp: HandleEventStartProps = { setTabState, smoothLoopId, modifyRef };
  const eventMoveProp: HandleEventMoveProps = { tabState, modifyRef, topCoordRef };
  const eventEndProp: HandleEventEndProps = { setTabState, setCameraState, cameraState, tabState, topCoordRef };

  const onMouseDown = handleMouseDown(eventStartProp);
  const onTouchStart = handleTouchStart(eventStartProp);
  const onMouseMove = handleMouseMove(eventMoveProp);
  const onTouchMove = handleTouchMove(eventMoveProp);
  const onMouseUp = handleMouseUp(eventEndProp);
  const onTouchEnd = handleTouchEnd(eventEndProp);
  const onMouseOut = handleMouseUp(eventEndProp);

  useEffect(() => {
    smoothMove({
      parentElement: document.getElementById(id) as HTMLDivElement,
      endPointTabState: tabState,
      smoothLoopId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabState]);

  return (
    <S.Layout id={id} tabState={tabState}>
      <S.Wrapper>{children}</S.Wrapper>
      <S.ResizeSideStyle>
        <VscGrabber />
      </S.ResizeSideStyle>
      <S.ResizeSide
        tabState={tabState}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
      />
    </S.Layout>
  );
}

export default PopUpWindow;
