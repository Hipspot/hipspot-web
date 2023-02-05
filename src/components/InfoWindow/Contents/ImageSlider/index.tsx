import { CSSVAR_CAROUSEL_HEIGHT } from '@constants/cssVar';
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import styled from '@emotion/styled';
import { ImageSliderRef } from '@libs/types/slider';
import { tabStateAtom } from '@states/infoWindow';
import { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { handleMouseDown, handleMouseMove, handleMouseUp } from './eventHandler/mouse';
import { handleTouchEnd, handleTouchMove, handleTouchStart } from './eventHandler/touch';

interface SlideProps {
  imageList: string[];
  imageIndex: number;
}

function ImageSlider({ imageList, imageIndex }: SlideProps) {
  const setTabState = useSetRecoilState(tabStateAtom);
  const imageSliderRef = useRef<ImageSliderRef>({
    x: 0,
    startX: 0,
    left: 0,
    onHandling: false,
    index: 0,
    imageListLength: imageList.length,
  });

  const onMouseDownCapture = handleMouseDown({ imageSliderRef });
  const onMouseMoveCapture = handleMouseMove({ imageSliderRef });
  const onMouseUpCapture = handleMouseUp({ imageIndex, imageSliderRef });
  const onTouchStartCapture = handleTouchStart({ imageSliderRef });
  const onTouchMoveCapture = handleTouchMove({ imageSliderRef });
  const onTouchEndCapture = handleTouchEnd({ imageIndex, imageSliderRef });

  return (
    <SlideContainer
      imageIndex={imageIndex}
      onMouseMoveCapture={onMouseMoveCapture}
      onMouseDownCapture={onMouseDownCapture}
      onMouseUpCapture={onMouseUpCapture}
      onMouseLeave={onMouseUpCapture}
      onTouchStartCapture={onTouchStartCapture}
      onTouchMoveCapture={onTouchMoveCapture}
      onTouchEndCapture={onTouchEndCapture}
    >
      {imageList.map((imageSrc) => (
        <Image
          src={imageSrc}
          key={imageSrc}
          onDoubleClick={() => {
            setTabState((prev) => ({ ...prev, top: popUpHeights[PopUpHeightsType.top], popUpState: 'full' }));
          }}
        />
      ))}
    </SlideContainer>
  );
}

export default ImageSlider;

const SlideContainer = styled.div<{ imageIndex: number }>`
  height: var(--carouset-height);
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
  :root {
    --image-translate: translateX(0px);
    --transition-duration: 0s;
  }
  transform: translate3d(var(--image-translate), 0px, 0px);
  transition: ease-in-out var(--transition-duration);
`;
const Image = styled.img`
  border-radius: 8px;
  flex: 0 0 auto;
  width: var(${CSSVAR_CAROUSEL_HEIGHT});
  height: var(${CSSVAR_CAROUSEL_HEIGHT});
  object-fit: cover;
  object-position: center;
`;
