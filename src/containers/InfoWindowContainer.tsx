import InfoWindow from '@components/InfoWindow';
import { activatedCafeIdAtom, placeInfoQuery } from '@states/infoWindow';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

export default function InfoWindowContainer() {
  const activatedCafeId = useRecoilValue(activatedCafeIdAtom);
  const placeInfoLoadable = useRecoilValueLoadable(placeInfoQuery(activatedCafeId));

  return <InfoWindow placeInfo={placeInfoLoadable.state === 'hasValue' ? placeInfoLoadable.contents : null} />;
}
