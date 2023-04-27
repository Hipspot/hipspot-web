import { useCallback, useMemo, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { tabStateAtom } from '@states/infoWindow';
import { PopUpWindowState, UsePopUpWindowLayoutControllResult } from '@libs/types/infowindow';
import { PopUpHeightsType, popUpHeights } from '@constants/popUpHeights';
import { reactRefUpdate } from '../../utils/reactRefUpdate';

const usePopUpWindowLayoutControll: () => UsePopUpWindowLayoutControllResult = () => {
  const [tabState, setTabState] = useRecoilState(tabStateAtom);
  const layoutStateRef = useRef<{ onHandling: boolean; timeStamp: number }>({ onHandling: false, timeStamp: 0 });
  const pointRef = useRef<{ clientX: number; clientY: number }>({ clientX: 0, clientY: 0 });

  /**
   *
   */
  const state = {
    layoutStateRef,
    pointRef,
    tabState,
  };

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
      },
    }),
    []
  );

  /**
   * Layout을 움직이는 함수
   *
   */
  const action = useCallback(({ from, to }: { from: PopUpWindowState; to: PopUpWindowState }) => {
    if (from === 'full' && to === 'half')
      setTabState((prev) => ({ ...prev, top: popUpHeights[PopUpHeightsType.middle], popUpState: to }));
    if (from === 'invisible' && to === 'half')
      setTabState((prev) => ({ ...prev, top: popUpHeights[PopUpHeightsType.middle], popUpState: to }));
    if (from === 'half' && to === 'full')
      setTabState((prev) => ({ ...prev, top: popUpHeights[PopUpHeightsType.top], popUpState: to }));
    if (from === 'half' && to === 'invisible')
      setTabState((prev) => ({ ...prev, top: popUpHeights[PopUpHeightsType.bottom], popUpState: to }));

    setUp.end();
  }, []);

  /**
   * 각 이벤트를 확인하는 함수
   *
   */
  const check = useMemo(
    () => ({
      isHorizontalMove: (moveX: number) => moveX < -20 || moveX > 20,
      isLongPress: (timeGap: number) => timeGap > 150,
      isFlicking: ({ moveY, timeGap }: { moveY: number; timeGap: number }) => {
        if (moveY < -50 && timeGap < 150) return 'moveUp';
        if (moveY > 50 && timeGap < 150) return 'moveDown';
        return false;
      },
      isOnHandling: () => layoutStateRef.current.onHandling,
    }),
    []
  );

  return {
    state,
    setUp,
    action,
    check,
  };
};
export default usePopUpWindowLayoutControll;
