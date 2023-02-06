import { render, waitFor } from '@libs/utils/testUtils';
import data from '@mocks/place/data';
import InfoWindow from '.';

test('Render InfoWindow without crash', async () => {
  const mockData = data[0];

  const component = render(<InfoWindow />);

  await waitFor(() => {
    expect(component).toBeTruthy();
    expect(component.findByText(mockData.placeName)).toBeTruthy();
  });
});
