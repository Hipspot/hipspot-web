interface IImageSliderModel {
  onHandling: boolean;
  x: number;
  anchorX: number;
  index: number;
  left: number;
  imageListLength: number;
  update(partial: Partial<IImageSliderModel>): void;
  update<T extends keyof IImageSliderModel>(key: T, value: this[T]): void;
}

class ImageSliderModel implements IImageSliderModel {
  onHandling: boolean;

  x: number;

  anchorX: number;

  index: number;

  left: number;

  imageListLength: number;

  /**
   * @param onHandling 슬라이더를 움직이고 있는지 여부
   * @param x 실시간으로 움직이는 슬라이더의 x 좌표, 터치무브 이벤트마다의 이동거리를 계산하기 위해 사용
   * @param anchorX 터치 시작 시 x 좌표
   * @param index 이미지 슬라이더 가장 좌측에 보이는 사진의 인덱스값
   * @param left 이미지 슬라이더를 실제로 transfrom 해주는값
   * @param imageListLength 이미지 리스트 배열의 length, 이미지의 갯수를 의미
   */
  constructor() {
    this.onHandling = false;
    this.x = 0;
    this.anchorX = 0;
    this.index = 0;
    this.left = 0;
    this.imageListLength = 0;
  }

  init(imageListLength: number) {
    this.onHandling = false;
    this.x = 0;
    this.anchorX = 0;
    this.index = 0;
    this.left = 0;
    this.imageListLength = imageListLength;
  }

  update<T extends keyof IImageSliderModel>(...params: [Partial<IImageSliderModel>] | [T, this[T]]): void {
    if (params.length === 1 || typeof params[0] === 'object') {
      const partial = params[0];
      Object.entries(partial).forEach((entries) => {
        const [key, value] = entries as [T, this[T]];
        if (!this.validate(key, value)) return;
        this.update(key, value);
      });

      return;
    }

    if (params.length === 2) {
      const [key, value] = params;
      if (this.validate(key, value)) {
        this[key] = value;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  validate<T extends keyof IImageSliderModel>(key: T, value: this[T]): boolean {
    switch (key) {
      case 'x':
      case 'anchorX':
      case 'index':
      case 'left':
        if (Number.isNaN(value)) return false;
        break;
      case 'imageListLength':
        if (Number.isNaN(value) || typeof value !== 'number') return false; // 타입 검사 추가
        if (value <= 0) return false;
        break;
      case 'onHandling':
        if (typeof value !== 'boolean') return false;
        break;
      default:
        return false;
    }
    return true;
  }
}

export default ImageSliderModel;
