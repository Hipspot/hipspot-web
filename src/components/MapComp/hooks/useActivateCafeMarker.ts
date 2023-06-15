import { useRecoilValue } from 'recoil';
import useMap from './useMap';
import { useEffect } from 'react';
import { activatedCafeIdAtom } from '@states/infoWindow';
import { CustomGeoJSONFeatures } from '@libs/types/map';

interface UseActivateCafeMarkerHookProps {
  add: (features: CustomGeoJSONFeatures) => void;
  remove: () => void;
  features: CustomGeoJSONFeatures[] | CustomGeoJSONFeatures[][];
  removeCondition?: boolean[];
}

function useActivateCafeMarker({ add, remove, features, removeCondition }: UseActivateCafeMarkerHookProps) {
  const activatedCafeId = useRecoilValue(activatedCafeIdAtom);
  const allFeatures = features.flat();
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

  useEffect(() => {
    if (removeCondition && removeCondition.find((value) => value === true)) remove();
  }, [removeCondition]);
}
export default useActivateCafeMarker;
