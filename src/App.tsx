import ClusterList from '@components/ClusterList';
import Filtering from '@components/Filtering';
import InfoWindow from '@components/InfoWindow';
import styled from '@emotion/styled';
import MapCompContainer from '@containers/MapCompContainer';
import { useRecoilValue } from 'recoil';
import { themeModeAtom } from '@states/ui';
import { Global, ThemeProvider } from '@emotion/react';
import { light } from '@libs/styles/theme';
import { globalStyle } from '@libs/styles/GlobalStyle';

function App() {
  const themeMode = useRecoilValue(themeModeAtom);
  const theme = themeMode === 'light' && light;

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Wrapper>
        <MapCompContainer />
        <Filtering />
        <ClusterList />
        <InfoWindow />
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
`;
