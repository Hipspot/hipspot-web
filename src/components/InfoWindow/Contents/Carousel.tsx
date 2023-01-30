import styled from '@emotion/styled';
import { Carousel } from 'react-responsive-carousel';

interface CarouselProps {
  imageList: string[];
}

function CustomCarousel({ imageList }: CarouselProps) {
  return (
    <div>
      <StyledCarousel
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
      </StyledCarousel>
    </div>
  );
}

export default CustomCarousel;
const StyledCarousel = styled(Carousel)`
  padding: 0px 16px;

  img {
    height: 343px;
    object-fit: cover;
    object-position: center;
  }

  li img {
    border-radius: 8px;
  }

  .carousel-status {
    height: 24px;
    width: 40px;
    border-radius: 12px;

    background: #0000006b;

    font-family: 'Pretendard';
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;

    box-sizing: border-box;

    padding: 2px 0px;

    position: absolute;
    top: 314px;
    right: 8px;
  }
`;
