import { FlutterCallback } from '@constants/flutterCallback';
import { Message } from '@libs/types/flutter';
import { initFilterling } from './callback/initFilterling';
import { setMyLocation } from './callback/setMyLocation';
import useSetAuth from './callback/useSetAuth';

export default function useFlutterMessageHandler() {
  const setAuth = useSetAuth();

  return ({ type, data }: Message) => {
    switch (FlutterCallback[type]) {
      case FlutterCallback.initFilterling:
        return initFilterling(data);
      case FlutterCallback.setAuth:
        return setAuth(data);
      case FlutterCallback.setMyLocation:
        return setMyLocation(data);
      default:
        // eslint-disable-next-line no-console
        console.error('등록된 핸들러가 없습니다.');
    }
  };
}
