import { popUpHeights, PopUpHeightsType } from '@constants/popUpHeights';
import { clusterListAtom, openClusterListAtom } from '@states/clusterList';
import { activatedCafeIdAtom, tabStateAtom } from '@states/infoWindow';
import { geoJsonAtom } from '@states/map';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import useCameraMove from './useCameraMove';
import useMapRef from './useMap';

/**
 * 마커 클릭 액션 코드 hooks
 */
function useMarkerClickAction() {
  const allFeaturesLoadable = useRecoilValueLoadable(geoJsonAtom);
  const setActivatedCafeId = useSetRecoilState(activatedCafeIdAtom);
  const setTabState = useSetRecoilState(tabStateAtom);
  const setOpenClusterList = useSetRecoilState(openClusterListAtom);
  const setClusterList = useSetRecoilState(clusterListAtom);
  const { tiltFlyTo } = useCameraMove();
  const mapRef = useMapRef();
  const pointMarkerClickAction = (cafeId: number) => {
    if (allFeaturesLoadable.state === 'loading') return;
    if (allFeaturesLoadable.state === 'hasError') throw allFeaturesLoadable.contents;
    setActivatedCafeId(cafeId);
    setTabState((prev) => ({
      ...prev,
      popUpState: 'half',
      top: popUpHeights[PopUpHeightsType.middle],
    }));

    const map = mapRef.current;
    if (!map) return;
    const feature = allFeaturesLoadable.contents.find((aFeature) => aFeature.properties?.cafeId === cafeId);
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
