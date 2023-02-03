import { EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import { popUpHeights } from '@constants/popUpHeights';
import { PopUpWindowState } from '@libs/types/infowindow';
import { useEffect, useState } from 'react';
import Loading from 'react-loading';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slide from '../ImageSlider';
import { handleSlidePopUpWindowForCarousel as handleSlidePopUpWindow } from './eventHandler/slideUpWindow';
import * as S from './style';

interface CarouselProps {
  id: string;
  imageList: string[];
  popUpState: PopUpWindowState;
}

function CustomCarousel({ id, imageList, popUpState }: CarouselProps) {
  const onSlidePopUpWindow = handleSlidePopUpWindow({ popUpHeights });
  const [imageIndex, setImageIndex] = useState<number>(0);

  useEffect(() => {
    const elem = document.getElementById(id);
    if (elem !== null) {
      elem.removeEventListener(EVENT_SLIDE_UP_WINDOW, onSlidePopUpWindow);
      elem.addEventListener(EVENT_SLIDE_UP_WINDOW, onSlidePopUpWindow);
    }
  }, []);

  return (
    <div id={id}>
      {popUpState === 'full' ? (
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
        <Slide imageList={imageList} imageIndex={imageIndex} />
      )}
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
