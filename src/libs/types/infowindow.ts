import { MutableRefObject } from 'react';
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
  setUp: PopUpWindowLayOutSetUpMethod;
}
export interface HandleEventMoveCaptureProps {
  setUp: PopUpWindowLayOutSetUpMethod;
  action: PopUpWindowLayOutActionMethod;
  state: PopUpWindowLayOutStates;
  check: PopUpWindowLayOutCheckMethod;
}
export interface HandleEventEndCaptureProps {
  setUp: PopUpWindowLayOutSetUpMethod;
  check: PopUpWindowLayOutCheckMethod;
}

export type PopUpWindowLayOutStates = {
  layoutStateRef: MutableRefObject<{ onHandling: boolean; timeStamp: number }>;
  pointRef: MutableRefObject<{ clientX: number; clientY: number }>;
  tabState: TabState;
};

export type PopUpWindowLayOutSetUpMethod = {
  start: ({ clientX, clientY, timeStamp }: { clientX: number; clientY: number; timeStamp: number }) => void;
  end: () => void;
};
export type PopUpWindowLayOutActionMethod = ({ from, to }: { from: PopUpWindowState; to: PopUpWindowState }) => void;

export type PopUpWindowLayOutCheckMethod = {
  isHorizontalMove: (moveX: number) => boolean;
  isLongPress: (timeGap: number) => boolean;
  isFlicking: ({ moveY, timeGap }: { moveY: number; timeGap: number }) => 'moveUp' | 'moveDown' | false;
  isOnHandling: () => boolean;
};

export type UsePopUpWindowLayoutControllResult = {
  state: PopUpWindowLayOutStates;
  check: PopUpWindowLayOutCheckMethod;
  action: PopUpWindowLayOutActionMethod;
  setUp: PopUpWindowLayOutSetUpMethod;
};
