import { FindMyLocationIcon } from '@assets/index';
import { DOMID_MAP_COMPONENT, DOMTargetList } from '@constants/DOM';
import { MessageToFlutterType } from '@constants/flutterCallback';
import messageToFlutter from '@libs/webview/messageToFlutter';
import * as S from './style';

function FindMyLocationButton() {
  const onClick = () => {
    const mapElem = DOMTargetList[DOMID_MAP_COMPONENT];
    if (!mapElem) return;
    messageToFlutter(MessageToFlutterType.getMyLocation, '');
  };

  return (
    <S.Wrapper onClick={onClick}>
      <FindMyLocationIcon />
    </S.Wrapper>
  );
}

export default FindMyLocationButton;
