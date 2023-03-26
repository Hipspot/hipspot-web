import styled from '@emotion/styled';

export const RandomButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div<{ top: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;
  border: 2px solid #fafafa;
  border-radius: 100%;
  position: fixed;
  top: ${(props) => props.top - 50}px;
  right: 16px;
  z-index: 1001;

  background: #fafafa;
  box-shadow: inset 0px 0px 16px rgba(0, 0, 0, 0.2);
  /* box-sizing: padding-box; */
`;
