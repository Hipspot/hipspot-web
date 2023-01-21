import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import ClusterList from '.';

test('Render ClusterList without crash', () => {
  const component = render(
    <RecoilRoot>
      <ClusterList />
    </RecoilRoot>
  );

  expect(component).toBeTruthy();
});
