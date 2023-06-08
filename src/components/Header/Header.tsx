import LoginButton from '@components/Button/LoginButton/LoginButton';
import Filtering from '@components/Filtering';
import { MessageToFlutterType } from '@constants/flutterCallback';
import styled from '@emotion/styled';
import messageToFlutter from '@libs/webview/messageToFlutter';
import { notchHeightAtom } from '@states/header';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

function Header() {
  const notchHeight = useRecoilValue(notchHeightAtom);
  const marginTop = Number(notchHeight) + 20;

  useEffect(() => {
    messageToFlutter(MessageToFlutterType.getNotchHeight, null);
  }, []);

  return (
    <Wrapper marginTop={marginTop}>
      <Filtering />
      <LoginButton />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ marginTop?: number }>`
  position: sticky;
  padding-top: ${(props) => `${props.marginTop}px`};
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
