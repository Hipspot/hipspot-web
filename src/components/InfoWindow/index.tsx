import { useEffect } from 'react';
import styled from '@emotion/styled';
import { activatedCafeIdAtom, cafeInfoQuery, tabStateAtom } from '@states/infoWindow';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import MakeLodableSuspense from '@components/MakeLodableSuspense';
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import { DOMID_BLURFRAME, DOMID_IMAGE_SLIDER, DOMID_POP_UP_WINDOW, DOMTargetList } from '@constants/DOM';
import {
  CSSVAR_IMAGE_CONCEAL,
  CSSVAR_IMAGE_SLIDER_HEIGHT,
  CSSVAR_IMAGE_SLIDER_TRANSITION_DURATION,
  CSSVAR_IMAGE_SLIDER_WIDTH,
  CSSVAR_IMAGE_TRANSLATE,
} from '@constants/cssVar';
import * as MapButtonList from './Contents/MapButtonList';
import TabBar from './Contents/TabBar';
import Title, { TitleSkeleton } from './Contents/Title';
import Information, { InformationSkeleton } from './Contents/Information';
import PopUpWindow from './Contents/PopUpWindow';
import BlurFrame from './Contents/BlurFrame';
import ImageSlider, { CustomImageSliderSkeleton } from './Contents/ImageSlider';

export default function InfoWindow() {
  const tabState = useRecoilValue(tabStateAtom);
  const activatedCafeId = useRecoilValue(activatedCafeIdAtom);
  const { state, contents } = useRecoilValueLoadable(cafeInfoQuery(activatedCafeId));

  useEffect(() => {
    window.addEventListener('resize', (e) => {
      e.stopPropagation();
      popUpHeights[PopUpHeightsType.middle] = window.innerHeight * 0.6;
      popUpHeights[PopUpHeightsType.bottom] = window.innerHeight - 30;
    });
  }, []);

  useEffect(() => {
    if (!contents) return;
    DOMTargetList[DOMID_BLURFRAME] = document.getElementById(DOMID_BLURFRAME);
    DOMTargetList[DOMID_IMAGE_SLIDER] = document.getElementById(DOMID_IMAGE_SLIDER);
    DOMTargetList[DOMID_POP_UP_WINDOW] = document.getElementById(DOMID_POP_UP_WINDOW);
  }, [contents]);

  return contents ? (
    <PopUpWindow data-testid={DOMID_POP_UP_WINDOW} id={DOMID_POP_UP_WINDOW} available={!!contents} tabState={tabState}>
      <BlurFrame id={DOMID_BLURFRAME} tabState={tabState}>
        <TopSection>
          <TitleWrapper>
            <MakeLodableSuspense lodableState={state} loading={<TitleSkeleton />}>
              <Title placeName={contents.placeName} />
            </MakeLodableSuspense>
          </TitleWrapper>
          <ImageSliderWrapper id={DOMID_IMAGE_SLIDER}>
            <MakeLodableSuspense lodableState={state} loading={<CustomImageSliderSkeleton />}>
              <ImageSlider imageList={contents.imageList} wrapperId={DOMID_IMAGE_SLIDER} />
            </MakeLodableSuspense>
          </ImageSliderWrapper>
          <TabBar isSelected isBookmarked={state === 'hasValue' ? contents.isBookmarked : null} />
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
    <Loading data-testid="loading" />
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
const ImageSliderWrapper = styled.div`
  :root {
    ${CSSVAR_IMAGE_TRANSLATE}: translateX(0px);
    ${CSSVAR_IMAGE_SLIDER_HEIGHT} : 0px;
    ${CSSVAR_IMAGE_SLIDER_WIDTH} : 0px;
    ${CSSVAR_IMAGE_SLIDER_TRANSITION_DURATION} : 0s;
    ${CSSVAR_IMAGE_CONCEAL} : block;
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 60px;
  background-color: white;
  display: flex;
  justify-content: center;
`;
