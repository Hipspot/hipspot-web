import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { PopUpWindowState } from '@libs/types/infowindow';

export const Wrapper = styled.div<{ popUpState: PopUpWindowState }>`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${(props) =>
    props.popUpState === 'full'
      ? css`
          backdrop-filter: blur(8px);
        `
      : css`
          background: white;
        `}
`;
