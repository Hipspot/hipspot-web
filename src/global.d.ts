import { JS_CHANNEL_NAME } from '@constants/jsChannelName';

declare global {
  interface Window {
    [JS_CHANNEL_NAME]: fromflutterMessageHandler;
  }
}

export {};
