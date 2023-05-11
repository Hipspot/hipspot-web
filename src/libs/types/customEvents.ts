import { EVENT_FIND_MY_LOCATION, EVENT_SLIDE_UP_WINDOW } from '@constants/event';

export interface SlideUpWindowEvent extends SlideUpWindowEventProps, Event {}
export interface FindMyLocationEvent extends FindMyLocationEventProps, Event {}
export interface SlideUpWindowEventProps {
  currentTop: number;
}

export interface FindMyLocationEventProps {
  coordinates: [number, number];
}

export type CustomEventPropsMap = {
  [EVENT_SLIDE_UP_WINDOW]: SlideUpWindowEventProps;
  [EVENT_FIND_MY_LOCATION]: FindMyLocationEventProps;
};
