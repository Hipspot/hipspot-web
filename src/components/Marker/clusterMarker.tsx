import styled from '@emotion/styled';
import { filterColor } from '@libs/styles/color';
// import { activeFilterIdAtom, openClusterListAtom } from '@states/ui';
// import { useRecoilValue, useSetRecoilState } from 'recoil';

type ClusterMarkerProps = {
  /**
   * 클러스터링 된 장소의 개수
   * @example 3
   */
  number: number;
};

export default function ClusterMarker({ number }: ClusterMarkerProps) {
  /*
  const activeFilterId = useRecoilValue(activeFilterIdAtom);
  const setOpenClusterList = useSetRecoilState(openClusterListAtom);

  const handleClick = () => {
    setOpenClusterList(true);
  };
  return (
    <Wrapper id="marker" onClick={handleClick} color={filterColor[activeFilterId]}>
      +{number}
    </Wrapper>
  );
  */
  return (
    <Wrapper id="marker" color={filterColor[0]}>
      +{number}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ color: string }>`
  position: absolute;
  left: 106px;
  top: 381px;

  width: 64px;
  height: 64px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;
