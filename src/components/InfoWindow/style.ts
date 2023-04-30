import {
  CSSVAR_IMAGE_SLIDER_HEIGHT,
  CSSVAR_IMAGE_SLIDER_TRANSITION_DURATION,
  CSSVAR_IMAGE_SLIDER_WIDTH,
  CSSVAR_IMAGE_TRANSLATE,
} from '@constants/cssVar';
import styled from '@emotion/styled';

export const TopSection = styled.section``;
export const Section = styled.section`
  background-color: white;
  padding: 16px;
  flex: 1;
`;

export const TitleWrapper = styled.div`
  width: 100%;
  height: 56px;
  padding: 0px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ImageSliderWrapper = styled.div`
  :root {
    ${CSSVAR_IMAGE_TRANSLATE}: translateX(0px);
    ${CSSVAR_IMAGE_SLIDER_HEIGHT} : 0px;
    ${CSSVAR_IMAGE_SLIDER_WIDTH} : 0px;
    ${CSSVAR_IMAGE_SLIDER_TRANSITION_DURATION} : 0s;
  }
`;

export const Loading = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 60px;
  background-color: white;
  display: flex;
  justify-content: center;
`;
