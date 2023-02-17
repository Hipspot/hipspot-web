import { FindMyLocationIcon } from '@assets/index';
import React from 'react';
import * as S from './style';

interface FindMyLocationButtonProps {
  onClick: () => void;
}
function FindMyLocationButton({ onClick }: FindMyLocationButtonProps) {
  return (
    <S.Wrapper onClick={onClick}>
      <FindMyLocationIcon />
    </S.Wrapper>
  );
}

export default FindMyLocationButton;
