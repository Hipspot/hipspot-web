import React from 'react';

export const reactRefUpdate = <T>({ ref, update }: { ref: React.MutableRefObject<T>; update: T }) => {
  ref.current = update;
};
