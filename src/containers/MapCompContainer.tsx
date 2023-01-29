import MapComp from '@components/MapComp';
import { Suspense } from 'react';
import { useSetRecoilState } from 'recoil';
import { activatedCafeIdAtom, tabStateAtom } from '@states/infoWindow';
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';

function MapCompContainer() {
  const setActivatedCafeId = useSetRecoilState(activatedCafeIdAtom);
  const setTabState = useSetRecoilState(tabStateAtom);
  const handleClickMarker = (id: number) => {
    setActivatedCafeId(id);
    setTabState((prev) => ({ ...prev, top: popUpHeights[PopUpHeightsType.middle] }));
  };

  return (
    <Suspense fallback={<div> loading </div>}>
      <MapComp handleClickMarker={handleClickMarker} />
    </Suspense>
  );
}

export default MapCompContainer;
