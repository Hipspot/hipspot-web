export const DOMID_POP_UP_WINDOW = 'pop_up_window';
export const DOMID_POP_UP_WINDOW_HANDLER = 'pop_up_window_handler';
export const DOMID_BLURFRAME = 'blur_frame';
export const DOMID_IMAGE_SLIDER = 'image_slider';
export const DOMID_MAP_COMPONENT = 'map';

export const DOMTargetList: { [key in string]: HTMLElement | null } = {
  [DOMID_POP_UP_WINDOW]: null,
  [DOMID_BLURFRAME]: null,
  [DOMID_IMAGE_SLIDER]: null,
  [DOMID_MAP_COMPONENT]: null,
};

export const DOMCLASS_CLUSTER_MARKER = 'cluster_marker';
