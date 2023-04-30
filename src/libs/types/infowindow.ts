import { SetterOrUpdater } from 'recoil';

export type PopUpWindowState = 'invisible' | 'half' | 'full';

export type PopUpWindowScopeProps = {
  smoothLoopId: { id: number };
};

export interface TabState {
  onHandling: boolean;
  top: number;
  startTop: number;
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
  recordGesture: PopUpWindowLayoutSetUpMethod;
}
export interface HandleEventMoveCaptureProps {
  recordGesture: PopUpWindowLayoutSetUpMethod;
  method: PopUpWindowLayoutPositionMethod;
  model: PopUpWindowLayoutModel;
  check: PopUpWindowLayoutCheckMethod;
  tabState: TabState;
}
export interface HandleEventEndCaptureProps {
  recordGesture: PopUpWindowLayoutSetUpMethod;
  check: PopUpWindowLayoutCheckMethod;
}

export type PopUpWindowLayoutModel = {
  layoutState: { onGesture: boolean; timeStamp: number };
  point: { clientX: number; clientY: number };
  position: { top: number };
};

export type PopUpWindowLayoutSetUpMethod = {
  start: ({ clientX, clientY, timeStamp }: { clientX: number; clientY: number; timeStamp: number }) => void;
  end: () => void;
};
export type PopUpWindowLayoutPositionMethod = {
  setPopUpWindowPosition: ({ to }: { to: PopUpWindowState }) => void;
  recordCurrentTop: (top: number) => void;
};

export type PopUpWindowLayoutCheckMethod = {
  isHorizontalMove: (moveX: number) => boolean;
  isLongPress: (timeGap: number) => boolean;
  isFlicking: ({ moveY, timeGap }: { moveY: number; timeGap: number }) => 'moveUp' | 'moveDown' | false;
  isOnGesture: () => boolean;
  isScrolled: (DOMID: string) => boolean;
};

export type UsePopUpWindowLayoutControllResult = {
  model: PopUpWindowLayoutModel;
  check: PopUpWindowLayoutCheckMethod;
  method: PopUpWindowLayoutPositionMethod;
  recordGesture: PopUpWindowLayoutSetUpMethod;
  tabState: TabState;
};
