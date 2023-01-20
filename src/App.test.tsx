import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import App from './App';

test('Render App without crash', () => {
  const component = render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );

  expect(component).toBeTruthy();
});
