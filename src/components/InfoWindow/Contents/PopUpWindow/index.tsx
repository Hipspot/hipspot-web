import { PopUpWindowScopeProps } from '@libs/types/infowindow';
import Layout, { PopUpWindowLayoutProps } from './Contents/Layout/Layout';
import Handler, { PopUpWindowHandlerProps } from './Contents/Handler/Handler';
import CloseButton from './Contents/CloseButton/CloseButton';

/**
 * PopUpWindow 컴포넌트에서만 사용되는 변수들을 모아둔 객체
 */
const PopUpWindowScope: PopUpWindowScopeProps = {
  smoothLoopId: { id: -1 },
};

/**
 * PopUpWindow 컴포넌트에서 사용되는 컴포넌트들을 모아둔 객체
 *
 * Layout : PopUpWindow의 레이아웃을 담당하는 컴포넌트, 내용을 담는 컨테이너
 * Handler : PopUpWindow를 위아래로 스와이프 할 수 있는 핸들러를 담당하는 컴포넌트, 마우스 이벤트, 터치 이벤트
 * CloseButton : PopUpWindow를 닫을 수 있는 버튼을 담당하는 컴포넌트
 */
const PopUpWindow = {
  Layout: (props: PopUpWindowLayoutProps) => Layout({ ...props, ...PopUpWindowScope }),
  Handler: (props: PopUpWindowHandlerProps) => Handler({ ...props, ...PopUpWindowScope }),
  CloseButton,
};
export default PopUpWindow;
