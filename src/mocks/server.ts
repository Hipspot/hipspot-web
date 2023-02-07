import { setupServer } from 'msw/node';
import { cafeController } from './domain/cafe/controller';

export const server = setupServer(...cafeController);
