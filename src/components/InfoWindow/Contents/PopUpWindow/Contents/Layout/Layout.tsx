import { useEffect, ReactNode, useRef } from 'react';
import {
  HandleEventEndCaptureProps,
  HandleEventMoveCaptureProps,
  HandleEventStartCaptureProps,
  PopUpWindowScopeProps,
  TabState,
} from '@libs/types/infowindow';
import { VscGrabber } from 'react-icons/vsc';
import { useSetRecoilState } from 'recoil';
import { tabStateAtom } from '@states/infoWindow';
import * as S from '../../style';
import smoothMove from '../../utils/smoothMove';
import {
  handleMouseDownCapture,
  handleMouseMoveCapture,
  handleMouseOutCapture,
  handleMouseUpCapture,
} from './eventHandler/mouse';
import { handleTouchMoveCapture, handleTouchStartCapture } from './eventHandler/touch';

export interface PopUpWindowLayoutProps {
  id: string;
  children: ReactNode;
  tabState: TabState;
}

function Layout({ id, children, tabState, smoothLoopId }: PopUpWindowLayoutProps & PopUpWindowScopeProps) {
  const setTabState = useSetRecoilState(tabStateAtom);
  const layoutStateRef = useRef<{ onHandling: boolean; timeStamp: number }>({ onHandling: false, timeStamp: 0 });
  const pointRef = useRef<{ clientX: number; clientY: number }>({ clientX: 0, clientY: 0 });

  const eventStartProp: HandleEventStartCaptureProps = {
    pointRef,
    layoutStateRef,
  };

  const eventMoveProp: HandleEventMoveCaptureProps = { pointRef, layoutStateRef, setTabState, tabState };
  const eventEndProp: HandleEventEndCaptureProps = { pointRef, layoutStateRef };

  const onMouseDownCapture = handleMouseDownCapture(eventStartProp);
  const onTouchStartCapture = handleTouchStartCapture(eventStartProp);
  const onMouseMoveCapture = handleMouseMoveCapture(eventMoveProp);
  const onTouchMoveCapture = handleTouchMoveCapture(eventMoveProp);
  const onMouseUpCapture = handleMouseUpCapture(eventEndProp);
  const onMouseOutCapture = handleMouseOutCapture(eventEndProp);

  useEffect(() => {
    smoothMove({
      parentElement: document.getElementById(id) as HTMLDivElement,
      endPointTabState: tabState,
      smoothLoopId,
    });
  }, [tabState]);

  useEffect(() => {
    const elem = document.getElementById(id);
    if (elem !== null) {
      elem.style.setProperty('transform', `translate(calc(50vw - 50%), 100%)`);
    }
  }, []);

  return (
    <S.Layout
      id={id}
      tabState={tabState}
      onMouseDownCapture={onMouseDownCapture}
      onTouchStartCapture={onTouchStartCapture}
      onMouseMoveCapture={onMouseMoveCapture}
      onTouchMoveCapture={onTouchMoveCapture}
      onMouseUpCapture={onMouseUpCapture}
      // onTouchEndCapture={onTouchEndCapture}
      onMouseOutCapture={onMouseOutCapture}
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
