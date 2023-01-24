import styled from '@emotion/styled';

export const Wrapper = styled.div`
  margin-top: 32px;
  width: calc(100% - 32px);
  height: calc(80px - 32px);
  background: transparent;
  display: flex;
  align-items: center;
  padding: 16px;
  backdrop-filter: blur(8px);
`;

export const Icon = styled.div`
  svg {
    width: 24px;
    height: 24px;
    text-align: center;
    display: flex;
  }
`;

export const Name = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #0d0d0d;
  flex: 1;
`;
