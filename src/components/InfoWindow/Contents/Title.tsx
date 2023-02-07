import { CancelIcon } from '@assets/index';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSetRecoilState } from 'recoil';
import { tabStateAtom } from '@states/infoWindow';
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';

interface TitleProps {
  placeName: string;
}
function Title({ placeName }: TitleProps) {
  const setTabState = useSetRecoilState(tabStateAtom);

  return (
    <>
      <Name>{placeName}</Name>
      <Icon
        data-testid="close_button"
        onClick={(e) => {
          e.stopPropagation();
          setTabState({ top: popUpHeights[PopUpHeightsType.bottom], onHandling: true, popUpState: 'thumbNail' });
        }}
      >
        <CancelIcon />
      </Icon>
    </>
  );
}

export default Title;

export function TitleSkeleton() {
  return (
    <TitleSkeletonWrapper>
      <Skeleton
        baseColor="lightgray"
        css={css`
          height: 40px;
        `}
      />
    </TitleSkeletonWrapper>
  );
}

export const TitleSkeletonWrapper = styled.div`
  width: 100%;
  height: 56px;
  z-index: 1;
  padding: 8px 0px;
`;

const Name = styled.h1`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #0d0d0d;
`;

const Icon = styled.div`
  svg {
    width: 24px;
    height: 24px;
    text-align: center;
    display: flex;
  }
`;
