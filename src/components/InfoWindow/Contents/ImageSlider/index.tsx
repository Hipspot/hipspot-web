import { CSSVAR_CAROUSEL_HEIGHT } from '@constants/cssVar';
import styled from '@emotion/styled';
import { ImageSliderRef } from '@libs/types/slider';
import { useRef } from 'react';
import { handleMouseDown, handleMouseMove, handleMouseUp } from './eventHandler/mouse';
import { handleTouchEnd, handleTouchMove, handleTouchStart } from './eventHandler/touch';

interface SlideProps {
  imageList: string[];
  imageIndex: number;
}

function ImageSliderSlide({ imageList, imageIndex }: SlideProps) {
  const imageSliderRef = useRef<ImageSliderRef>({ x: 0, y: 0, left: 0, onHandling: false });

  const onMouseDown = handleMouseDown({ imageSliderRef });
  const onMouseMove = handleMouseMove({ imageSliderRef });
  const onMouseUp = handleMouseUp({ imageIndex, imageSliderRef });
  const onTouchStart = handleTouchStart({ imageSliderRef });
  const onTouchMove = handleTouchMove({ imageSliderRef });
  const onTouchEnd = handleTouchEnd({ imageIndex, imageSliderRef });

  return (
    <SlideContainer
      imageIndex={imageIndex}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {imageList.map((imageSrc) => (
        <Image src={imageSrc} key={imageSrc} />
      ))}
    </SlideContainer>
  );
}

export default ImageSliderSlide;

const SlideContainer = styled.div<{ imageIndex: number }>`
  width: 100%;
  height: var(--carouset-height);
  padding-left: 16px;
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  overflow: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  z-index: 11;
  :root {
    --image-translate: translateX(0px);
  }
`;
const Image = styled.img`
  border-radius: 8px;
  flex: 0 0 auto;
  width: var(${CSSVAR_CAROUSEL_HEIGHT});
  height: var(${CSSVAR_CAROUSEL_HEIGHT});

  transform: translate3d(var(--image-translate), 0px, 0px);
  object-fit: cover;
  object-position: center;
`;
