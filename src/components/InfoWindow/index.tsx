import { useEffect } from 'react';
import { activatedCafeIdAtom, cafeInfoQuery, tabStateAtom } from '@states/infoWindow';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import MakeLodableSuspense from '@components/MakeLodableSuspense';
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import { DOMID_BLURFRAME, DOMID_IMAGE_SLIDER, DOMID_POP_UP_WINDOW, DOMTargetList } from '@constants/DOM';
import { CafeInfo } from '@libs/types/cafe';
import * as S from './style';
import * as MapButtonList from './Contents/MapButtonList';
import Title, { TitleSkeleton } from './Contents/Title';
import Information, { InformationSkeleton } from './Contents/Information';
import BlurFrame from './Contents/BlurFrame';
import { CustomImageSliderSkeleton } from './Contents/ImageSlider';
import ImageListTab from './Contents/ImageListTab';
import PopUpWindow from './Contents/PopUpWindow';

export default function InfoWindow() {
  const tabState = useRecoilValue(tabStateAtom);
  const activatedCafeId = useRecoilValue(activatedCafeIdAtom);
  const lodable = useRecoilValueLoadable(cafeInfoQuery(activatedCafeId));
  const { state } = lodable;
  const contents = lodable.contents as CafeInfo;

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

  return (
    <PopUpWindow.Layout data-testid={DOMID_POP_UP_WINDOW} id={DOMID_POP_UP_WINDOW} tabState={tabState}>
      <PopUpWindow.Handler available={!!contents} tabState={tabState} />
      {contents ? (
        <BlurFrame id={DOMID_BLURFRAME} tabState={tabState}>
          <S.TopSection>
            <S.TitleWrapper>
              <MakeLodableSuspense lodableState={state} loading={<TitleSkeleton />}>
                <Title placeName={contents.cafeName} />
              </MakeLodableSuspense>
            </S.TitleWrapper>
            <S.ImageSliderWrapper id={DOMID_IMAGE_SLIDER}>
              <MakeLodableSuspense lodableState={state} loading={<CustomImageSliderSkeleton />}>
                <ImageListTab cafeId={contents.cafeId} imageList={contents.imageList} wrapperId={DOMID_IMAGE_SLIDER} />
              </MakeLodableSuspense>
            </S.ImageSliderWrapper>
          </S.TopSection>
          <S.Section tabState={tabState}>
            <MakeLodableSuspense lodableState={state} loading={<InformationSkeleton />}>
              <Information
                openingHours={contents.openingHours}
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
          </S.Section>
        </BlurFrame>
      ) : (
        <S.Loading data-testid="loading" />
      )}
      <PopUpWindow.CloseButton data-testid="close_button" />
    </PopUpWindow.Layout>
  );
}
