import { DOMID_BLURFRAME, DOMID_CAROUSEL } from '@constants/DOMId';
import { EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import { popUpHeights } from '@constants/popUpHeights';
import { SlideUpWindowEvent } from '@libs/types/customEvents';
import { TabState } from '@libs/types/infowindow';
import { useEffect, useState } from 'react';
import Loading from 'react-loading';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ImageSlider from '../ImageSlider';
import { handleSlidePopUpWindowForCarousel as handleSlidePopUpWindow } from './eventHandler/slideUpWindow';
import * as S from './style';

interface CarouselProps {
  id: string;
  imageList: string[];
  tabState: TabState;
}

function CustomCarousel({ id, imageList, tabState }: CarouselProps) {
  const onSlidePopUpWindow = handleSlidePopUpWindow({ popUpHeights });
  const [imageIndex, setImageIndex] = useState<number>(0);

  useEffect(() => {
    const elem = document.getElementById(id);
    if (elem !== null) {
      elem.removeEventListener(EVENT_SLIDE_UP_WINDOW, onSlidePopUpWindow);
      elem.addEventListener(EVENT_SLIDE_UP_WINDOW, onSlidePopUpWindow);
    }
  }, []);

  useEffect(() => {
    const slideEvent: SlideUpWindowEvent = Object.assign(new Event(EVENT_SLIDE_UP_WINDOW), {
      currentTop: tabState.top,
    });

    document.getElementById(DOMID_CAROUSEL)?.dispatchEvent(slideEvent);
    document.getElementById(DOMID_BLURFRAME)?.dispatchEvent(slideEvent);
  }, [tabState]);
  return (
    <S.ComponentWrapper id={id}>
      {tabState.popUpState === 'full' ? (
        <S.StyledCarousel
          infiniteLoop
          showIndicators={false}
          showThumbs={false}
          showArrows={false}
          statusFormatter={(currentItem: number, total: number) => `${currentItem}/${total}`}
          onChange={(index) => {
            setImageIndex(index);
          }}
        >
          {imageList.map((image) => (
            <div key={image}>
              <img src={image} alt="" />
            </div>
          ))}
        </S.StyledCarousel>
      ) : (
        <ImageSlider imageList={imageList} imageIndex={imageIndex} />
      )}
    </S.ComponentWrapper>
  );
}

export default CustomCarousel;

export function CustomCarouselSkeleton() {
  return (
    <S.SkeltonWrapper>
      <div>
        <Loading color="pink" />
      </div>
    </S.SkeltonWrapper>
  );
}
