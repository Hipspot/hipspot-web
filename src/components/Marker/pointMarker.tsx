import { S3_URL } from '@constants/s3Url';
import styled from '@emotion/styled';
import { CustomGeoJSONFeatures } from '@libs/types/map';

export type PointMarkerProps = {
  feature: CustomGeoJSONFeatures;
  handleClickPointMarker: (id: number) => void;
};

export default function PointMarker({ handleClickPointMarker, feature }: PointMarkerProps) {
  const { cafeId, cafeName } = feature.properties;

  return (
    <Wrapper className="mapgl-marker-animation" id={`${cafeId}`} onClick={() => handleClickPointMarker(cafeId)}>
      <CafeName>{cafeName}</CafeName>
      <MarkerWrapper>
        <svg width="78" height="86" viewBox="0 0 78 86" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={backgroundPath} fill="#D9D9D9" stroke="white" />
        </svg>
        <MaskImageWrapper>
          <MaskImage image={`${S3_URL}/${cafeId}/thumbNail.jpg`} />
        </MaskImageWrapper>
      </MarkerWrapper>
    </Wrapper>
  );
}

const clipPath =
  'M4 0C1.79086 0 0 1.79086 0 4V72C0 74.2091 1.79086 76 4 76H29.112L37.4183 83.7745C37.7396 84.0752 38.2604 84.0752 38.5817 83.7745L46.888 76H72C74.2091 76 76 74.2091 76 72V4C76 1.79086 74.2091 0 72 0H4Z';

const backgroundPath =
  'M5 0C2.23858 0 0 2.23857 0 5V73C0 75.7614 2.23857 78 5 78H29.717L37.735 85.5046C38.4407 86.1651 39.5593 86.1651 40.265 85.5046L48.283 78H73C75.7614 78 78 75.7614 78 73V5C78 2.23858 75.7614 0 73 0H5Z';

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
  height: 84px;
  overflow: hidden;
  clip-path: path('${clipPath}');
`;
const MaskImage = styled.div<{ image: string }>`
  width: 76px;
  height: 84px;
  background: url('${(props) => props.image}');
  background-size: cover;
  background-position: center;
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
