import { rest } from 'msw';
import data from './data';

export const getPlace: Parameters<typeof rest.get>[1] = (req, res, ctx) => {
  const id = req.params.id as string | undefined;

  if (!id) throw new Error('id is undefined');
  const target = data.find((place) => place.id === parseInt(id, 10));
  if (!target) {
    return res(ctx.delay(200), ctx.status(404));
  }
  return res(ctx.delay(200), ctx.status(200), ctx.json(target));
};
