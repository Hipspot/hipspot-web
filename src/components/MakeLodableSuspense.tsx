import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

interface MakeLodableSuspenseProps {
  lodableState: 'hasValue' | 'loading' | 'hasError';
  children: EmotionJSX.Element;
}

function MakeLodableSuspense({ lodableState, children }: MakeLodableSuspenseProps) {
  // eslint-disable-next-line default-case
  switch (lodableState) {
    case 'hasValue': {
      return children;
    }
    case 'loading':
      return <Skeleton />;
    case 'hasError':
      return <>error</>;
  }
}

export default MakeLodableSuspense;
