interface IImageSliderModel {
  onHandling: boolean;
  x: number;
  startX: number;
  index: number;
  left: number;
  imageListLength: number;
  update(partial: Partial<IImageSliderModel>): void;
  update<T extends keyof IImageSliderModel>(key: T, value: this[T]): void;
}

export class ImageSliderModel implements IImageSliderModel {
  onHandling: boolean;

  x: number;

  startX: number;

  index: number;

  left: number;

  imageListLength: number;

  constructor() {
    this.onHandling = false;
    this.x = 0;
    this.startX = 0;
    this.index = 0;
    this.left = 0;
    this.imageListLength = 0;
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
      case 'startX':
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
