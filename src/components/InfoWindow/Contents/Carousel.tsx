import styled from '@emotion/styled';
import Loading from 'react-loading';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface CarouselProps {
  imageList: string[];
}

function CustomCarousel({ imageList }: CarouselProps) {
  return (
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
  );
}

export default CustomCarousel;

export function CustomCarouselSkeleton() {
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
  height: var(--carousel-height, 343);
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

const StyledCarousel = styled(Carousel)`
  padding: 0px 16px;
  height: var(--carousel-height, 343);
  img {
    height: inherit;
    object-fit: cover;
    object-position: center;
  }

  li img {
    height: var(--carousel-height, 343);
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
    top: calc(var(--carousel-height, 343) - 30px);
    right: 8px;
  }
`;
