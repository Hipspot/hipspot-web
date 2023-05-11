import franchiseLogo from '@assets/FranchiseLogo';
import styled from '@emotion/styled';
import { CustomGeoJSONFeatures } from '@libs/types/map';
import { Franchise } from '@libs/types/marker';

export type FranchiseMarkerProps = {
  feature: CustomGeoJSONFeatures;
  franchise: Franchise;
  handleClickPointMarker: (id: number) => void;
};

export default function FranchiseMarker({ handleClickPointMarker, feature, franchise }: FranchiseMarkerProps) {
  const { cafeId, cafeName } = feature.properties;
  return (
    <Wrapper className="mapgl-marker-animation" id={`${cafeId}`} onClick={() => handleClickPointMarker(cafeId)}>
      <CafeName>{cafeName}</CafeName>
      <MarkerWrapper>
        <img src={franchiseLogo[franchise]} alt={franchise} />
      </MarkerWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MarkerWrapper = styled.div`
  position: relative;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const CafeName = styled.div`
  position: absolute;
  color: #181818;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  white-space: nowrap;
  text-shadow: -2px -2px 0 #fff, 0 -2px 0 #fff, 2px -2px 0 #fff, 2px 0 0 #fff, 2px 2px 0 #fff, 0 2px 0 #fff,
    -2px 2px 0 #fff, -2px 0 0 #fff;
  transform: translate(0, -100%);
`;
