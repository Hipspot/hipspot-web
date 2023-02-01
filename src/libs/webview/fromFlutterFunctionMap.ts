import { FlutterCallback } from '@constants/flutterCallback';
import { initFilterling } from './callback/initFilterling';

export const fromFlutterFunctionMap: { [key in FlutterCallback]: (data: any) => void } = {
  [FlutterCallback.initFilterling]: initFilterling,
};
