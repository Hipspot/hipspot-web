import { DOMID_MAP_COMPONENT, DOMTargetList } from '@constants/DOM';
import { EVENT_FIND_MY_LOCATION } from '@constants/event';
import { toast } from 'react-hot-toast';

export const setMyLocation = (coordinates: [number, number]) => {
  const mapElem = DOMTargetList[DOMID_MAP_COMPONENT];
  if (!mapElem) return;
  const findMyLocationEvent = Object.assign(new Event(EVENT_FIND_MY_LOCATION), {
    coordinates,
  });
  mapElem.dispatchEvent(findMyLocationEvent);

  // 플러터에서 디버깅 하기 위해 토스트로 console 찍어줌
  if (process.env.NODE_ENV !== 'production') {
    toast(`전달받은 좌표 : ${coordinates.toString()}`);
  }
};
