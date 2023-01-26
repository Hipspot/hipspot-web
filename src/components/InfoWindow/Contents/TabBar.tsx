import styled from '@emotion/styled';

export const Wrapper = styled.div`
  padding: 0px 20px;
  width: 100%;
  height: 60px;
  display: flex;
  gap: 32px;
`;

export const Tab = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 600;
  font-size: 14px;

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
