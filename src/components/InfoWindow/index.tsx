import styled from '@emotion/styled';
import { tabStateAtom } from '@states/infoWindow';
import { useRecoilValue } from 'recoil';
import { TabState } from '@libs/types/infowindow';
import { CancelIcon, ClockIcon, CopyIcon, MarkerIcon, PhoneIcon } from '@assets';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { CafeInfo } from '@libs/types/cafe';
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import { copyToClipboard, stringifyBusinessDate } from '@libs/utils/cafeInfo';
import PopUpWindow from './PopUpWindow';
import * as Information from './Contents/Information';
import * as MapButtonList from './Contents/MapButtonList';
import * as Title from './Contents/Title';
import * as TabBar from './Contents/TabBar';

type InfoWindowProps = {
  cafeInfo: CafeInfo | null;
};

export default function InfoWindow({ cafeInfo }: InfoWindowProps) {
  const smoothLoopId: { id: number } = { id: -1 };
  const tabState = useRecoilValue<TabState>(tabStateAtom);

  return (
    <PopUpWindow id="popUpWindow" tabState={tabState} smoothLoopId={smoothLoopId}>
      {/* TODO 데이터 없을 때 로딩 보여주기 */}
      {cafeInfo &&
        (tabState.top === popUpHeights[PopUpHeightsType.top] ? (
          <BlurFrame>
            <Title.Wrapper>
              <Title.Name>{cafeInfo.placeName}</Title.Name>
              <Title.Icon>
                <CancelIcon />
              </Title.Icon>
            </Title.Wrapper>

            <StyledCarousel
              infiniteLoop
              showIndicators={false}
              showThumbs={false}
              showArrows={false}
              statusFormatter={(currentItem: number, total: number) => `${currentItem}/${total}`}
            >
              {cafeInfo.imageList.map((image) => (
                <div key={image}>
                  <img src={image} alt="" />
                </div>
              ))}
            </StyledCarousel>

            <TabBar.Wrapper>
              <TabBar.Tab isSelected>업체제공사진</TabBar.Tab>
              <TabBar.Tab>메뉴</TabBar.Tab>
              <TabBar.Tab>인스타그램</TabBar.Tab>
            </TabBar.Wrapper>

            <Section>
              {[
                {
                  title: '영업시간',
                  icon: <ClockIcon />,
                  description: stringifyBusinessDate({
                    businessDay: cafeInfo.businessDay,
                    businessTime: cafeInfo.businessTime,
                  }),
                },
                { title: cafeInfo.address, icon: <MarkerIcon /> },
                { title: cafeInfo.contactNum, icon: <PhoneIcon /> },
              ].map(({ title, icon, description }) => (
                <Information.Wrapper key={title}>
                  <Information.Icon>{icon}</Information.Icon>
                  <Information.Contents>
                    <Information.Title>{title}</Information.Title>
                    {description && <Information.Description>{description}</Information.Description>}
                  </Information.Contents>
                  {title === cafeInfo.address && <CopyIcon onClick={() => copyToClipboard(title)} />}
                </Information.Wrapper>
              ))}

              <MapButtonList.List>
                <MapButtonList.Button onClick={() => cafeInfo.naverMapUrl && window.open(cafeInfo.naverMapUrl)}>
                  네이버지도 길찾기
                </MapButtonList.Button>
                <MapButtonList.Button onClick={() => cafeInfo.kakaoMapUrl && window.open(cafeInfo.kakaoMapUrl)}>
                  카카오맵 길찾기
                </MapButtonList.Button>
              </MapButtonList.List>
            </Section>
          </BlurFrame>
        ) : (
          <WhiteFrame>
            <h2>{cafeInfo.placeName}</h2>
            <Slide>
              {cafeInfo.imageList.map((image) => (
                <img key={image} src={image} alt="" />
              ))}
            </Slide>
          </WhiteFrame>
        ))}
    </PopUpWindow>
  );
}

const BlurFrame = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 29px;

  display: flex;
  flex-direction: column;

  background: transparent;
  backdrop-filter: blur(8px);
`;

const WhiteFrame = styled.div`
  width: 100%;
  height: 100%;

  margin-top: 29px;

  display: flex;
  flex-direction: column;

  background: white;

  h2 {
    padding: 16px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;

    color: #0d0d0d;
  }
`;

const Slide = styled.div`
  width: 100%;
  padding-left: 16px;

  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  z-index: 1001;

  img {
    border-radius: 8px;
    flex: 0 0 auto;
    width: 186px;
    height: 186px;
    object-fit: cover;
    object-position: center;
  }
`;

const Section = styled.section`
  background-color: white;
  padding: 16px;
  flex: 1;
`;

const StyledCarousel = styled(Carousel)`
  padding: 0px 16px;

  img {
    height: 343px;
    object-fit: cover;
    object-position: center;
  }

  li img {
    border-radius: 8px;
  }

  .carousel-status {
    height: 24px;
    width: 40px;
    border-radius: 12px;

    background: #0000006b;

    font-family: 'Pretendard';
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;

    box-sizing: border-box;

    padding: 2px 0px;

    position: absolute;
    top: 314px;
    right: 8px;
  }
`;
