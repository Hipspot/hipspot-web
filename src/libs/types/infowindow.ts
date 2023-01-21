import { CameraStateType } from '@recoil/infoWindowState';
import { SetterOrUpdater } from 'recoil';

export type PopUpWindowState = 'thumbNail' | 'half' | 'full';

export interface TabState {
  onHandling: boolean;
  top: number;
  popUpState: PopUpWindowState;
}

export interface CoordState {
  startX: number;
  startY: number;
}

export interface HandleEventEndProps {
  setCameraState: SetterOrUpdater<CameraStateType>;
  setTabState: SetterOrUpdater<TabState>;
  cameraState: CameraStateType;
  tabState: TabState;
  topCoordRef: React.MutableRefObject<number>;
}

export interface HandleEventStartProps {
  setTabState: SetterOrUpdater<TabState>;
  smoothLoopId: { id: number };
  modifyRef: React.MutableRefObject<number>;
}

export interface HandleEventMoveProps {
  tabState: TabState;
  modifyRef: React.MutableRefObject<number>;
  topCoordRef: React.MutableRefObject<number>;
}
