import { server } from '@mocks/server';
import axios from 'axios';

// Establish API mocking before all tests.
beforeAll(() => {
  axios.defaults.baseURL = '';
  server.listen({ onUnhandledRequest: 'bypass' });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
