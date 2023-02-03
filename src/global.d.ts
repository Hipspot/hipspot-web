import { EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import { SlideUpWindowEvent } from '@libs/types/customEvents';

declare global {
  interface HTMLElementEventMap {
    [EVENT_SLIDE_UP_WINDOW]: SlideUpWindowEvent;
  }
}
