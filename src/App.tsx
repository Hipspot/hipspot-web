import ClusterList from '@components/ClusterList';
import Filtering from '@components/Filtering';
import InfoWindow from '@components/InfoWindow';
import styled from '@emotion/styled';
import MapCompContainer from '@containers/MapCompContainer';
import { useLayoutEffect } from 'react';
import fromflutterMessageHandler from '@libs/webview/fromFlutterMessageHandler';

function App() {
  useLayoutEffect(() => {
    window.fromflutterMessageHandler = fromflutterMessageHandler;
  });
  return (
    <Wrapper>
      <MapCompContainer />
      <Filtering />
      <ClusterList />
      <InfoWindow />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
