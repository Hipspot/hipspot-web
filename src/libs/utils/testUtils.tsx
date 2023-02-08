import { render, RenderOptions } from '@testing-library/react';
import { Suspense, useEffect } from 'react';
import { RecoilRoot, RecoilValue, useRecoilValue } from 'recoil';

const wrapper = ({ children }: { children: JSX.Element }) => (
  <RecoilRoot>
    <Suspense fallback="loading">{children}</Suspense>
  </RecoilRoot>
);

const customRender = (child: JSX.Element, options?: RenderOptions) => render(child, { wrapper, ...options });

export function RecoilObserver({ node, onChange }: { node: RecoilValue<unknown>; onChange: (value: unknown) => void }) {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
}

export * from '@testing-library/react';

export { customRender as render };
