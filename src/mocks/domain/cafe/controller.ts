import { rest } from 'msw';
import * as service from './service';

export const cafeController = [
  rest.get('/place/:id', service.getCafe),
  rest.get('/place', service.getAllCafe),
  rest.post('/place', service.createCafe),
  rest.put('/place/:id', service.updateCafe),
  rest.delete('/place/:id', service.deleteCafe),
];
