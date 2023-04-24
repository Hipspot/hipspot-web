import { CancelIcon } from '@assets/index';
import useCameraMove from '@components/MapComp/hooks/useCameraMove';
import { PopUpHeightsType, popUpHeights } from '@constants/popUpHeights';
import { tabStateAtom } from '@states/infoWindow';
import { useSetRecoilState } from 'recoil';
import * as S from '../../style';

function CloseButton() {
  const setTabState = useSetRecoilState(tabStateAtom);
  const { flyToPrev } = useCameraMove();
  return (
    <S.Icon
      data-testid="close_button"
      onClick={(e) => {
        e.stopPropagation();
        setTabState({ top: popUpHeights[PopUpHeightsType.bottom], onHandling: false, popUpState: 'invisible' });
        flyToPrev();
      }}
    >
      <CancelIcon />
    </S.Icon>
  );
}
export default CloseButton;
