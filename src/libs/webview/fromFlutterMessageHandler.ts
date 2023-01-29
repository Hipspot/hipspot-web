import { FlutterCallback } from '@constants/flutterCallback';
import { Message } from '@libs/types/flutter';
import { isNotNumber } from '@libs/utils/isNumber';
import { fromFlutterFunctionMap } from './fromFlutterFunctionMap';

const fromflutterMessageHandler = ({ type, data }: Message) => {
  const flutterCallbackList = new Set(Object.values(FlutterCallback).filter((key) => !isNotNumber(key)));

  if (!flutterCallbackList.has(type)) return console.log('error'); // 웹뷰에서 콘솔 확인 불가 에러처리 따로 필요

  const mappingKey = Number(FlutterCallback[type]) as FlutterCallback;

  return fromFlutterFunctionMap[mappingKey](data);
};

export default fromflutterMessageHandler;
