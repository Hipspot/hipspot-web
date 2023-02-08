import { isNotNumber } from './isNumber';

const getEnumNumberValues = (e: { [s: string]: number | string }): number[] =>
  Object.values(e)
    .filter((v) => isNotNumber(v))
    .map((v) => Number(v));

export default getEnumNumberValues;
