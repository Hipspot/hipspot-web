import MapComp from '@components/MapComp';
import { Suspense } from 'react';
import { useSetRecoilState } from 'recoil';
import { activatedCafeIdAtom, tabStateAtom } from '@states/infoWindow';
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import { clusterListAtom, openClusterListAtom } from '@states/clusterList';

function MapCompContainer() {
  const setActivatedCafeId = useSetRecoilState(activatedCafeIdAtom);
  const setTabState = useSetRecoilState(tabStateAtom);
  const setOpenClusterList = useSetRecoilState(openClusterListAtom);
  const setClusterList = useSetRecoilState(clusterListAtom);
  const pointMarkerClickAction = (id: number) => {
    setActivatedCafeId(id);
    setTabState((prev) => ({
      ...prev,
      popUpState: 'half',
      top: popUpHeights[PopUpHeightsType.middle],
    }));
  };

  const clusterMarkerClickAction = (clusterList: any) => {
    setOpenClusterList(true);
    setTabState((prev) => ({ ...prev, popUpState: 'thumbNail', top: popUpHeights[PopUpHeightsType.bottom] }));
    setClusterList(clusterList);
  };

  return (
    <Suspense fallback={<div> loading </div>}>
      <MapComp pointMarkerClickAction={pointMarkerClickAction} clusterMarkerClickAction={clusterMarkerClickAction} />
    </Suspense>
  );
}

export default MapCompContainer;
