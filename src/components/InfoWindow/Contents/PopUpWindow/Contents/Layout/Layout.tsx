import { useEffect, ReactNode } from 'react';
import {
  HandleEventEndCaptureProps,
  HandleEventMoveCaptureProps,
  HandleEventStartCaptureProps,
  PopUpWindowScopeProps,
  TabState,
} from '@libs/types/infowindow';
import { VscGrabber } from 'react-icons/vsc';
import { DOMID_POP_UP_WINDOW, DOMTargetList } from '@constants/DOM';
import * as S from '../../style';
import smoothMove from '../../utils/smoothMove';
import {
  handleMouseDownCapture,
  handleMouseMoveCapture,
  handleMouseOutCapture,
  handleMouseUpCapture,
} from './eventHandler/mouse';
import { handleTouchEndCapture, handleTouchMoveCapture, handleTouchStartCapture } from './eventHandler/touch';
import usePopUpWindowLayoutControll from './usePopUpWindowLayoutControll';

export interface PopUpWindowLayoutProps {
  id: string;
  children: ReactNode;
  tabState: TabState;
}

function Layout({ id, children, tabState, smoothLoopId }: PopUpWindowLayoutProps & PopUpWindowScopeProps) {
  const { refs, setPopUpWindowPosition, setUp, check } = usePopUpWindowLayoutControll();

  const eventStartProp: HandleEventStartCaptureProps = {
    setUp,
  };

  const eventMoveProp: HandleEventMoveCaptureProps = { refs, setUp, setPopUpWindowPosition, check, tabState };
  const eventEndProp: HandleEventEndCaptureProps = { setUp, check };

  const onMouseDownCapture = handleMouseDownCapture(eventStartProp);
  const onMouseMoveCapture = handleMouseMoveCapture(eventMoveProp);
  const onMouseUpCapture = handleMouseUpCapture(eventEndProp);
  const onMouseOutCapture = handleMouseOutCapture(eventEndProp);
  const onTouchMoveCapture = handleTouchMoveCapture(eventMoveProp);
  const onTouchStartCapture = handleTouchStartCapture(eventStartProp);
  const onTouchEndCapture = handleTouchEndCapture(eventEndProp);

  useEffect(() => {
    smoothMove({
      startY: refs.positionRef.current.top,
      parentElement: document.getElementById(id) as HTMLDivElement,
      endPointTabState: tabState,
      smoothLoopId,
    });
  }, [tabState]);

  useEffect(() => {
    const elem = document.getElementById(id);
    if (elem !== null) {
      DOMTargetList[DOMID_POP_UP_WINDOW] = document.getElementById(DOMID_POP_UP_WINDOW);
      elem.style.setProperty('transform', `translate(calc(50vw - 50%), 100%)`);
    }
  }, []);

  return (
    <S.Layout
      id={id}
      tabState={tabState}
      onMouseDownCapture={onMouseDownCapture}
      onMouseMoveCapture={onMouseMoveCapture}
      onMouseUpCapture={onMouseUpCapture}
      onMouseOutCapture={onMouseOutCapture}
      onTouchStartCapture={onTouchStartCapture}
      onTouchMoveCapture={onTouchMoveCapture}
      onTouchEndCapture={onTouchEndCapture}
    >
      <S.Wrapper>
        <S.ResizeSideStyle>
          <VscGrabber />
        </S.ResizeSideStyle>
        {children}
      </S.Wrapper>
    </S.Layout>
  );
}

export default Layout;
