import React from 'react';
import * as S from './style';
import { RandomButtonIcon } from '@assets/index';
import { toast } from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import { tabStateAtom } from '@states/infoWindow';

function RandomButton() {
  const { top } = useRecoilValue(tabStateAtom);

  const onClick = () => {
    toast.success('click random button');
  };

  return (
    <S.Wrapper onClick={onClick} top={top}>
      <RandomButtonIcon />
    </S.Wrapper>
  );
}

export default RandomButton;
