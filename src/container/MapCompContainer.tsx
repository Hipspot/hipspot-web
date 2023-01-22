import MapComp from '@components/MapComp';
import { Suspense } from 'react';

function MapCompContainer() {
  return (
    <Suspense fallback={<div> loading </div>}>
      <MapComp />
    </Suspense>
  );
}

export default MapCompContainer;
