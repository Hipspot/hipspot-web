import { popUpHeights } from '@constants/popUpHeights';

export enum Members {
  position,
  layoutState,
  point,
}

interface IPopUpWindowModel {
  position: { top: number };
  layoutState: { onGesture: boolean; timeStamp: number; onHandling: boolean };
  point: { clientX: number; clientY: number };
}

export class PopUpWindowModel implements IPopUpWindowModel {
  position: { top: number };

  layoutState: { onHandling: boolean; onGesture: boolean; timeStamp: number };

  point: { clientX: number; clientY: number };

  constructor() {
    this.position = { top: popUpHeights.invisible };
    this.layoutState = { onGesture: false, timeStamp: 0, onHandling: false };
    this.point = { clientX: 0, clientY: 0 };
  }

  update<T extends keyof typeof Members>(member: T, value: Partial<IPopUpWindowModel[T]>): void {
    if (!this.validateMemberValue(member, value)) return console.error('올바른 업데이트가 아닙니다', member);

    this[member] = { ...this[member], ...value };
  }

  // eslint-disable-next-line class-methods-use-this
  private validateMemberValue<T extends keyof typeof Members>(member: T, value: any): boolean {
    switch (member) {
      case 'position':
        return typeof value.top === 'number';
      case 'layoutState':
        return typeof value.onGesture === 'boolean' && typeof value.timeStamp === 'number';
      case 'point':
        return typeof value.clientX === 'number' && typeof value.clientY === 'number';
      default:
        return false;
    }
  }
}
