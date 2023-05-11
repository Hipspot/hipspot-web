import React from 'react';
import * as S from './style';
import { RandomButtonIcon } from '@assets/index';
import { toast } from 'react-hot-toast';

function RandomButton() {
  const onClick = () => {
    toast.success('랜덤버튼을 클릭하였습니다.');
  };

  return (
    <S.Wrapper onClick={onClick}>
      <RandomButtonIcon />
    </S.Wrapper>
  );
}

export default RandomButton;
