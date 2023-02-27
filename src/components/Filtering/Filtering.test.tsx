import { render } from '@libs/utils/testUtils';
import Filtering from '.';

test('Render Filtering without crash', () => {
  const component = render(<Filtering />);

  expect(component).toBeTruthy();
});
