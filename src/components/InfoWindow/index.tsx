import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { activatedCafeIdAtom, placeInfoQuery, tabStateAtom } from '@states/infoWindow';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { PlaceInfo } from '@libs/types/place';
import MakeLodableSuspense from '@components/MakeLodableSuspense';
import { PopUpWindowState } from '@libs/types/infowindow';
// import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import PopUpWindow from './PopUpWindow';
import * as MapButtonList from './Contents/MapButtonList';
import TabBar from './Contents/TabBar';
import Title from './Contents/Title';
import CustomCarousel from './Contents/Carousel';
import Information from './Contents/Information';

export default function InfoWindow() {
  const tabState = useRecoilValue(tabStateAtom);
  const activatedCafeId = useRecoilValue(activatedCafeIdAtom);
  const placeInfoLoadable = useRecoilValueLoadable(placeInfoQuery(activatedCafeId));

  const placeInfo: PlaceInfo = placeInfoLoadable.contents || {
    placeName: '',
    id: 0,
    imageList: [],
    businessDay: [],
    businessTime: '',
    address: '',
    contactNum: '',
    instaId: '',
    kakaoMapUrl: '',
    naverMapUrl: '',
  };

  return (
    <PopUpWindow id="popUpWindow" available={!!placeInfo} tabState={tabState}>
      <BlurFrame id="popUpWindow_blurFrame" popUpState={tabState.popUpState}>
        <MakeLodableSuspense lodableState={placeInfoLoadable.state}>
          <Title placeName={placeInfo.placeName} />
        </MakeLodableSuspense>
        <MakeLodableSuspense lodableState={placeInfoLoadable.state}>
          <CustomCarousel imageList={placeInfo.imageList} />
        </MakeLodableSuspense>
        <TabBar isSelected />
        <Section>
          <MakeLodableSuspense lodableState={placeInfoLoadable.state}>
            <Information
              businessDay={placeInfo.businessDay}
              businessTime={placeInfo.businessTime}
              contactNum={placeInfo.contactNum}
              address={placeInfo.address}
            />
          </MakeLodableSuspense>
          <MapButtonList.List>
            <MapButtonList.Button onClick={() => placeInfo.naverMapUrl && window.open(placeInfo.naverMapUrl)}>
              네이버지도 길찾기
            </MapButtonList.Button>
            <MapButtonList.Button onClick={() => placeInfo.kakaoMapUrl && window.open(placeInfo.kakaoMapUrl)}>
              카카오맵 길찾기
            </MapButtonList.Button>
          </MapButtonList.List>
        </Section>
      </BlurFrame>
    </PopUpWindow>
  );
}

const BlurFrame = styled.div<{ popUpState: PopUpWindowState }>`
  width: 100%;
  height: 100%;
  margin-top: 29px;

  display: flex;
  flex-direction: column;

  ${(props) =>
    props.popUpState === 'full'
      ? css`
          background: transparent;
          backdrop-filter: blur(8px);
        `
      : css`
          background: white;
        `}
`;

const Section = styled.section`
  background-color: white;
  padding: 16px;
  flex: 1;
`;
