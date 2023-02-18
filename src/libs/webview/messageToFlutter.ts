import { MessageToFlutterType } from '@constants/flutterCallback';
import { FLUTTER_CHANNEL } from '@constants/jsChannelName';
import { toast } from 'react-hot-toast';

/**
 * flutter로 메시지 전송
 * @param type
 * @param data
 * @example messageToFlutter('openLoginModal', null);
 *   -> flutter에 다음 메세지가 전달된다. "{type: 'openLoginModal', data: null}"
 */
export default function messageToFlutter(type: MessageToFlutterType, data: any) {
  const message = JSON.stringify({ type, data });
  try {
    window.jsChannel.postMessage(message);
  } catch (e: any) {
    if (!window.jsChannel) {
      return mockFlutterMessage({ type, data });
    }
    toast.error(String(e));
  }
}

/**
 * @description 웹 환경에서 플러터 통신 결과를 확인할수 없으므로, 결과값이 잘 반환되었다는 가정하에 해당 함수 실행
 * @param type
 * @param data
 */

function mockFlutterMessage({ type }: { type: MessageToFlutterType; data: any }) {
  const flutterMessageHandler = window[FLUTTER_CHANNEL];

  switch (type) {
    case MessageToFlutterType.openLoginModal:
      return;
    case MessageToFlutterType.getMyLocation: {
      const randomRange = (max: number, min: number) => Math.random() * (max - min) + min;
      const bounds = [
        [127.03, 37.53],
        [127.07, 37.56],
      ];
      const position = [randomRange(bounds[0][0], bounds[1][0]), randomRange(bounds[0][1], bounds[1][1])];
      const responseMessage = JSON.parse(JSON.stringify({ type: 'setMyLocation', data: position }));
      return flutterMessageHandler(responseMessage);
    }
    case MessageToFlutterType.getAuth:
    default:
  }
}
