/* eslint-disable react/button-has-type */
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
        <Information>
          <div className="item">
            <div className="left">
              <ClockIcon />
            </div>
            <div className="right">
              <div className="itemTitle">영업시간</div>
              <div className="itemDescription">월, 화, 수, 목, 금, 토, 일 9:00~23:00</div>
            </div>
          </div>

          <div className="item">
            <div className="left">
              <MarkerIcon />
            </div>
            <div className="right">
              <div className="itemTitle">서울 노원구 공릉동 12길34</div>
            </div>
            <CopyIcon />
          </div>

          <div className="item">
            <div className="left">
              <PhoneIcon />
            </div>
            <div className="right">
              <div className="itemTitle">010-1234-5678</div>
            </div>
          </div>
        </Information>
        <MapButtonList>
          <button>네이버지도 길찾기</button>
          <button>카카오맵 길찾기</button>
        </MapButtonList>
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

const Information = styled.div`
  .item {
    display: flex;
    padding: 24px 0px;
    gap: 12px;

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .itemTitle {
        font-family: 'Pretendard';
        font-weight: 600;
        line-height: 24px;
        color: #181818;
      }

      .itemDescription {
        font-family: 'Pretendard';
        line-height: 24px;
        color: #868686;
      }
    }

    border-bottom: solid #efefef 1px;
  }
`;

const MapButtonList = styled.div`
  margin-top: 26px;
  display: flex;
  gap: 10px;

  button {
    height: 56px;
    border: none;
    background: #262626;
    border-radius: 8px;
    flex: 1;

    font-family: 'Pretendard';
    font-weight: 600;
    line-height: 24px;
    color: white;
  }
`;
