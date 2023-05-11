export const calcProgressRatio = ({ current, start, end }: { current: number; start: number; end: number }) =>
  calcNumberClamp({ num: (current - start) / (end - start), min: 0, max: 1 });

export const calcInterpolation = ({ min, max, ratio }: { min: number; max: number; ratio: number }) =>
  min + (max - min) * ratio;

export const calcImageIndex = ({
  width,
  left,
  imageListLength,
}: {
  width: number;
  left: number;
  imageListLength: number;
  displacement?: number;
}) => {
  const n = Math.floor(left / width);
  const tail = Math.round((left - n * width) / width);
  return calcNumberClamp({ num: n + tail, min: 0, max: imageListLength - 1 });
};

export const calcNumberClamp = ({ num, min, max }: { num: number; min: number; max: number }) =>
  Math.min(Math.max(num, min), max);

export const calcImageListPosition = ({ index, width, left }: { index: number; width: number; left: number }) =>
  width * index * Math.sign(left);
