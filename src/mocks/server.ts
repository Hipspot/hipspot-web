import { setupServer } from 'msw/node';
import { placeHandler } from './place/handler';

export const server = setupServer(...placeHandler);
