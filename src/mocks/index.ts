import { setupWorker } from 'msw';
import { cafeController } from './domain/cafe/controller';

export const worker = setupWorker(...cafeController);
