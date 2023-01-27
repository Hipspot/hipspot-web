import InfoWindow from '@components/InfoWindow';
import { activatedCafeIdAtom, infoWindowQuery } from '@states/infoWindowState';
import { useRecoilValue } from 'recoil';

export default function InfroWindowContainer() {
  const activatedCafeId = useRecoilValue(activatedCafeIdAtom);
  const cafeInfo = useRecoilValue(infoWindowQuery(activatedCafeId));

  return <InfoWindow cafeInfo={cafeInfo} />;
}
