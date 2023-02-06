import { render, RenderOptions } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

const customRender = (child: JSX.Element, options?: RenderOptions) =>
  render(child, { wrapper: RecoilRoot, ...options });

export * from '@testing-library/react';

export { customRender as render };
