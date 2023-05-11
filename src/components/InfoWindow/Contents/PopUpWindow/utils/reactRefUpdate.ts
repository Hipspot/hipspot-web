import React from 'react';

export const reactRefUpdate = <T>({ ref, update }: { ref: React.MutableRefObject<T>; update: T }) => {
  if (typeof update === 'number') ref.current = update;
  else {
    ref.current = { ...ref.current, ...update };
  }
};
