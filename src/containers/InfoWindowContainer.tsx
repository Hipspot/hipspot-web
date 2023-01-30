import InfoWindow from '@components/InfoWindow';
import { activatedCafeIdAtom, cafeInfoQuery } from '@states/infoWindow';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

export default function InfoWindowContainer() {
  const activatedCafeId = useRecoilValue(activatedCafeIdAtom);
  const cafeInfoLoadable = useRecoilValueLoadable(cafeInfoQuery(activatedCafeId));

  return <InfoWindow cafeInfo={cafeInfoLoadable.state === 'hasValue' ? cafeInfoLoadable.contents : null} />;
}
