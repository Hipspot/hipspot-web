import styled from '@emotion/styled';
import { activatedCafeIdAtom, cafeInfoQuery, tabStateAtom } from '@states/infoWindow';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { css } from '@emotion/react';
import MakeLodableSuspense from '@components/MakeLodableSuspense';
import { PopUpWindowState } from '@libs/types/infowindow';
import { DOMID_BLURFRAME, DOMID_CAROUSEL, DOMID_POP_UP_WINDOW } from '@constants/DOMId';
import * as MapButtonList from './Contents/MapButtonList';
import TabBar from './Contents/TabBar';
import Title, { TitleSkeleton } from './Contents/Title';
import CustomCarousel, { CustomCarouselSkeleton } from './Contents/Carousel';
import Information, { InformationSkeleton } from './Contents/Information';
import PopUpWindow from './Contents/PopUpWindow';

export default function InfoWindow() {
  const tabState = useRecoilValue(tabStateAtom);
  const activatedCafeId = useRecoilValue(activatedCafeIdAtom);
  const { state, contents } = useRecoilValueLoadable(cafeInfoQuery(activatedCafeId));

  return contents ? (
    <PopUpWindow id={DOMID_POP_UP_WINDOW} available={!!contents} tabState={tabState}>
      <BlurFrame id={DOMID_BLURFRAME} popUpState={tabState.popUpState}>
        <TopSection>
          <TitleWrapper>
            <MakeLodableSuspense lodableState={state} loading={<TitleSkeleton />}>
              <Title placeName={contents.placeName} />
            </MakeLodableSuspense>
          </TitleWrapper>
          <CarouselWrapper>
            <MakeLodableSuspense lodableState={state} loading={<CustomCarouselSkeleton />}>
              <CustomCarousel imageList={contents.imageList} id={DOMID_CAROUSEL} />
            </MakeLodableSuspense>
          </CarouselWrapper>
          <TabBar isSelected />
        </TopSection>
        <Section>
          <MakeLodableSuspense lodableState={state} loading={<InformationSkeleton />}>
            <Information
              businessDay={contents.businessDay}
              businessTime={contents.businessTime}
              contactNum={contents.contactNum}
              address={contents.address}
            />
          </MakeLodableSuspense>
          <MapButtonList.List>
            <MapButtonList.Button onClick={() => contents.naverMapUrl && window.open(contents.naverMapUrl)}>
              네이버지도 길찾기
            </MapButtonList.Button>
            <MapButtonList.Button onClick={() => contents.kakaoMapUrl && window.open(contents.kakaoMapUrl)}>
              카카오맵 길찾기
            </MapButtonList.Button>
          </MapButtonList.List>
        </Section>
      </BlurFrame>
    </PopUpWindow>
  ) : (
    <Loading />
  );
}

const BlurFrame = styled.div<{ popUpState: PopUpWindowState }>`
  width: 100%;
  height: 100%;
  padding-top: 30px;

  display: flex;
  flex-direction: column;

  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${(props) =>
    props.popUpState === 'full'
      ? css`
          background: transparent;
          backdrop-filter: blur(8px);
        `
      : css`
          background: white;
        `};
`;

const TopSection = styled.section``;
const Section = styled.section`
  background-color: white;
  padding: 16px;
  flex: 1;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 56px;
  padding: 0px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CarouselWrapper = styled.div`
  height: var(--carousel-height, 343);
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 60px;
  background-color: white;
  display: flex;
  justify-content: center;
`;
