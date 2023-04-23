import React, { useState, useEffect } from 'react';
import * as S from './style';
import { RandomButtonIcon } from '@assets/index';
import { useRecoilValue } from 'recoil';
import { tabStateAtom } from '@states/infoWindow';
import axios from 'axios';

function RandomButton() {
  const { top } = useRecoilValue(tabStateAtom);
  const [cafeIds, setCafeIds] = useState([] as any);

  const fetchCafeId = async () => {
    try {
      setCafeIds(null);
      const response = await axios.get('https://api.hipspot.xyz/cafe/:cafeId');
      setCafeIds(response.data.cafeId);
    } catch (e) {
      throw Error('Error throwed');
    }
  };
  useEffect(() => {
    fetchCafeId();
  }, []);

  if (!cafeIds) return null;

  cafeIds.map((cafeId: { id: number }) => <li key={cafeIds.id}>{cafeId.id}</li>);

  const onClick = () => {};
  return (
    <S.Wrapper onClick={onClick} top={top}>
      <RandomButtonIcon />
    </S.Wrapper>
  );
}
export default RandomButton;
