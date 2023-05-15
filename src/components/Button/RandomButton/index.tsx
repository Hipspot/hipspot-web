import React from 'react';
import * as S from './style';
import { RandomButtonIcon } from '@assets/index';
import { useRecoilValue } from 'recoil';
import { tabStateAtom } from '@states/infoWindow';
import axios from 'axios';

function RandomButton() {
  const { top } = useRecoilValue(tabStateAtom);

  const handleClick = async () => {
    try {
      const response = await axios.get(`https://api.hipspot.xyz/map`);
      const { data } = response;
      const cafeIds = data && data.map((cafe: any) => cafe.properties.cafeId);
      const randomArray = cafeIds[Math.floor(Math.random() * cafeIds.length)];
      const [randomCafeId] = randomArray;
      console.log(randomCafeId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.Wrapper onClick={handleClick} top={top}>
      <RandomButtonIcon />
    </S.Wrapper>
  );
}
export default RandomButton;
