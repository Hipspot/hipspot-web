import {
  CSSVAR_IMAGE_SLIDER_HEIGHT,
  CSSVAR_IMAGE_SLIDER_TRANSITION_DURATION,
  CSSVAR_IMAGE_SLIDER_WIDTH,
  CSSVAR_IMAGE_TRANSLATE,
} from '@constants/cssVar';
import styled from '@emotion/styled';

export const SkeltonWrapper = styled.div`
  padding: 0px 16px;
  width: 100%;
  height: var(${CSSVAR_IMAGE_SLIDER_HEIGHT}, 343);
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

export const SliderWrapper = styled.div`
  overflow: hidden;
`;

export const SlideContainer = styled.div`
  height: var(${CSSVAR_IMAGE_SLIDER_HEIGHT});
  padding-left: 16px;
  width: 1000vw;
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  transform: translate3d(var(${CSSVAR_IMAGE_TRANSLATE}), 0px, 0px);
  transition: ease-in-out var(${CSSVAR_IMAGE_SLIDER_TRANSITION_DURATION});
`;

export const Image = styled.img<{ selected: boolean; initSize: { height: number; width: number } }>`
  border-radius: 8px;
  flex: 0 0 auto;
  height: ${(props) => (props.selected ? `var(${CSSVAR_IMAGE_SLIDER_HEIGHT})` : `${props.initSize.height}px`)};
  width: ${(props) => (props.selected ? `var(${CSSVAR_IMAGE_SLIDER_WIDTH})` : `${props.initSize.width}px`)};
  object-fit: cover;
  object-position: center;
  position: relative;
  z-index: ${(props) => (props.selected ? 11 : 1)};
`;
