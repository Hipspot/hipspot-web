import modifyImageSliderHeight from '@components/InfoWindow/view/modifyImageSliderHeight';
import modifyImageSliderWidth from '@components/InfoWindow/view/modifyImageSliderWidth';
import moveImageSlider from '@components/InfoWindow/view/moveImageSlider';
import stopImageSlideTransition from '@components/InfoWindow/view/stopImageSlideTransition';
import { DOMID_IMAGE_SLIDER, DOMID_IMAGE_SLIDER_CONTAINER, DOMTargetList } from '@constants/DOM';
import { EVENT_SLIDE_UP_WINDOW } from '@constants/event';
import { popUpHeights } from '@constants/popUpHeights';
import { imageSliderHeightTween, imageSliderWidthTween } from '@constants/Tween';
import { calcImageListPosition } from '@libs/utils/calc';
import { createCustomEvent } from '@libs/utils/customEvent';
import { useEffect, useState } from 'react';
import Loading from 'react-loading';
import { handleMouseDown, handleMouseMove, handleMouseUp } from './eventHandler/mouse';
import { handleSlidePopUpWindowForImageSlide } from './eventHandler/slideUpWindow';
import { handleTouchEnd, handleTouchMove, handleTouchStart } from './eventHandler/touch';
import usePopUpWindowLayoutControll from '../PopUpWindow/Contents/Layout/usePopUpWindowLayoutControll';
import ImageSliderModel from './model';
import * as S from './style';

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

  /**
   * touch, mouse event handler
   */
  const onMouseDownCapture = handleMouseDown({ model });
  const onMouseMoveCapture = handleMouseMove({ model });
  const onMouseUpCapture = handleMouseUp({ model, setImageIndex });
  const onTouchStartCapture = handleTouchStart({ model });
  const onTouchMoveCapture = handleTouchMove({ model }) as unknown as (e: TouchEvent) => void;
  const onTouchEndCapture = handleTouchEnd({ model, setImageIndex });
  const onSlidePopUpWindow = handleSlidePopUpWindowForImageSlide({ popUpHeights });

  // touchMoveEvent는 preventDefault를 위해 passive로 등록,
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

  /**
   * 이미지 슬라이더 초기화, model 초기화 및 imageList 맨 왼쪽으로 이동
   */
  useEffect(() => {
    model.init(imageList.length);
    stopImageSlideTransition();
    moveImageSlider({ left: 0 });
  }, [imageList]);

  /**
   * 이미지 슬라이더 엘리먼트 DOMTargetList에 캐싱
   */
  useEffect(() => {
    const wrapper = document.getElementById(wrapperId);
    const container = document.getElementById(DOMID_IMAGE_SLIDER_CONTAINER);
    DOMTargetList[wrapperId] = wrapper;
    DOMTargetList[DOMID_IMAGE_SLIDER_CONTAINER] = container;
  }, []);

  /**
   * SLIDE_UP_WINDOW 이벤트 리스너 등록
   */
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
    model.update({ x: 0, anchorX: 0, onHandling: false, left: leftCorrectionValue });
  }, [tabState]);

  return (
    <S.SliderWrapper>
      <S.SlideContainer
        id={DOMID_IMAGE_SLIDER_CONTAINER}
        onMouseMoveCapture={onMouseMoveCapture}
        onMouseDownCapture={onMouseDownCapture}
        onMouseUpCapture={onMouseUpCapture}
        onMouseLeave={onMouseUpCapture}
        onTouchStartCapture={onTouchStartCapture}
        onTouchEndCapture={onTouchEndCapture}
      >
        {imageList.map((imageSrc, i) => (
          <S.Image
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
      </S.SlideContainer>
    </S.SliderWrapper>
  );
}

export default ImageSlider;

export function CustomImageSliderSkeleton() {
  return (
    <S.SkeltonWrapper>
      <div>
        <Loading color="pink" />
      </div>
    </S.SkeltonWrapper>
  );
}
