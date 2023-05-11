import { useRecoilValue } from 'recoil';
import useMap from './useMap';
import { useEffect } from 'react';
import { activatedCafeIdAtom } from '@states/infoWindow';
import { CustomGeoJSONFeatures } from '@libs/types/map';

interface UseActivateCafeHookProps {
  add: (features: CustomGeoJSONFeatures) => void;
  remove: () => void;
  allFeatures: CustomGeoJSONFeatures[];
}

function useActivateCafe({ add, remove, allFeatures }: UseActivateCafeHookProps) {
  const activatedCafeId = useRecoilValue(activatedCafeIdAtom);

  const mapRef = useMap();

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const activatedCafeFeature = allFeatures.find((feature) => feature.properties.cafeId === activatedCafeId);
    if (!activatedCafeFeature) return;

    add(activatedCafeFeature);

    return () => {
      remove();
    };
  }, [activatedCafeId]);
}
export default useActivateCafe;
