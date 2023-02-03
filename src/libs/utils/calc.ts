export const calcProgressRatio = ({ current, start, end }: { current: number; start: number; end: number }) =>
  (current - start) / (end - start);

export const calcInterpolation = ({ min, max, ratio }: { min: number; max: number; ratio: number }) =>
  min + (max - min) * ratio;
