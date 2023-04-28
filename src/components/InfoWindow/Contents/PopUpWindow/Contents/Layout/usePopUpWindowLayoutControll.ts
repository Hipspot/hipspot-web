import { useMemo, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { tabStateAtom } from '@states/infoWindow';
import useCameraMove from '@components/MapComp/hooks/useCameraMove';
import { PopUpWindowState, UsePopUpWindowLayoutControllResult } from '@libs/types/infowindow';
import { PopUpHeightsType, popUpHeights } from '@constants/popUpHeights';
import {
  FLICKING_DISTANCE,
  FLICKING_TIMEGAP,
  HORIZONTAL_MOVE_DISTANCE,
  LONGPRESS_TIMEGAP,
} from '@constants/interaction';
import { reactRefUpdate } from '../../utils/reactRefUpdate';

const usePopUpWindowLayoutControll: () => UsePopUpWindowLayoutControllResult = () => {
  const [tabState, setTabState] = useRecoilState(tabStateAtom);
  const { flyToPrev } = useCameraMove();
  const positionRef = useRef<{ top: number }>({ top: 0 });
  const layoutStateRef = useRef<{ onHandling: boolean; timeStamp: number }>({ onHandling: false, timeStamp: 0 });
  const pointRef = useRef<{ clientX: number; clientY: number }>({ clientX: 0, clientY: 0 });

  /**
   * popUpWindow Layout에 필요한 Ref들을 모아둔 객체
   */
  const refs = useMemo(
    () => ({
      layoutStateRef,
      pointRef,
      positionRef,
    }),
    []
  );

  /**
   * Layout 컨트롤을 위해 필요한 값을 저장하기 위해 사용하는 메서드
   *
   */

  const setUp = useMemo(
    () => ({
      start: ({ clientX, clientY, timeStamp }: { clientX: number; clientY: number; timeStamp: number }) => {
        reactRefUpdate({ ref: pointRef, update: { clientX, clientY } });
        reactRefUpdate({ ref: layoutStateRef, update: { timeStamp, onHandling: true } });
      },
      end: () => {
        reactRefUpdate({ ref: pointRef, update: { clientX: 0, clientY: 0 } });
        reactRefUpdate({ ref: layoutStateRef, update: { onHandling: false, timeStamp: 0 } });
        reactRefUpdate({ ref: positionRef, update: { top: popUpHeights[tabState.popUpState] } });
      },
    }),
    [tabState]
  );

  /**
   * Layout을 움직이는 함수
   * @param from :
   */
  const setPopUpWindowPosition = ({ to }: { to: PopUpWindowState }) => {
    setUp.end();
    if (to === 'half') setTabState((prev) => ({ ...prev, top: popUpHeights[PopUpHeightsType.middle], popUpState: to }));
    if (to === 'full') setTabState((prev) => ({ ...prev, top: popUpHeights[PopUpHeightsType.top], popUpState: to }));
    if (to === 'invisible') {
      setTabState((prev) => ({ ...prev, top: popUpHeights[PopUpHeightsType.bottom], popUpState: to }));
      flyToPrev();
    }
  };

  /**
   * 이벤트를 확인하는 함수
   *
   */
  const check = useMemo(
    () => ({
      isHorizontalMove: (moveX: number) => moveX < -HORIZONTAL_MOVE_DISTANCE || moveX > HORIZONTAL_MOVE_DISTANCE,
      isLongPress: (timeGap: number) => timeGap > LONGPRESS_TIMEGAP,
      isFlicking: ({ moveY, timeGap }: { moveY: number; timeGap: number }) => {
        if (moveY < -FLICKING_DISTANCE && timeGap < FLICKING_TIMEGAP) return 'moveUp';
        if (moveY > FLICKING_DISTANCE && timeGap < FLICKING_TIMEGAP) return 'moveDown';
        return false;
      },
      isOnHandling: () => layoutStateRef.current.onHandling,
    }),
    []
  );

  return {
    refs,
    setUp,
    setPopUpWindowPosition,
    check,
    tabState,
  };
};
export default usePopUpWindowLayoutControll;
