import { EVENT_FIND_MY_LOCATION, EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import { FindMyLocationEvent, SlideUpWindowEvent } from '@libs/types/customEvents';
import { FLUTTER_CHANNEL } from '@constants/jsChannelName';

declare global {
  interface Window {
    [FLUTTER_CHANNEL]: flutterChannel;
  }
  interface HTMLElementEventMap {
    [EVENT_SLIDE_UP_WINDOW]: SlideUpWindowEvent;
    [EVENT_FIND_MY_LOCATION]: FindMyLocationEvent;
  }
}

export {};
