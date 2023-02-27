import styled from '@emotion/styled';
import { FilterId } from '@libs/types/filter';
import { CustomGeoJSONFeatures } from '@libs/types/map';

export type PointMarkerProps = {
  id: number;
  image: string;
  feature: CustomGeoJSONFeatures;
  activeFilterId: FilterId;
  handleClickPointMarker: (id: number) => void;
};

export default function PointMarker({ handleClickPointMarker, feature, activeFilterId, image, id }: PointMarkerProps) {
  const { placeName, filterList } = feature.properties;

  /* 임시 값 삽입, 가성비가격 데이터 추가 이후 수정할 것 */
  const reasonablePrice = 2500;

  return (
    <Wrapper className="mapgl-marker-animation" id={`${id}`} onClick={() => handleClickPointMarker(id)}>
      {/* filterList에 맞게 랜더링해주는지 테스트하기 위한 tag 추후 삭제해주세요 */}
      <div>{filterList.map((filter) => FilterId[filter]).join(', ')}</div>
      <CafeName>{placeName}</CafeName>
      <MarkerWrapper>
        {activeFilterId === FilterId.Reasonable ? (
          <>
            <svg width="87" height="52" viewBox="0 0 87 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d={reasonablePath} fill="white" stroke="#F2BE19" strokeWidth="1.4" />
            </svg>

            <ReasonablePrice>{`${reasonablePrice.toLocaleString('ko-KR')}~`}</ReasonablePrice>
          </>
        ) : (
          <>
            <svg width="98" height="111" viewBox="0 0 98 111" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d={backgroundPath} fill="#D9D9D9" stroke="white" />
            </svg>
            <MaskImageWrapper>
              <MaskImage image={image} />
            </MaskImageWrapper>
          </>
        )}
      </MarkerWrapper>
    </Wrapper>
  );
}

const clipPath =
  'M4 0C1.79086 0 0 1.79086 0 4V92C0 94.2091 1.79086 96 4 96H34.5528L47.2729 108.699C47.6745 109.1 48.3255 109.1 48.7271 108.699L61.4472 96H92C94.2091 96 96 94.2091 96 92V4C96 1.79086 94.2091 0 92 0H4Z';

const backgroundPath =
  'M5 0.5C2.51472 0.5 0.5 2.51472 0.5 5V93C0.5 95.4853 2.51472 97.5 5 97.5H35.3459L47.9196 110.053C48.5164 110.649 49.4836 110.649 50.0803 110.053L62.6541 97.5H93C95.4853 97.5 97.5 95.4853 97.5 93V5C97.5 2.51472 95.4853 0.5 93 0.5H5Z';

const reasonablePath =
  'M31.3452 39.4833L31.1446 39.3H30.8729H4C2.1775 39.3 0.7 37.8225 0.7 36V4C0.7 2.1775 2.1775 0.7 4 0.7H83C84.8224 0.7 86.3 2.17751 86.3 4V36C86.3 37.8225 84.8224 39.3 83 39.3H57.1271H56.8554L56.6548 39.4833L44.2024 50.8665C44.0878 50.9713 43.9122 50.9713 43.7976 50.8665L31.3452 39.4833Z';

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

const MaskImageWrapper = styled.div`
  position: absolute;
  top: 1px;
  left: 1px;
  height: 111px;
  overflow: hidden;
  clip-path: path('${clipPath}');
`;
const MaskImage = styled.div<{ image: string }>`
  width: 110px;
  height: 120px;
  background: url('${(props) => props.image}');
  background-size: cover;
  background-position: center;
  transform: translate(-10px, -10px);
`;

const CafeName = styled.div`
  position: absolute;
  color: #181818;

  font-weight: 600;

  white-space: nowrap;
  text-shadow: 0 0.5px white, 0.5px 0px white, -0.5px 0px white, 0px -0.5px white, 1px 1px 1px 77;
  transform: translate(0, -100%);
`;

const ReasonablePrice = styled.div`
  position: absolute;
  top: 0%;

  width: 100%;
  height: 40px;
  color: #0d0d0d;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
`;
