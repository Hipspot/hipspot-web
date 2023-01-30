import { render, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import InfoWindow from '.';

test('Render InfoWindow without crash', async () => {
  const component = render(
    <RecoilRoot>
      <InfoWindow />
    </RecoilRoot>
  );

  await waitFor(() => {
    expect(component).toBeTruthy();
    expect(component.findByText('영업시간')).toBeTruthy();
  });
});
