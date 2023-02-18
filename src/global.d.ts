import { EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import { SlideUpWindowEvent } from '@libs/types/customEvents';
import { JS_CHANNEL_NAME } from '@constants/jsChannelName';

declare global {
  interface Window {
    [JS_CHANNEL_NAME]: flutterChannel;
  }
  interface HTMLElementEventMap {
    [EVENT_SLIDE_UP_WINDOW]: SlideUpWindowEvent;
  }
}

export {};
