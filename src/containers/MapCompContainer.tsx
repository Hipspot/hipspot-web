import MapComp from '@components/MapComp';
import { Suspense } from 'react';
import { useSetRecoilState } from 'recoil';
import { activatedCafeIdAtom } from '@states/infoWindow';

function MapCompContainer() {
  const setActivatedCafeId = useSetRecoilState(activatedCafeIdAtom);

  const handleClickMarker = (id: number) => {
    setActivatedCafeId(id);
  };

  return (
    <Suspense fallback={<div> loading </div>}>
      <MapComp handleClickMarker={handleClickMarker} />
    </Suspense>
  );
}

export default MapCompContainer;
