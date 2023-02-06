import { render } from '@libs/utils/testUtils';
import ClusterList from '.';

test('Render ClusterList without crash', () => {
  const component = render(<ClusterList />);

  expect(component).toBeTruthy();
});
