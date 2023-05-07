import styled from '@emotion/styled';

export const Wrapper = styled.div<{ marginTop?: number }>`
  height: 64px;
  padding-top: ${(props) => props.marginTop || '20px'};
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-direction: row;
  overflow: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  box-sizing: content-box;
`;
