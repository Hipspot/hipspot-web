import { CancelIcon } from '@assets/index';
import styled from '@emotion/styled';

interface TitleProps {
  placeName: string;
}
function Title({ placeName }: TitleProps) {
  return (
    <Wrapper>
      <Name>{placeName}</Name>
      <Icon>
        <CancelIcon />
      </Icon>
    </Wrapper>
  );
}

export default Title;

const Wrapper = styled.div`
  width: 100%;
  height: 56px;
  padding: 0px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.h1`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #0d0d0d;
`;

const Icon = styled.div`
  svg {
    width: 24px;
    height: 24px;
    text-align: center;
    display: flex;
  }
`;
