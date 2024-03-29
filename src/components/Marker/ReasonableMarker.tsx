import styled from '@emotion/styled';
import { CustomGeoJSONFeatures } from '@libs/types/map';

export type ReasonableMarkerProps = {
  feature: CustomGeoJSONFeatures;
  handleClickPointMarker: (id: number) => void;
};

export default function ReasonableMarker({ handleClickPointMarker, feature }: ReasonableMarkerProps) {
  const { cafeId, cafeName, reasonablePrice } = feature.properties;

  return (
    <Wrapper className="mapgl-marker-animation" id={`${cafeId}`} onClick={() => handleClickPointMarker(cafeId)}>
      <CafeName>{cafeName}</CafeName>
      <MarkerWrapper>
        <svg width="87" height="52" viewBox="0 0 87 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={reasonablePath} fill="white" stroke="#F2BE19" strokeWidth="1.4" />
        </svg>

        <ReasonablePrice>{`${reasonablePrice ? reasonablePrice.toLocaleString('ko-KR') : '...'}~`}</ReasonablePrice>
      </MarkerWrapper>
    </Wrapper>
  );
}

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
