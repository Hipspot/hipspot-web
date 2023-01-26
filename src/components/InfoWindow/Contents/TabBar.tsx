import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  gap: 3px;
`;

export const Tab = styled.div<{ isSelected?: boolean }>`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;

  background: #ffffff;
  border-radius: 12px 12px 0px 0px;
  color: #999999;
  filter: brightness(0.99);

  ${(props) =>
    props.isSelected &&
    `
    color: black;
    filter: none;
  `}
`;
