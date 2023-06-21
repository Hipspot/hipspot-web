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
import { activeFilterIdAtom } from '@states/clusterList';
import { FilterId } from '@libs/types/filter';
import getEnumNumberValues from '@libs/utils/getEnumNumberValues';

export default function useFlutterMessageHandler() {
  const setAuth = useSetAuth();
  const setNotchHeightAtom = useSetRecoilState(notchHeightAtom);
  const setIsWebViewAtom = useSetRecoilState(isWebViewAtom);
  const setFavoriteList = useSetRecoilState(favoriteListAtom);
  const setActiveFilterId = useSetRecoilState(activeFilterIdAtom);

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
      case FlutterCallback.setOnboardingFilter:
        if (!getEnumNumberValues(FilterId).includes(Number(data) as FilterId)) return;
        return setActiveFilterId(Number(data));
      default:
        // eslint-disable-next-line no-console
        console.error('등록된 핸들러가 없습니다.');
    }
  };
}
