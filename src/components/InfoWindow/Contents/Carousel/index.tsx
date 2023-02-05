import { EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import { popUpHeights } from '@constants/popUpHeights';
import { useEffect } from 'react';
import Loading from 'react-loading';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ImageSlider from '../ImageSlider';
import { handleSlidePopUpWindowForCarousel as handleSlidePopUpWindow } from './eventHandler/slideUpWindow';
import * as S from './style';

interface CarouselProps {
  id: string;
  imageList: string[];
}

function CustomCarousel({ id, imageList }: CarouselProps) {
  const onSlidePopUpWindow = handleSlidePopUpWindow({ popUpHeights });

  useEffect(() => {
    const elem = document.getElementById(id);
    if (elem !== null) {
      elem.removeEventListener(EVENT_SLIDE_UP_WINDOW, onSlidePopUpWindow);
      elem.addEventListener(EVENT_SLIDE_UP_WINDOW, onSlidePopUpWindow);
    }
  }, []);

  return (
    <S.ComponentWrapper id={id}>
      <ImageSlider imageList={imageList} />
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
