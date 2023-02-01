import { EVENT_CHANGE_CAROUSEL } from '@constants/event';
import { useEffect } from 'react';
import Loading from 'react-loading';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { handleCarouselChange } from './eventHandler/carouselChange';
import * as S from './style';

interface CarouselProps {
  id: string;
  imageList: string[];
}

function CustomCarousel({ id, imageList }: CarouselProps) {
  useEffect(() => {
    const elem = document.getElementById(id);
    if (elem !== null) {
      elem.removeEventListener(EVENT_CHANGE_CAROUSEL, handleCarouselChange);
      elem.addEventListener(EVENT_CHANGE_CAROUSEL, handleCarouselChange);
    }
  }, []);

  return (
    <div id={id}>
      <S.StyledCarousel
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        showArrows={false}
        statusFormatter={(currentItem: number, total: number) => `${currentItem}/${total}`}
      >
        {imageList.map((image) => (
          <div key={image}>
            <img src={image} alt="" />
          </div>
        ))}
      </S.StyledCarousel>
    </div>
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
