import styled from '@emotion/styled';
import { filterColor } from '@lib/styles/color';
import { activeFilterIdAtom, openClusterListAtom } from '@recoil/ui';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type MarkerProps = {
  number: number;
};

export default function Marker({ number }: MarkerProps) {
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
