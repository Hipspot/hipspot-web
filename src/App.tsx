import ClusterList from '@components/ClusterList';
import Filtering from '@components/Filtering';
import styled from '@emotion/styled';
import MapCompContainer from '@containers/MapCompContainer';
import InfoWindowContainer from '@containers/InfoWindowContainer';

function App() {
  return (
    <Wrapper>
      <MapCompContainer />
      <Filtering />
      <ClusterList />
      <InfoWindowContainer />
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
