import { CSSVAR_CAROUSEL_HEIGHT } from '@constants/cssVar';
import { DOMID_CAROUSEL } from '@constants/DOM';
import { EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import { carouselHeightsTween } from '@constants/Tween';
import styled from '@emotion/styled';
import { SlideUpWindowEvent } from '@libs/types/customEvents';
import { ImageSliderRef } from '@libs/types/slider';
import { calcImageListPosition } from '@libs/utils/calc';
import { tabStateAtom } from '@states/infoWindow';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { reactRefUpdate } from '../PopUpWindow/utils/reactRefUpdate';
import { handleMouseDown, handleMouseMove, handleMouseUp } from './eventHandler/mouse';
import { handleTouchEnd, handleTouchMove, handleTouchStart } from './eventHandler/touch';

interface SlideProps {
  imageList: string[];
}

function ImageSlider({ imageList }: SlideProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [tabState, setTabState] = useRecoilState(tabStateAtom);
  const imageSliderRef = useRef<ImageSliderRef>({
    x: 0,
    startX: 0,
    left: 0,
    onHandling: false,
    index: 0,
    imageListLength: imageList.length,
  });
  const { max, min } = carouselHeightsTween;

  const onMouseDownCapture = handleMouseDown({ imageSliderRef });
  const onMouseMoveCapture = handleMouseMove({ imageSliderRef });
  const onMouseUpCapture = handleMouseUp({ imageSliderRef, setImageIndex });
  const onTouchStartCapture = handleTouchStart({ imageSliderRef });
  const onTouchMoveCapture = handleTouchMove({ imageSliderRef });
  const onTouchEndCapture = handleTouchEnd({ imageSliderRef, setImageIndex });

  useEffect(() => {
    const slideEvent: SlideUpWindowEvent = Object.assign(new Event(EVENT_SLIDE_UP_WINDOW), {
      currentTop: tabState.top,
    });
    const carousel = document.getElementById(DOMID_CAROUSEL) as HTMLDivElement;
    carousel.dispatchEvent(slideEvent);
    if (tabState.popUpState === 'half' || tabState.popUpState === 'thumbNail') {
      carousel.style.setProperty(CSSVAR_CAROUSEL_HEIGHT, `${min}px`);
    }
    if (tabState.popUpState === 'full') {
      carousel.style.setProperty(CSSVAR_CAROUSEL_HEIGHT, `${max}px`);
    }

    const value = tabState.popUpState === 'full' ? max : min;
    const blockWidth = value + 16;

    const leftCorrectionValue = calcImageListPosition({
      left: imageSliderRef.current.left,
      width: blockWidth,
      index: imageIndex,
    });
    carousel.style.setProperty('--image-translate', `${leftCorrectionValue}px`);
    carousel.style.setProperty('--transition-duration', `0s`);

    reactRefUpdate({
      ref: imageSliderRef,
      update: { ...imageSliderRef.current, x: 0, startX: 0, onHandling: false, left: leftCorrectionValue },
    });
  }, [tabState]);

  return (
    <SlideContainer
      onMouseMoveCapture={onMouseMoveCapture}
      onMouseDownCapture={onMouseDownCapture}
      onMouseUpCapture={onMouseUpCapture}
      onMouseLeave={onMouseUpCapture}
      onTouchStartCapture={onTouchStartCapture}
      onTouchMoveCapture={onTouchMoveCapture}
      onTouchEndCapture={onTouchEndCapture}
    >
      {imageList.map((imageSrc, i) => (
        <Image
          src={imageSrc}
          key={imageSrc}
          selected={i === imageIndex}
          initHeight={tabState.popUpState === 'full' ? max : min}
          className={`${i === imageIndex ? 'selected' : ''}`}
          onDoubleClick={() => {
            setTabState((prev) => ({ ...prev, top: popUpHeights[PopUpHeightsType.top], popUpState: 'full' }));
          }}
        />
      ))}
    </SlideContainer>
  );
}

export default ImageSlider;

const SlideContainer = styled.div`
  height: var(${CSSVAR_CAROUSEL_HEIGHT});
  padding-left: 16px;
  width: 1000vw;
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  transform: translate3d(var(--image-translate), 0px, 0px);
  transition: ease-in-out var(--transition-duration);
`;
const Image = styled.img<{ selected: boolean; initHeight: number }>`
  border-radius: 8px;
  flex: 0 0 auto;
  height: ${(props) => (props.selected ? `var(${CSSVAR_CAROUSEL_HEIGHT})` : `${props.initHeight}px`)};
  width: ${(props) => (props.selected ? `var(${CSSVAR_CAROUSEL_HEIGHT})` : `${props.initHeight}px`)};
  object-fit: cover;
  object-position: center;
`;
