import { EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import { TabState } from '@libs/types/infowindow';
import { SlideUpWindowEvent } from '@libs/types/customEvents';
import { DOMID_BLURFRAME } from '@constants/DOM';
import { popUpHeights } from '@constants/popUpHeights';
import { useEffect } from 'react';
import { handleSlideUpWindowForBlurFrame as handleSlideUpWindow } from './eventHandler/slideUpWindow';
import * as S from './style';

interface BlurFrameProps {
  tabState: TabState;
  id: string;
  children: React.ReactNode;
}

function BlurFrame({ tabState, id, children }: BlurFrameProps) {
  const onSlidePopUpWindow = handleSlideUpWindow({ popUpHeights });

  useEffect(() => {
    const elem = document.getElementById(id);
    if (elem !== null) {
      elem.removeEventListener(EVENT_SLIDE_UP_WINDOW, onSlidePopUpWindow);
      elem.addEventListener(EVENT_SLIDE_UP_WINDOW, onSlidePopUpWindow);
    }
  }, []);

  useEffect(() => {
    const slideEvent: SlideUpWindowEvent = Object.assign(new Event(EVENT_SLIDE_UP_WINDOW), {
      currentTop: tabState.top,
    });
    document.getElementById(DOMID_BLURFRAME)?.dispatchEvent(slideEvent);
  }, [tabState]);

  return (
    <S.Wrapper id={id} popUpState={tabState.popUpState}>
      {children}
    </S.Wrapper>
  );
}
export default BlurFrame;
