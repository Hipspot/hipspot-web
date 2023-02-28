export type ImageTabKey = 'store' | 'menu';
export type ImageList = { [key in ImageTabKey]: string[] };
export type ImageTabBarState = { isSelected: boolean; key: ImageTabKey; name: string }[];
