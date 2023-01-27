import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import InfoWindow from '.';

test('Render InfoWindow without crash', () => {
  const component = render(
    <RecoilRoot>
      <InfoWindow />
    </RecoilRoot>
  );

  expect(component).toBeTruthy();
});
