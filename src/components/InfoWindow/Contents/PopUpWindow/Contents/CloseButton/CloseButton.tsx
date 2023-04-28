import { CancelIcon } from '@assets/index';
import useCameraMove from '@components/MapComp/hooks/useCameraMove';
import * as S from '../../style';
import usePopUpWindowLayoutControll from '../Layout/usePopUpWindowLayoutControll';

function CloseButton() {
  const { setPopUpWindowPosition } = usePopUpWindowLayoutControll();
  const { flyToPrev } = useCameraMove();
  return (
    <S.Icon
      data-testid="close_button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setPopUpWindowPosition({ to: 'invisible' });
        flyToPrev();
      }}
    >
      <CancelIcon />
    </S.Icon>
  );
}
export default CloseButton;
