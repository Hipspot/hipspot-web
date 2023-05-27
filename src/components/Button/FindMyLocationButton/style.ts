import styled from '@emotion/styled';

export const Wrapper = styled.div<{ top: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: fixed;
  left: 16px;
  top: ${(props) => props.top - 50}px;

  width: 44px;
  height: 44px;
  border: 2px solid #fafafa;
  border-radius: 100%;

  background: #fafafa;
  box-shadow: inset 0px 0px 16px rgba(0, 0, 0, 0.2);
  box-sizing: padding-box;
`;
