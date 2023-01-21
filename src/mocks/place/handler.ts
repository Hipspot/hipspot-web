import { rest } from 'msw';
import * as service from './service';

export const placeHandler = [rest.post('/place/:id', service.getPlace)];
