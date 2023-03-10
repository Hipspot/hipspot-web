import { useEffect, ReactNode, useRef } from 'react';
import { VscGrabber } from 'react-icons/vsc';
import { useSetRecoilState } from 'recoil';
import { tabStateAtom } from '@states/infoWindow';
import { HandleEventEndProps, HandleEventMoveProps, HandleEventStartProps, TabState } from '@libs/types/infowindow';
import useCameraMove from '@components/MapComp/hooks/useCameraMove';
import { handleMouseDown, handleMouseMove, handleMouseUp } from './eventHandler/mouse';
import { handleTouchEnd, handleTouchMove, handleTouchStart } from './eventHandler/touch';
import * as S from './style';
import smoothMove from './utils/smoothMove';

export interface PopUpWindowProps {
  id: string;
  children: ReactNode;
  tabState: TabState;
  available: boolean;
}

function PopUpWindow({ id, children, tabState, available }: PopUpWindowProps) {
  const smoothLoopId: { id: number } = { id: -1 };
  const setTabState = useSetRecoilState(tabStateAtom);
  const { flyToPrev } = useCameraMove();
  const modifyRef = useRef<number>(0);
  const topCoordRef = useRef<number>(window.innerHeight - 30);

  const eventStartProp: HandleEventStartProps = {
    smoothLoopId,
    modifyRef,
    available,
    setTabState,
  };
  const eventMoveProp: HandleEventMoveProps = { tabState, modifyRef, topCoordRef, available };
  const eventEndProp: HandleEventEndProps = { endCameraMove: flyToPrev, setTabState, tabState, topCoordRef };

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
