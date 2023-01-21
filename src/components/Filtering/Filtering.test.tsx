import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Filtering from '.';

test('Render Filtering without crash', () => {
  const component = render(
    <RecoilRoot>
      <Filtering />
    </RecoilRoot>
  );

  expect(component).toBeTruthy();
});
