import { useEffect } from 'react';
import styled from '@emotion/styled';
import { activatedCafeIdAtom, cafeInfoQuery, tabStateAtom } from '@states/infoWindow';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import MakeLodableSuspense from '@components/MakeLodableSuspense';
import { DOMID_BLURFRAME, DOMID_CAROUSEL, DOMID_POP_UP_WINDOW, DOMTargetList } from '@constants/DOM';
import * as MapButtonList from './Contents/MapButtonList';
import TabBar from './Contents/TabBar';
import Title, { TitleSkeleton } from './Contents/Title';
import CustomCarousel, { CustomCarouselSkeleton } from './Contents/Carousel';
import Information, { InformationSkeleton } from './Contents/Information';
import PopUpWindow from './Contents/PopUpWindow';
import BlurFrame from './Contents/BlurFrame';

export default function InfoWindow() {
  const tabState = useRecoilValue(tabStateAtom);
  const activatedCafeId = useRecoilValue(activatedCafeIdAtom);
  const { state, contents } = useRecoilValueLoadable(cafeInfoQuery(activatedCafeId));

  useEffect(() => {
    if (!contents) return;
    DOMTargetList[DOMID_BLURFRAME] = document.getElementById(DOMID_BLURFRAME);
    DOMTargetList[DOMID_CAROUSEL] = document.getElementById(DOMID_CAROUSEL);
    DOMTargetList[DOMID_POP_UP_WINDOW] = document.getElementById(DOMID_POP_UP_WINDOW);
  }, [contents]);

  return contents ? (
    <PopUpWindow id={DOMID_POP_UP_WINDOW} available={!!contents} tabState={tabState}>
      <BlurFrame id={DOMID_BLURFRAME} tabState={tabState}>
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
const CarouselWrapper = styled.div``;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 60px;
  background-color: white;
  display: flex;
  justify-content: center;
`;
