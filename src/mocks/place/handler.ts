import { rest } from 'msw';
import * as service from './service';

export const placeHandler = [rest.get('/place/:id', service.getPlace)];
