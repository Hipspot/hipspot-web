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
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import { imageSliderHeightTween, imageSliderWidthTween } from '@constants/Tween';
import styled from '@emotion/styled';
import { ImageSliderRef } from '@libs/types/slider';
import { calcImageListPosition } from '@libs/utils/calc';
import { tabStateAtom } from '@states/infoWindow';
import { createCustomEvent } from '@libs/utils/customEvent';
import { useEffect, useRef, useState } from 'react';
import Loading from 'react-loading';
import { useRecoilState } from 'recoil';
import { reactRefUpdate } from '../PopUpWindow/utils/reactRefUpdate';
import { handleMouseDown, handleMouseMove, handleMouseUp } from './eventHandler/mouse';
import { handleSlidePopUpWindowForImageSlide } from './eventHandler/slideUpWindow';
import { handleTouchEnd, handleTouchMove, handleTouchStart } from './eventHandler/touch';

interface SlideProps {
  wrapperId: string;
  imageList: string[];
}

function ImageSlider({ wrapperId, imageList }: SlideProps) {
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

  const { max, min } = imageSliderWidthTween;

  const onMouseDownCapture = handleMouseDown({ imageSliderRef });
  const onMouseMoveCapture = handleMouseMove({ imageSliderRef });
  const onMouseUpCapture = handleMouseUp({ imageSliderRef, setImageIndex });
  const onTouchStartCapture = handleTouchStart({ imageSliderRef });
  const onTouchMoveCapture = handleTouchMove({ imageSliderRef }) as unknown as (e: TouchEvent) => void;
  const onTouchEndCapture = handleTouchEnd({ imageSliderRef, setImageIndex });

  const onSlidePopUpWindow = handleSlidePopUpWindowForImageSlide({ popUpHeights });

  useEffect(() => {
    const elem = document.getElementById(wrapperId);
    if (elem !== null) {
      elem.removeEventListener(EVENT_SLIDE_UP_WINDOW, onSlidePopUpWindow);
      elem.addEventListener(EVENT_SLIDE_UP_WINDOW, onSlidePopUpWindow);
    }
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
      left: imageSliderRef.current.left,
      width: blockWidth,
      index: imageIndex,
    });

    stopImageSlideTransition();
    moveImageSlider({ left: leftCorrectionValue });
    reactRefUpdate({
      ref: imageSliderRef,
      update: { ...imageSliderRef.current, x: 0, startX: 0, onHandling: false, left: leftCorrectionValue },
    });
  }, [tabState]);

  useEffect(() => {
    const dom = DOMTargetList[DOMID_IMAGE_SLIDER_CONTAINER];
    if (dom) {
      dom.addEventListener('touchmove', onTouchMoveCapture, { passive: false });
    }
    return () => {
      dom?.removeEventListener('touchmove', onTouchMoveCapture, false);
    };
  }, []);

  return (
    <SliderWrapper>
      <SlideContainer
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
              setTabState((prev) => ({ ...prev, top: popUpHeights[PopUpHeightsType.top], popUpState: 'full' }));
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
