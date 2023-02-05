export const DOMID_POP_UP_WINDOW = 'pop_up_window';
export const DOMID_BLURFRAME = 'blur_frame';
export const DOMID_CAROUSEL = 'carousel';

export const DOMTargetList: { [key in string]: HTMLElement | null } = {
  [DOMID_POP_UP_WINDOW]: null,
  [DOMID_BLURFRAME]: null,
  [DOMID_CAROUSEL]: null,
};
