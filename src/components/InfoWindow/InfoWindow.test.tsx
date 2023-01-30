import { getPlaceInfo } from '@libs/apis/place';
import { render, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import InfoWindow from '.';

test('Render InfoWindow without crash', async () => {
  const placeInfo = await getPlaceInfo(1);

  const component = render(
    <RecoilRoot>
      <InfoWindow placeInfo={placeInfo} />
    </RecoilRoot>
  );

  await waitFor(() => {
    expect(component).toBeTruthy();
    expect(component.findByText('영업시간')).toBeTruthy();
  });
});
