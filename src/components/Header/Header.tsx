import LoginButton from '@components/Button/LoginButton/LoginButton';
import Filtering from '@components/Filtering';
import styled from '@emotion/styled';

type HeaderProps = {
  /**
   * 필터링의 상단
   * @description 여백모바일 환경마다 다를 윗 여백을 조정하기 위함
   * @example 20
   */
  marginTop?: number;
};
function Header({ marginTop }: HeaderProps) {
  return (
    <Wrapper marginTop={marginTop}>
      <Filtering />
      <LoginButton />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ marginTop?: number }>`
  position: sticky;
  padding-top: ${(props) => props.marginTop || '20px'};
  position: sticky;
  padding-left: 16px;
  padding-right: 80px;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease-in-out;
`;

export default Header;
