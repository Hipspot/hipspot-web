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
import RandomButton from '@components/Button/RandomButton';

function App() {
  const flutterMessageHandler = useFlutterMessageHandler();
  useEffect(() => {
    window[FLUTTER_CHANNEL] = flutterMessageHandler;
  });

  return (
    <Wrapper>
      <MapCompContainer />
      <Filtering />
      <FindMyLocationButton />
      <RandomButton/>
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
