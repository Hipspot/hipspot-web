import ClusterList from '@components/ClusterList';
import Filtering from '@components/Filtering';
import styled from '@emotion/styled';
import MapCompContainer from '@containers/MapCompContainer';
import InfoWindowContainer from '@containers/InfoWindowContainer';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Wrapper>
      <MapCompContainer />
      <Filtering />
      <ClusterList />
      <InfoWindowContainer />
      <Toaster position="bottom-center" containerClassName="toaster" />
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
