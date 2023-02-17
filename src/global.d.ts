import { EVENT_FIND_MY_LOCATION, EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import { FindMyLocationEvent, SlideUpWindowEvent } from '@libs/types/customEvents';
import { JS_CHANNEL_NAME } from '@constants/jsChannelName';

declare global {
  interface Window {
    [JS_CHANNEL_NAME]: fromflutterMessageHandler;
  }
  interface HTMLElementEventMap {
    [EVENT_SLIDE_UP_WINDOW]: SlideUpWindowEvent;
    [EVENT_FIND_MY_LOCATION]: FindMyLocationEvent;
  }
}

export {};
