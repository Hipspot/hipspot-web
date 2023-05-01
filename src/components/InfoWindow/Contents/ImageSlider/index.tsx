import modifyImageSliderHeight from '@components/InfoWindow/view/modifyImageSliderHeight';
import modifyImageSliderWidth from '@components/InfoWindow/view/modifyImageSliderWidth';
import moveImageSlider from '@components/InfoWindow/view/moveImageSlider';
import stopImageSlideTransition from '@components/InfoWindow/view/stopImageSlideTransition';
import {
  CSSVAR_IMAGE_SLIDER_HEIGHT,
  CSSVAR_IMAGE_SLIDER_TRANSITION_DURATION,
  CSSVAR_IMAGE_SLIDER_WIDTH,
  CSSVAR_IMAGE_TRANSLATE,
} from '@constants/cssVar';
import { DOMID_IMAGE_SLIDER, DOMID_IMAGE_SLIDER_CONTAINER, DOMTargetList } from '@constants/DOM';
import { EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import { popUpHeights } from '@constants/popUpHeights';
import { imageSliderHeightTween, imageSliderWidthTween } from '@constants/Tween';
import styled from '@emotion/styled';
import { calcImageListPosition } from '@libs/utils/calc';
import { createCustomEvent } from '@libs/utils/customEvent';
import { useEffect, useState } from 'react';
import Loading from 'react-loading';
import { handleMouseDown, handleMouseMove, handleMouseUp } from './eventHandler/mouse';
import { handleSlidePopUpWindowForImageSlide } from './eventHandler/slideUpWindow';
import { handleTouchEnd, handleTouchMove, handleTouchStart } from './eventHandler/touch';
import usePopUpWindowLayoutControll from '../PopUpWindow/Contents/Layout/usePopUpWindowLayoutControll';
import { ImageSliderModel } from './model';

interface SlideProps {
  wrapperId: string;
  imageList: string[];
}

const model = new ImageSliderModel();

function ImageSlider({ wrapperId, imageList }: SlideProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const {
    tabState,
    method: { setPopUpWindowPosition },
  } = usePopUpWindowLayoutControll();

  const { max, min } = imageSliderWidthTween;

  const onMouseDownCapture = handleMouseDown({ model });
  const onMouseMoveCapture = handleMouseMove({ model });
  const onMouseUpCapture = handleMouseUp({ model, setImageIndex });
  const onTouchStartCapture = handleTouchStart({ model });
  const onTouchMoveCapture = handleTouchMove({ model }) as unknown as (e: TouchEvent) => void;
  const onTouchEndCapture = handleTouchEnd({ model, setImageIndex });

  const onSlidePopUpWindow = handleSlidePopUpWindowForImageSlide({ popUpHeights });

  useEffect(() => {
    model.update({
      onHandling: false,
      x: 0,
      startX: 0,
      imageListLength: imageList.length,
      left: 0,
      index: 0,
    });
    stopImageSlideTransition();
    moveImageSlider({ left: 0 });
  }, [imageList]);

  useEffect(() => {
    const wrapper = document.getElementById(wrapperId);
    const container = document.getElementById(DOMID_IMAGE_SLIDER_CONTAINER);
    DOMTargetList[wrapperId] = wrapper;
    DOMTargetList[DOMID_IMAGE_SLIDER_CONTAINER] = container;
  }, []);

  useEffect(() => {
    const slideEvent = createCustomEvent(EVENT_SLIDE_UP_WINDOW, {
      currentTop: tabState.top,
    });
    const carousel = document.getElementById(DOMID_IMAGE_SLIDER) as HTMLDivElement;
    carousel.dispatchEvent(slideEvent);

    if (tabState.popUpState === 'half' || tabState.popUpState === 'invisible') {
      modifyImageSliderHeight({ height: imageSliderHeightTween.min });
      modifyImageSliderWidth({ width: imageSliderWidthTween.min });
    }
    if (tabState.popUpState === 'full') {
      modifyImageSliderHeight({ height: imageSliderHeightTween.max });
      modifyImageSliderWidth({ width: imageSliderWidthTween.max });
    }

    const value = tabState.popUpState === 'full' ? max : min;
    const blockWidth = value + 16;

    const leftCorrectionValue = calcImageListPosition({
      left: model.left,
      width: blockWidth,
      index: imageIndex,
    });

    stopImageSlideTransition();
    moveImageSlider({ left: leftCorrectionValue });
    model.update({ x: 0, startX: 0, onHandling: false, left: leftCorrectionValue });
  }, [tabState]);

  useEffect(() => {
    const wrapper = document.getElementById(wrapperId);
    const container = document.getElementById(DOMID_IMAGE_SLIDER_CONTAINER);
    if (wrapper && container) {
      container.addEventListener('touchmove', onTouchMoveCapture, { passive: false });
      wrapper.addEventListener(EVENT_SLIDE_UP_WINDOW, onSlidePopUpWindow);
    }
    return () => {
      container?.removeEventListener('touchmove', onTouchMoveCapture, false);
      wrapper?.removeEventListener(EVENT_SLIDE_UP_WINDOW, onSlidePopUpWindow);
    };
  }, []);

  return (
    <SliderWrapper>
      <SlideContainer
        id={DOMID_IMAGE_SLIDER_CONTAINER}
        onMouseMoveCapture={onMouseMoveCapture}
        onMouseDownCapture={onMouseDownCapture}
        onMouseUpCapture={onMouseUpCapture}
        onMouseLeave={onMouseUpCapture}
        onTouchStartCapture={onTouchStartCapture}
        onTouchEndCapture={onTouchEndCapture}
      >
        {imageList.map((imageSrc, i) => (
          <Image
            src={imageSrc}
            key={imageSrc}
            selected={i === imageIndex}
            initSize={
              tabState.popUpState === 'full'
                ? { height: imageSliderHeightTween.max, width: imageSliderWidthTween.max }
                : { height: imageSliderWidthTween.min, width: imageSliderWidthTween.min }
            }
            onDoubleClick={() => {
              setPopUpWindowPosition({ to: 'full' });
            }}
          />
        ))}
      </SlideContainer>
    </SliderWrapper>
  );
}

export default ImageSlider;

export function CustomImageSliderSkeleton() {
  return (
    <SkeltonWrapper>
      <div>
        <Loading color="pink" />
      </div>
    </SkeltonWrapper>
  );
}

const SkeltonWrapper = styled.div`
  padding: 0px 16px;
  width: 100%;
  height: var(${CSSVAR_IMAGE_SLIDER_HEIGHT}, 343);
  & > div {
    background-color: #d6d6d6;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SliderWrapper = styled.div`
  overflow: hidden;
`;

const SlideContainer = styled.div`
  height: var(${CSSVAR_IMAGE_SLIDER_HEIGHT});
  padding-left: 16px;
  width: 1000vw;
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  transform: translate3d(var(${CSSVAR_IMAGE_TRANSLATE}), 0px, 0px);
  transition: ease-in-out var(${CSSVAR_IMAGE_SLIDER_TRANSITION_DURATION});
`;

const Image = styled.img<{ selected: boolean; initSize: { height: number; width: number } }>`
  border-radius: 8px;
  flex: 0 0 auto;
  height: ${(props) => (props.selected ? `var(${CSSVAR_IMAGE_SLIDER_HEIGHT})` : `${props.initSize.height}px`)};
  width: ${(props) => (props.selected ? `var(${CSSVAR_IMAGE_SLIDER_WIDTH})` : `${props.initSize.width}px`)};
  object-fit: cover;
  object-position: center;
  position: relative;
  z-index: ${(props) => (props.selected ? 11 : 1)};
`;
