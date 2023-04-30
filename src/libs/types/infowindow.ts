import { PopUpWindowModel } from '@components/InfoWindow/Contents/PopUpWindow/utils/model';

export type PopUpWindowState = 'invisible' | 'half' | 'full';

export type PopUpWindowScopeProps = {
  smoothLoopId: { id: number };
};

export interface TabState {
  top: number;
  startTop: number;
  popUpState: PopUpWindowState;
}

export interface CoordState {
  startX: number;
  startY: number;
}

export interface HandleEventStartProps {
  smoothLoopId: { id: number };
  modifyRef: React.MutableRefObject<number>;
  available: boolean;
  model: PopUpWindowModel;
}

export interface HandleEventMoveProps {
  available: boolean;
  modifyRef: React.MutableRefObject<number>;
  topCoordRef: React.MutableRefObject<number>;
  target: { [id in string]: HTMLDivElement | HTMLElement };
  smoothLoopId: { id: number };
  model: PopUpWindowModel;
}

export interface HandleEventEndProps {
  setPopUpWindowPosition: ({ to }: { to: PopUpWindowState }) => void;
  model: PopUpWindowModel;
  tabState: TabState;
  topCoordRef: React.MutableRefObject<number>;
}

export interface HandleEventStartCaptureProps {
  recordGesture: PopUpWindowLayoutSetUpMethod;
}
export interface HandleEventMoveCaptureProps {
  recordGesture: PopUpWindowLayoutSetUpMethod;
  method: PopUpWindowLayoutPositionMethod;
  model: PopUpWindowModel;
  check: PopUpWindowLayoutCheckMethod;
  tabState: TabState;
}
export interface HandleEventEndCaptureProps {
  recordGesture: PopUpWindowLayoutSetUpMethod;
  check: PopUpWindowLayoutCheckMethod;
}

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
  model: PopUpWindowModel;
  check: PopUpWindowLayoutCheckMethod;
  method: PopUpWindowLayoutPositionMethod;
  recordGesture: PopUpWindowLayoutSetUpMethod;
  tabState: TabState;
};
