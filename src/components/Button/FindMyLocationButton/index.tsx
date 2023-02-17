import { FindMyLocationIcon } from '@assets/index';
import { DOMID_MAP_COMPONENT, DOMTargetList } from '@constants/DOM';
import { EVENT_FIND_MY_LOCATION } from '@constants/event';
import * as S from './style';

function FindMyLocationButton() {
  const onClick = async () => {
    const mapElem = DOMTargetList[DOMID_MAP_COMPONENT];
    if (!mapElem) return;
    const findMyLocationEvent = Object.assign(new Event(EVENT_FIND_MY_LOCATION), {
      coordinates: [127.0582071, 37.5447481],
    });

    mapElem.dispatchEvent(findMyLocationEvent);
  };
  return (
    <S.Wrapper onClick={onClick}>
      <FindMyLocationIcon />
    </S.Wrapper>
  );
}

export default FindMyLocationButton;
