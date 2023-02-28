import { CafeInfo } from '@libs/types/cafe';
import { cafeData } from './data';

export const getAllCafe = () => cafeData;

export const getCafeById = (id: number) => cafeData.find((cafe) => cafe.cafeId === id);

export const deleteCafe = (id: number) => {
  const index = cafeData.findIndex((cafe) => cafe.cafeId === id);
  if (index === -1) return null;
  return cafeData.splice(index, 1);
};

export const updateCafe = (id: number, data: unknown) => {
  const index = cafeData.findIndex((cafe) => cafe.cafeId === id);
  if (index === -1) return null;
  cafeData[index] = data as CafeInfo;
  return data;
};

export const createCafe = (data: unknown) => {
  cafeData.push(data as CafeInfo);
  return cafeData;
};
