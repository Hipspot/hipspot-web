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
  setUp: PopUpWindowLayoutSetUpMethod;
}
export interface HandleEventMoveCaptureProps {
  setUp: PopUpWindowLayoutSetUpMethod;
  setPopUpWindowPosition: PopUpWindowLayoutPositionMethod;
  refs: PopUpWindowLayoutRefs;
  check: PopUpWindowLayoutCheckMethod;
  tabState: TabState;
}
export interface HandleEventEndCaptureProps {
  setUp: PopUpWindowLayoutSetUpMethod;
  check: PopUpWindowLayoutCheckMethod;
}

export type PopUpWindowLayoutRefs = {
  layoutStateRef: MutableRefObject<{ onHandling: boolean; timeStamp: number }>;
  pointRef: MutableRefObject<{ clientX: number; clientY: number }>;
  positionRef: MutableRefObject<{ top: number }>;
};

export type PopUpWindowLayoutSetUpMethod = {
  start: ({ clientX, clientY, timeStamp }: { clientX: number; clientY: number; timeStamp: number }) => void;
  end: () => void;
};
export type PopUpWindowLayoutPositionMethod = ({ to }: { to: PopUpWindowState }) => void;

export type PopUpWindowLayoutCheckMethod = {
  isHorizontalMove: (moveX: number) => boolean;
  isLongPress: (timeGap: number) => boolean;
  isFlicking: ({ moveY, timeGap }: { moveY: number; timeGap: number }) => 'moveUp' | 'moveDown' | false;
  isOnHandling: () => boolean;
};

export type UsePopUpWindowLayoutControllResult = {
  refs: PopUpWindowLayoutRefs;
  check: PopUpWindowLayoutCheckMethod;
  setPopUpWindowPosition: PopUpWindowLayoutPositionMethod;
  setUp: PopUpWindowLayoutSetUpMethod;
  tabState: TabState;
};
