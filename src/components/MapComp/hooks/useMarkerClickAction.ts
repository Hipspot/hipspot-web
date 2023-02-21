import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import { clusterListAtom, openClusterListAtom } from '@states/clusterList';
import { activatedCafeIdAtom, tabStateAtom } from '@states/infoWindow';
import { useSetRecoilState } from 'recoil';
import getFeatureById from '../utils/getFeatureById';
import useCameraMove from './useCameraMove';
import useMapRef from './useMap';

/**
 * 마커 클릭 액션 코드 hooks
 */
function useMarkerClickAction() {
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
    if (feature) tiltFlyTo(feature?.geometry.coordinates, { markerClicked: true });
  };

  const clusterMarkerClickAction = (clusterList: any) => {
    setOpenClusterList(true);
    setTabState((prev) => ({ ...prev, popUpState: 'thumbNail', top: popUpHeights[PopUpHeightsType.bottom] }));
    setClusterList(clusterList);
  };

  return { pointMarkerClickAction, clusterMarkerClickAction };
}
export default useMarkerClickAction;
