import { getCafeInfo } from '@libs/apis/cafe';
import { render, waitFor } from '@libs/utils/testUtils';
import data from '@mocks/place/data';
import InfoWindow from '.';

test('Render InfoWindow without crash', async () => {
  const mockData = data[0];
  const cafeInfo = await getCafeInfo(mockData.id);

  const component = render(<InfoWindow cafeInfo={cafeInfo} />);

  await waitFor(() => {
    expect(component).toBeTruthy();
    expect(component.findByText(mockData.placeName)).toBeTruthy();
  });
});
