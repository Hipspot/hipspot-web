import { MessageToFlutterType } from '@constants/flutterCallback';

/**
 * flutter로 메시지 전송
 * @param type
 * @param data
 * @example messageToFlutter('openLoginModal', null);
 *   -> flutter에 다음 메세지가 전달된다. "{type: 'openLoginModal', data: null}"
 */
export default function messageToFlutter(type: MessageToFlutterType, data: any) {
  window.jsChannel.postMessage(JSON.stringify({ type, data }));
}
