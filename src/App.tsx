import ClusterList from '@components/ClusterList';
import Filtering from '@components/Filtering';
import InfoWindow from '@components/InfoWindow';
import styled from '@emotion/styled';
import MapCompContainer from 'container/MapCompContainer';

function App() {
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
  width: 100%;
  height: 100%;
`;
