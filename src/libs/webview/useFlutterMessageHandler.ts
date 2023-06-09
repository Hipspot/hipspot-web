import { FlutterCallback } from '@constants/flutterCallback';
import { Message } from '@libs/types/flutter';
import { initFilterling } from './callback/initFilterling';
import { setMyLocation } from './callback/setMyLocation';
import useSetAuth from './callback/useSetAuth';
import { useSetRecoilState } from 'recoil';
import { notchHeightAtom } from '@states/header';
import { isWebViewAtom } from '@states/isWebView';
import { favoriteListAtom } from '@states/favoriteList';
import { parseStringifiedArray } from '@libs/utils/parseStringifiedArray';

export default function useFlutterMessageHandler() {
  const setAuth = useSetAuth();
  const setNotchHeightAtom = useSetRecoilState(notchHeightAtom);
  const setIsWebViewAtom = useSetRecoilState(isWebViewAtom);
  const setFavoriteList = useSetRecoilState(favoriteListAtom);

  return ({ type, data }: Message) => {
    switch (FlutterCallback[type]) {
      case FlutterCallback.initFilterling:
        return initFilterling(data);
      case FlutterCallback.setAuth:
        return setAuth(data);
      case FlutterCallback.setMyLocation:
        return setMyLocation(data);
      case FlutterCallback.setNotchHeight:
        return setNotchHeightAtom(data);
      case FlutterCallback.setIsWebView:
        return setIsWebViewAtom(true);
      case FlutterCallback.setFavoriteList:
        return setFavoriteList(parseStringifiedArray(data));
      default:
        // eslint-disable-next-line no-console
        console.error('등록된 핸들러가 없습니다.');
    }
  };
}
