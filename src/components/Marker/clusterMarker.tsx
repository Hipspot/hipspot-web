import styled from '@emotion/styled';
import { FilterId } from '@libs/types/filter';
// import { activeFilterIdAtom, openClusterListAtom } from '@states/ui';
// import { useRecoilValue, useSetRecoilState } from 'recoil';

type ClusterMarkerProps = {
  /**
   * 클러스터링 된 장소의 개수
   * @example 3
   */
  number: number;

  filterId: FilterId;
};

const filteredClusterColor = [
  {
    wrapperColor: '#F889FA',
    wrapperBoxShadowColor: 'rgba(123, 9, 112, 0.35)',
    innerCircleColor: '#F699ED',
    innerCircleBoxShadowColorX: 'rgba(250, 202, 251, 0.9)',
    innerCircleBoxShadowColorY: 'rgba(0, 0, 0, 0.12)',
    textShadowColorX: 'rgba(71, 3, 68, 0.4)',
    textShadowColorY: 'rgba(245, 165, 237, 0.8)',
  },
  {
    wrapperColor: '#32D186',
    wrapperBoxShadowColor: '#3D785C',
    innerCircleColor: '#32D186',
    innerCircleBoxShadowColorX: 'rgba(123, 225, 170, 0.9)',
    innerCircleBoxShadowColorY: 'rgba(2, 30, 25, 0.12)',
    textShadowColorX: '#3D785C',
    textShadowColorY: '#48E39A',
  },
  {
    wrapperColor: '#F2BE19',
    wrapperBoxShadowColor: 'rgba(133, 50, 3, 0.35)',
    innerCircleColor: '#F2BE19',
    innerCircleBoxShadowColorX: 'rgba(249, 199, 125, 0.9)',
    innerCircleBoxShadowColorY: 'rgba(23, 10, 0, 0.12)',
    textShadowColorX: '#9D523A',
    textShadowColorY: '#FDC999',
  },
  {
    wrapperColor: '#BF8D69',
    wrapperBoxShadowColor: 'rgba(133, 50, 3, 0.35)',
    innerCircleColor: '#BF8D69',
    innerCircleBoxShadowColorX: 'rgba(223, 171, 123, 0.9)',
    innerCircleBoxShadowColorY: 'rgba(23, 10, 0, 0.12)',
    textShadowColorX: '#8E5E4F',
    textShadowColorY: '#FDC999',
  },
  {
    wrapperColor: '#418DFF',
    wrapperBoxShadowColor: 'rgba(3, 55, 133, 0.35)',
    innerCircleColor: '#418DFF',
    innerCircleBoxShadowColorX: 'rgba(122, 170, 242, 0.9)',
    innerCircleBoxShadowColorY: 'rgba(23, 10, 0, 0.12)',
    textShadowColorX: '#3A5379',
    textShadowColorY: '#90B8F2',
  },
  {
    wrapperColor: '#B46FEA',
    wrapperBoxShadowColor: 'rgba(76, 3, 133, 0.35)',
    innerCircleColor: '#B46FEA',
    innerCircleBoxShadowColorX: '#C6A1F7',
    innerCircleBoxShadowColorY: 'rgba(23, 10, 0, 0.12)',
    textShadowColorX: '#753D8F',
    textShadowColorY: '#D4A9F5',
  },
];

export default function ClusterMarker({ number, filterId }: ClusterMarkerProps) {
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
  const clusterColors = filteredClusterColor[filterId];
  return (
    <Wrapper
      id="marker"
      wrapperColor={clusterColors.wrapperColor}
      wrapperBoxShadowColor={clusterColors.wrapperBoxShadowColor}
    >
      <InnerCircle
        innerCircleColor={clusterColors.innerCircleColor}
        innerCircleBoxShadowColorX={clusterColors.innerCircleBoxShadowColorX}
        innerCircleBoxShadowColorY={clusterColors.innerCircleBoxShadowColorY}
      >
        <ClusterPointNumberText>+{number}</ClusterPointNumberText>
        <ClusterPointNumberShadow
          textShadowColorX={clusterColors.textShadowColorX}
          textShadowColorY={clusterColors.textShadowColorY}
        >
          +{number}
        </ClusterPointNumberShadow>
      </InnerCircle>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ wrapperColor: string; wrapperBoxShadowColor: string }>`
  width: 64px;
  height: 64px;
  background-color: ${(props) => props.wrapperColor};
  border: 1.6px solid ${(props) => props.wrapperColor};
  border-radius: 50%;
  box-shadow: inset 0px 0px 8px ${(props) => props.wrapperBoxShadowColor};
  filter: drop-shadow(0px 12px 24px rgba(0, 0, 0, 0.16));

  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerCircle = styled.div<{
  innerCircleColor: string;
  innerCircleBoxShadowColorX: string;
  innerCircleBoxShadowColorY: string;
}>`
  position: relative;
  width: 54px;
  height: 54px;
  background-color: ${(props) => props.innerCircleColor};
  border-radius: 50%;
  box-shadow: 1px -1px 2px ${(props) => props.innerCircleBoxShadowColorX},
    -1px 1px 2px ${(props) => props.innerCircleBoxShadowColorY};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClusterPointNumberText = styled.div`
  position: absolute;
  z-index: 10;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
`;

const ClusterPointNumberShadow = styled.div<{
  textShadowColorX: string;
  textShadowColorY: string;
}>`
  position: absolute;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: transparent;
  text-shadow: -0.48px 0.95px 1.43px ${(props) => props.textShadowColorX},
    0.95px -0.95px 0.95px ${(props) => props.textShadowColorY};
  filter: blur(0.48px);
`;
