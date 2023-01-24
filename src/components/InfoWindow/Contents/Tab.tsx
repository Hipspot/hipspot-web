import styled from '@emotion/styled';

export const TabBar = styled.div`
  width: 100%;
  height: 36px;
  background: transparent;
  display: flex;
  gap: 3px;
  filter: brightness(0.99);
  backdrop-filter: blur(8px);
`;

export const Tab = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  background: #ffffff;
  color: #999999;
  border-radius: 12px 12px 0px 0px;
  filter: brightness(0.99);

  &.selected {
    color: black;
    filter: none;
  }
`;
