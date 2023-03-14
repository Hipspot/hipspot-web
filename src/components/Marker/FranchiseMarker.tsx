import franchiseLogo from '@assets/FranchiseLogo';
import styled from '@emotion/styled';
import { FilterId } from '@libs/types/filter';
import { CustomGeoJSONFeatures } from '@libs/types/map';
import { Franchise } from '@libs/types/marker';

export type FranchiseMarkerProps = {
  feature: CustomGeoJSONFeatures;
  franchise: Franchise;
  handleClickPointMarker: (id: number) => void;
};

export default function FranchiseMarker({ handleClickPointMarker, feature, franchise }: FranchiseMarkerProps) {
  const { cafeId, cafeName, filterList } = feature.properties;
  return (
    <Wrapper className="mapgl-marker-animation" id={`${cafeId}`} onClick={() => handleClickPointMarker(cafeId)}>
      {/* filterList에 맞게 랜더링해주는지 테스트하기 위한 tag 추후 삭제해주세요 */}
      <div>{filterList.map((filter) => FilterId[filter]).join(', ')}</div>
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
  text-shadow: 0 0.5px white, 0.5px 0px white, -0.5px 0px white, 0px -0.5px white, 1px 1px 1px 77;
  transform: translate(0, -100%);
`;
