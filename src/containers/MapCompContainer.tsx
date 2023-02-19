import MapComp from '@components/MapComp';
import { Suspense } from 'react';
import { useSetRecoilState } from 'recoil';
import { activatedCafeIdAtom, tabStateAtom } from '@states/infoWindow';
import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import { clusterListAtom, openClusterListAtom } from '@states/clusterList';
import useCameraMove from '@components/MapComp/hooks/useCameraMove';
import useMapRef from '@components/MapComp/hooks/useMap';
import getFeatureById from '@components/MapComp/utils/getFeatureById';

function MapCompContainer() {
  const setActivatedCafeId = useSetRecoilState(activatedCafeIdAtom);
  const setTabState = useSetRecoilState(tabStateAtom);
  const setOpenClusterList = useSetRecoilState(openClusterListAtom);
  const setClusterList = useSetRecoilState(clusterListAtom);
  const { tiltFlyTo } = useCameraMove();
  const mapRef = useMapRef();
  const pointMarkerClickAction = (filterId: number) => (id: number) => {
    setActivatedCafeId(id);
    setTabState((prev) => ({
      ...prev,
      popUpState: 'half',
      top: popUpHeights[PopUpHeightsType.middle],
    }));

    const map = mapRef.current;
    if (!map) return;
    const feature = getFeatureById({ map, sourceId: `cafeList/${filterId}`, id });
    if (feature) tiltFlyTo(feature?.geometry.coordinates);
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
