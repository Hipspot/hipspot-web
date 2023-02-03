import { EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import { PopUpWindowState } from '@libs/types/infowindow';
import { popUpHeights } from '@constants/popUpHeights';
import { useEffect } from 'react';
import { handleSlideUpWindowForBlurFrame as handleSlideUpWindow } from './eventHandler/slideUpWindow';
import * as S from './style';

interface BlurFrameProps {
  popUpState: PopUpWindowState;
  id: string;
  children: React.ReactNode;
}

function BlurFrame({ popUpState, id, children }: BlurFrameProps) {
  const onSlidePopUpWindow = handleSlideUpWindow({ popUpHeights });

  useEffect(() => {
    const elem = document.getElementById(id);
    if (elem !== null) {
      elem.removeEventListener(EVENT_SLIDE_UP_WINDOW, onSlidePopUpWindow);
      elem.addEventListener(EVENT_SLIDE_UP_WINDOW, onSlidePopUpWindow);
    }
  }, []);
  return (
    <S.Wrapper id={id} popUpState={popUpState}>
      {children}
    </S.Wrapper>
  );
}
export default BlurFrame;
