import { SetterOrUpdater } from 'recoil';

export type PopUpWindowState = 'invisible' | 'half' | 'full';
export type PopUpWindowScopeProps = {
  smoothLoopId: { id: number };
};

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
  target: { [id in string]: HTMLDivElement | HTMLElement };
  smoothLoopId: { id: number };
}

export interface HandleEventStartCaptureProps {
  pointRef: React.MutableRefObject<{ clientX: number; clientY: number }>;
  layoutStateRef: React.MutableRefObject<{ onHandling: boolean; timeStamp: number }>;
}
export interface HandleEventMoveCaptureProps {
  pointRef: React.MutableRefObject<{ clientX: number; clientY: number }>;
  layoutStateRef: React.MutableRefObject<{ onHandling: boolean; timeStamp: number }>;
  setTabState: SetterOrUpdater<TabState>;
  tabState: TabState;
}
export interface HandleEventEndCaptureProps {
  pointRef: React.MutableRefObject<{ clientX: number; clientY: number }>;
  layoutStateRef: React.MutableRefObject<{ onHandling: boolean; timeStamp: number }>;
}
