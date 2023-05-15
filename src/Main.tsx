import ClusterList from '@components/ClusterList';
import styled from '@emotion/styled';
import MapCompContainer from '@containers/MapCompContainer';
import InfoWindow from '@components/InfoWindow';
import { useEffect } from 'react';
import useFlutterMessageHandler from '@libs/webview/useFlutterMessageHandler';
import { Toaster } from 'react-hot-toast';
import FindMyLocationButton from '@components/Button/FindMyLocationButton';
import { FLUTTER_CHANNEL } from '@constants/jsChannelName';
import RandomButton from '@components/Button/RandomButton';
import { Global, ThemeProvider } from '@emotion/react';
import { light } from '@libs/styles/theme';
import { globalStyle } from '@libs/styles/GlobalStyle';
import { useSetRecoilState } from 'recoil';
import { authAtom } from '@states/auth';
import Header from '@components/Header/Header';

function Main() {
  const flutterMessageHandler = useFlutterMessageHandler();
  useEffect(() => {
    window[FLUTTER_CHANNEL] = flutterMessageHandler;
  });

  const setAuthState = useSetRecoilState(authAtom);
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      setAuthState({ isAuth: true, accessToken: localStorage.getItem('token')! });
      console.log('로그인 성공');
    } else {
      console.log('재로그인이 필요합니다.');
    }
  }, []);

  const theme = light;

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Wrapper>
        <MapCompContainer />
        <Header />
        <FindMyLocationButton />
        <RandomButton />
        <ClusterList />
        <InfoWindow />
        <Toaster
          position="bottom-center"
          containerClassName="toaster"
          toastOptions={{
            success: {
              style: {
                width: '100%',
                background: 'rgba(64, 64, 64, 0.9)',
                opacity: '0.9',
                backdropFilter: 'blur(30px)',
                fontWeight: '600',
                color: theme.colors.white,
              },
            },
          }}
        />
      </Wrapper>
    </ThemeProvider>
  );
}

export default Main;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;

  .toaster {
    div:nth-of-type(2) {
      justify-content: flex-start;
    }
  }
`;