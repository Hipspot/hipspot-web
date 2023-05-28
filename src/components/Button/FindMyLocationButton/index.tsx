import { FindMyLocationIcon } from '@assets/index';
import { DOMID_MAP_COMPONENT, DOMTargetList } from '@constants/DOM';
import { MessageToFlutterType } from '@constants/flutterCallback';
import messageToFlutter from '@libs/webview/messageToFlutter';
import { tabStateAtom } from '@states/infoWindow';
import { useRecoilValue } from 'recoil';
import * as S from './style';

function FindMyLocationButton() {
  const { top } = useRecoilValue(tabStateAtom);

  const onClick = () => {
    const mapElem = DOMTargetList[DOMID_MAP_COMPONENT];
    if (!mapElem) return;
    messageToFlutter(MessageToFlutterType.getMyLocation, '');
  };

  return (
    <S.Wrapper onClick={onClick} top={top}>
      <FindMyLocationIcon />
    </S.Wrapper>
  );
}

export default FindMyLocationButton;
