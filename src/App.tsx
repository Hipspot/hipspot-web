import ClusterList from '@components/ClusterList';
import Filtering from '@components/Filtering';
import InfoWindow from '@components/InfoWindow';
import Marker from '@components/Marker';
import styled from '@emotion/styled';

function App() {
  return (
    <Wrapper>
      <Marker number={6} />
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

  background-image: url('https://user-images.githubusercontent.com/24623403/213152431-3fe9ca69-2b18-42f4-96be-01e74a5cd0ef.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
