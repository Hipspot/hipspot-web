import { rest } from 'msw';
import * as cafeRepository from './repository';

export const getCafe: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const id = req.params.id as string;
  if (!id) throw new Error('id is undefined');
  const target = cafeRepository.getCafeById(parseInt(id, 10));
  if (!target) {
    return res(ctx.delay(200), ctx.status(404));
  }
  return res(ctx.delay(200), ctx.status(200), ctx.json(target));
};

export const getAllCafe: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const target = cafeRepository.getAllCafe();
  if (!target) {
    return res(ctx.delay(200), ctx.status(404));
  }
  return res(ctx.delay(200), ctx.status(200), ctx.json(target));
};

export const deleteCafe: Parameters<typeof rest.delete>[1] = (req, res, ctx) => {
  const id = req.params.id as string;
  if (!id) throw new Error('id is undefined');
  const target = cafeRepository.deleteCafe(parseInt(id, 10));
  if (!target) {
    return res(ctx.delay(200), ctx.status(404));
  }
  return res(ctx.delay(200), ctx.status(200), ctx.json(target));
};

export const updateCafe: Parameters<typeof rest.put>[1] = (req, res, ctx) => {
  const id = req.params.id as string;
  if (!id) throw new Error('id is undefined');
  const target = cafeRepository.updateCafe(parseInt(id, 10), req.body);
  if (!target) {
    return res(ctx.delay(200), ctx.status(404));
  }
  return res(ctx.delay(200), ctx.status(200), ctx.json(target));
};

export const createCafe: Parameters<typeof rest.post>[1] = (req, res, ctx) => {
  const target = cafeRepository.createCafe(req.body);
  if (!target) {
    return res(ctx.delay(200), ctx.status(404));
  }
  return res(ctx.delay(200), ctx.status(200), ctx.json(target));
};
