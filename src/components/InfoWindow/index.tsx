import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { tabStateAtom } from '@states/infoWindowState';
import { TabState } from '@libs/types/infowindow';
import { CancelIcon, ClockIcon, CopyIcon, MarkerIcon, PhoneIcon } from '@assets';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { PlaceInfo } from '@libs/types/place';
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import PopUpWindow from './PopUpWindow';
import * as Information from './Contents/Information';
import * as MapButtonList from './Contents/MapButtonList';
import * as Title from './Contents/Title';
import * as TabBar from './Contents/TabBar';

export default function InfoWindow() {
  const smoothLoopId: { id: number } = { id: -1 };
  const [tabState, setTabState] = useRecoilState<TabState>(tabStateAtom);

  // TODO: 서버에서 받아온 데이터로 변경
  const info: PlaceInfo = {
    id: 1,
    placeName: 'Honor',
    address: '서울 노원구 공릉동 12길34',
    contactNum: '010-1234-5678',
    businessDay: ['월', '화', '수', '목', '금', '토', '일'],
    businessTime: '9:00~23:00',
    imageList: [
      'https://user-images.githubusercontent.com/108210492/212647596-3a2cf836-69e8-485a-b93d-4fb4642b935a.png',
      'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
      'https://www.gyeongju.go.kr/upload/content/thumb/20200409/069148D14AFC4BE799F223B16967BF37.jpg',
    ],
    instaId: 'honor_cafe',
    kakaoMapUrl: 'https://map.kakao.com/link/map/카페 힙스팟,37.5446694,127.051352',
    naverMapUrl: 'https://map.naver.com/v5/search/%EC%B9%B4%ED%8E%98%ED%9E%99%EC%8A%A4%ED%8C%9F/place/1234567890',
  };

  useEffect(() => {
    const { innerHeight } = window;
    setTabState({
      onHandling: true,
      top: innerHeight - 30,
      popUpState: 'thumbNail',
    });
  }, [setTabState]);

  return tabState.top === popUpHeights[PopUpHeightsType.top] ? (
    <PopUpWindow id="popUpWindow" tabState={tabState} smoothLoopId={smoothLoopId}>
      <BlurFrame>
        <Title.Wrapper>
          <Title.Name>{info.placeName}</Title.Name>
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
          {info.imageList.map((image) => (
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
              description: `${info.businessDay.join(', ')} ${info.businessTime}`,
            },
            { title: info.address, icon: <MarkerIcon /> },
            { title: info.contactNum, icon: <PhoneIcon /> },
          ].map(({ title, icon, description }) => (
            <Information.Wrapper key={title}>
              <Information.Icon>{icon}</Information.Icon>
              <Information.Contents>
                <Information.Title>{title}</Information.Title>

                {description && <Information.Description>{description}</Information.Description>}
              </Information.Contents>
              {title === info.address && <CopyIcon />}
            </Information.Wrapper>
          ))}

          <MapButtonList.List>
            <MapButtonList.Button onClick={() => info.naverMapUrl && window.open(info.naverMapUrl)}>
              네이버지도 길찾기
            </MapButtonList.Button>
            <MapButtonList.Button onClick={() => info.kakaoMapUrl && window.open(info.kakaoMapUrl)}>
              카카오맵 길찾기
            </MapButtonList.Button>
          </MapButtonList.List>
        </Section>
      </BlurFrame>
    </PopUpWindow>
  ) : (
    <PopUpWindow id="popUpWindow" tabState={tabState} smoothLoopId={smoothLoopId}>
      <WhiteFrame>
        <h2>{info.placeName}</h2>
        <Slide>
          {info.imageList.map((image) => (
            <img key={image} src={image} alt="" />
          ))}
        </Slide>
      </WhiteFrame>
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
