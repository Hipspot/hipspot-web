/**
 * @param stringifiedArray
 * @description parses stringified array of numbers to array of numbers
 * @returns array of numbers
 */

export const parseStringifiedArray = (stringifiedArray: string) =>
  stringifiedArray
    .slice(1, -1)
    .split(', ')
    .map((id: string) => Number(id));
