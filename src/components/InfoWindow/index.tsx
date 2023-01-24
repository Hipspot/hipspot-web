import { useEffect } from 'react';
import styled from '@emotion/styled';
import { tabStateAtom } from '@recoil/infoWindowState';
import { useRecoilState } from 'recoil';
import { TabState } from '@libs/types/infowindow';
import { CancelIcon, ClockIcon, CopyIcon, MarkerIcon, PhoneIcon } from '@assets';
import { Tab, TabBar } from '@components/InfoWindow/Contents/Tab';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import * as Title from './Contents/Title';
import PopUpWindow from './PopUpWindow';
import * as Information from './Contents/Information';
import * as MapButtonList from './Contents/MapButtonList';

export default function InfoWindow() {
  const smoothLoopId: { id: number } = { id: -1 };
  const [tabState, setTabState] = useRecoilState<TabState>(tabStateAtom);

  useEffect(() => {
    const { innerHeight } = window;
    setTabState({
      onHandling: true,
      top: innerHeight - 30,
      popUpState: 'thumbNail',
    });
  }, [setTabState]);

  return (
    <PopUpWindow id="popUpWindow" tabState={tabState} smoothLoopId={smoothLoopId}>
      <Title.Wrapper>
        <Title.Name>Honor</Title.Name>
        <Title.Icon>
          <CancelIcon />
        </Title.Icon>
      </Title.Wrapper>
      <TabBar>
        <Tab className="selected">업체제공사진</Tab>
        <Tab className="">메뉴</Tab>
        <Tab className="">인스타그램</Tab>
      </TabBar>
      <Section>
        <StyledCarousel
          infiniteLoop
          showIndicators={false}
          showThumbs={false}
          showArrows={false}
          statusFormatter={(currentItem: number, total: number) => `${currentItem}/${total}`}
        >
          <div>
            <img
              src="https://user-images.githubusercontent.com/108210492/212647596-3a2cf836-69e8-485a-b93d-4fb4642b935a.png"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
              alt=""
            />
          </div>
        </StyledCarousel>

        <Information.Item>
          <div className="left">
            <ClockIcon />
          </div>
          <Information.Right>
            <Information.ItemTitle>영업시간</Information.ItemTitle>
            <Information.ItemDescription>월, 화, 수, 목, 금, 토, 일 9:00~23:00</Information.ItemDescription>
          </Information.Right>
        </Information.Item>

        <Information.Item>
          <div className="left">
            <MarkerIcon />
          </div>
          <Information.Right>
            <Information.ItemTitle>서울 노원구 공릉동 12길34</Information.ItemTitle>
          </Information.Right>
          <CopyIcon />
        </Information.Item>

        <Information.Item>
          <div className="left">
            <PhoneIcon />
          </div>
          <Information.Right>
            <Information.ItemTitle>010-1234-5678</Information.ItemTitle>
          </Information.Right>
        </Information.Item>
        <MapButtonList.List>
          <MapButtonList.Button>네이버지도 길찾기</MapButtonList.Button>
          <MapButtonList.Button>카카오맵 길찾기</MapButtonList.Button>
        </MapButtonList.List>
      </Section>
    </PopUpWindow>
  );
}

const Section = styled.section`
  background-color: white;
  height: 100%;
  padding: 16px;
`;

const StyledCarousel = styled(Carousel)`
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
