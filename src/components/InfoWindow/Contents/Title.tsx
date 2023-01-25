import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: 56px;
  padding: 0px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled.h1`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #0d0d0d;
`;

export const Icon = styled.div`
  svg {
    width: 24px;
    height: 24px;
    text-align: center;
    display: flex;
  }
`;
