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
  endCameraMove: () => void;
  setTabState: SetterOrUpdater<TabState>;
  tabState: TabState;
  topCoordRef: React.MutableRefObject<number>;
}

export interface HandleEventStartProps {
  setTabState: SetterOrUpdater<TabState>;
  smoothLoopId: { id: number };
  modifyRef: React.MutableRefObject<number>;
  available: boolean;
}

export interface HandleEventMoveProps {
  available: boolean;
  tabState: TabState;
  modifyRef: React.MutableRefObject<number>;
  topCoordRef: React.MutableRefObject<number>;
}
