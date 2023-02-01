import { getCafeInfo } from '@libs/apis/cafe';
import data from '@mocks/place/data';
import { render, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import InfoWindow from '.';

test('Render InfoWindow without crash', async () => {
  const mockData = data[0];
  const cafeInfo = await getCafeInfo(mockData.id);

  const component = render(
    <RecoilRoot>
      <InfoWindow cafeInfo={cafeInfo} />
    </RecoilRoot>
  );

  await waitFor(() => {
    expect(component).toBeTruthy();
    expect(component.findByText(mockData.placeName)).toBeTruthy();
  });
});
