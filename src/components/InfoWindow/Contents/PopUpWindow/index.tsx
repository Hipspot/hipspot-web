import { useEffect, ReactNode, useRef } from 'react';
import { VscGrabber } from 'react-icons/vsc';
import { useSetRecoilState } from 'recoil';
import { tabStateAtom } from '@states/infoWindow';
import { HandleEventEndProps, HandleEventMoveProps, HandleEventStartProps, TabState } from '@libs/types/infowindow';
import useCameraMove from '@components/MapComp/hooks/useCameraMove';
import { CancelIcon } from '@assets/index';
import { PopUpHeightsType, popUpHeights } from '@constants/popUpHeights';
import { handleMouseDown, handleMouseMove, handleMouseUp } from './eventHandler/mouse';
import { handleTouchEnd, handleTouchMove, handleTouchStart } from './eventHandler/touch';
import * as S from './style';
import smoothMove from './utils/smoothMove';

export interface PopUpWindowProps {
  id: string;
  children: ReactNode;
  tabState: TabState;
}

export interface PopUpWindowHandlerProps {
  tabState: TabState;
  available: boolean;
}

const PopUpWindowScope: { smoothLoopId: { id: number } } = {
  smoothLoopId: { id: -1 },
};

const PopUpWindow = {
  Layout,
  Handler,
  CloseButton,
};
export default PopUpWindow;

function Layout({ id, children, tabState }: PopUpWindowProps) {
  useEffect(() => {
    smoothMove({
      parentElement: document.getElementById(id) as HTMLDivElement,
      endPointTabState: tabState,
      smoothLoopId: PopUpWindowScope.smoothLoopId,
    });
  }, [tabState]);

  return (
    <S.Layout id={id} tabState={tabState}>
      <S.Wrapper>
        <S.ResizeSideStyle>
          <VscGrabber />
        </S.ResizeSideStyle>
        {children}
      </S.Wrapper>
    </S.Layout>
  );
}

function Handler({ available, tabState }: PopUpWindowHandlerProps) {
  const { smoothLoopId } = PopUpWindowScope;
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

  return (
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
  );
}

function CloseButton() {
  const setTabState = useSetRecoilState(tabStateAtom);
  const { flyToPrev } = useCameraMove();
  return (
    <S.Icon
      data-testid="close_button"
      onClick={(e) => {
        e.stopPropagation();
        setTabState({ top: popUpHeights[PopUpHeightsType.bottom], onHandling: false, popUpState: 'invisible' });
        flyToPrev();
      }}
    >
      <CancelIcon />
    </S.Icon>
  );
}
