import ImageSliderModel from '@components/InfoWindow/Contents/ImageSlider/model';

export interface HandleImageSliderStartProps {
  model: ImageSliderModel;
}

export interface HandleImageSlideMoveProps {
  model: ImageSliderModel;
}

export interface HandleImageSliderEndProps {
  model: ImageSliderModel;
  setImageIndex: React.Dispatch<React.SetStateAction<number>>;
}
