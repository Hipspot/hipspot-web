import { setupWorker } from 'msw';
import { placeHandler } from './place/handler';

export const worker = setupWorker(...placeHandler);
