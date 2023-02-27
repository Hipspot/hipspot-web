import ClusterList from '@components/ClusterList';
import Filtering from '@components/Filtering';
import styled from '@emotion/styled';
import MapCompContainer from '@containers/MapCompContainer';
import InfoWindow from '@components/InfoWindow';
import { useEffect } from 'react';
import useFlutterMessageHandler from '@libs/webview/useFlutterMessageHandler';
import { Toaster } from 'react-hot-toast';
import FindMyLocationButton from '@components/Button/FindMyLocationButton';
import { FLUTTER_CHANNEL } from '@constants/jsChannelName';
import { Global, ThemeProvider } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { themeModeAtom } from '@states/ui';
import { light } from '@libs/styles/theme';
import { globalStyle } from '@libs/styles/GlobalStyle';

function App() {
  const flutterMessageHandler = useFlutterMessageHandler();
  useEffect(() => {
    window[FLUTTER_CHANNEL] = flutterMessageHandler;
  });

  const themeMode = useRecoilValue(themeModeAtom);
  const theme = themeMode === 'light' && light;

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Wrapper>
        <MapCompContainer />
        <Filtering />
        <FindMyLocationButton />
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
                color: '#FFFFFF',
              },
            },
          }}
        />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;

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
