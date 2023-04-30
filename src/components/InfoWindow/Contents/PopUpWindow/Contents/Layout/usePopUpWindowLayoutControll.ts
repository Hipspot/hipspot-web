import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { tabStateAtom } from '@states/infoWindow';
import useCameraMove from '@components/MapComp/hooks/useCameraMove';
import { PopUpWindowState, UsePopUpWindowLayoutControllResult } from '@libs/types/infowindow';
import { PopUpHeightsType, popUpHeights } from '@constants/popUpHeights';
import { isIOS } from '@libs/utils/userAgent';
import {
  DURATION,
  FLICKING_DISTANCE,
  FLICKING_TIMEGAP,
  HORIZONTAL_MOVE_DISTANCE,
  LONGPRESS_TIMEGAP,
} from '@constants/interaction';
import { PopUpWindowModel } from '../../utils/model';

/**
 * iosd
 */
const config = {
  duration: DURATION,
  flickingDistance: isIOS ? FLICKING_DISTANCE * 2 : FLICKING_DISTANCE,
  flickingTimeGap: FLICKING_TIMEGAP,
  horizontalMoveDistance: isIOS ? HORIZONTAL_MOVE_DISTANCE * 2 : HORIZONTAL_MOVE_DISTANCE,
  longPressTimeGap: LONGPRESS_TIMEGAP,
};

const model = new PopUpWindowModel();

const usePopUpWindowLayoutControll: () => UsePopUpWindowLayoutControllResult = () => {
  const [tabState, setTabState] = useRecoilState(tabStateAtom);
  const { flyToPrev } = useCameraMove();

  /**
   * Layout 컨트롤을 위해 필요한 값을 저장하기 위해 사용하는 메서드
   *
   */

  const recordGesture = useMemo(
    () => ({
      start: ({ clientX, clientY, timeStamp }: { clientX: number; clientY: number; timeStamp: number }) => {
        model.update('point', { clientX, clientY });
        model.update('layoutState', { timeStamp, onGesture: true });
      },
      end: () => {
        model.update('point', { clientX: 0, clientY: 0 });
        model.update('layoutState', { onGesture: false, timeStamp: 0 });
      },
    }),
    []
  );

  const recordCurrentTop = (top: number) => {
    model.update('position', { top });
  };

  /**
   * Layout을 움직이는 함수
   * @param from :
   */
  const setPopUpWindowPosition = ({ to }: { to: PopUpWindowState }) => {
    const startTop = model.position.top;
    if (to === 'half')
      setTabState((prev) => ({ ...prev, top: popUpHeights[PopUpHeightsType.middle], popUpState: to, startTop }));
    if (to === 'full')
      setTabState((prev) => ({ ...prev, top: popUpHeights[PopUpHeightsType.top], popUpState: to, startTop }));
    if (to === 'invisible') {
      setTabState((prev) => ({ ...prev, top: popUpHeights[PopUpHeightsType.bottom], popUpState: to, startTop }));
      flyToPrev();
    }
  };

  /**
   * 이벤트를 확인하는 함수
   *
   */
  const check = useMemo(() => {
    const { horizontalMoveDistance, longPressTimeGap, flickingDistance, flickingTimeGap } = config;
    return {
      isHorizontalMove: (moveX: number) => moveX < -horizontalMoveDistance || moveX > horizontalMoveDistance,
      isLongPress: (timeGap: number) => timeGap > longPressTimeGap,
      isFlicking: ({ moveY, timeGap }: { moveY: number; timeGap: number }) => {
        if (moveY < -flickingDistance && timeGap < flickingTimeGap) return 'moveUp';
        if (moveY > flickingDistance && timeGap < flickingTimeGap) return 'moveDown';
        return false;
      },
      isOnGesture: () => model.layoutState.onGesture,
      isScrolled: (DOMID: string) => document.getElementById(DOMID)!.scrollTop > 0,
    };
  }, []);

  const method = useMemo(
    () => ({
      recordCurrentTop,
      setPopUpWindowPosition,
    }),
    [tabState]
  );

  return {
    model,
    recordGesture,
    method,
    check,
    tabState,
  };
};
export default usePopUpWindowLayoutControll;
