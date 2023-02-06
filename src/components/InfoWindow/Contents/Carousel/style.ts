import { CSSVAR_CAROUSEL_HEIGHT } from '@constants/cssVar';
import styled from '@emotion/styled';
import { Carousel } from 'react-responsive-carousel';

export const SkeltonWrapper = styled.div`
  padding: 0px 16px;
  width: 100%;
  height: var(${CSSVAR_CAROUSEL_HEIGHT}, 343);
  & > div {
    background-color: #d6d6d6;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ComponentWrapper = styled.div`
  overflow: hidden;
  :root {
    --image-translate: translateX(0px);
  }
`;

export const StyledCarousel = styled(Carousel)`
  padding: 0px 16px;
  height: var(${CSSVAR_CAROUSEL_HEIGHT}, 343);
  img {
    height: inherit;
    object-fit: cover;
    object-position: center;
  }

  li img {
    height: var(${CSSVAR_CAROUSEL_HEIGHT}, 343);
    border-radius: 8px;
  }

  .carousel-status {
    height: 24px;
    width: 40px;
    border-radius: 12px;

    background: #0000006b;

    font-family: 'Pretendard';
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;

    box-sizing: border-box;

    padding: 2px 0px;

    position: absolute;
    top: calc(var(${CSSVAR_CAROUSEL_HEIGHT}, 343) - 30px);
    right: 8px;
  }
  :root {
    ${CSSVAR_CAROUSEL_HEIGHT}: 140px;
  }
`;