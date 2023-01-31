interface MakeLodableSuspenseProps {
  lodableState: 'hasValue' | 'loading' | 'hasError';
  loading: JSX.Element;
  children: JSX.Element;
}

function MakeLodableSuspense({ lodableState, children, loading }: MakeLodableSuspenseProps) {
  // eslint-disable-next-line default-case
  switch (lodableState) {
    case 'hasValue': {
      return children;
    }
    case 'loading':
      return loading;

    case 'hasError':
      return <div>error발생, reload?</div>;
  }
}

export default MakeLodableSuspense;
