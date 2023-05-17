import { activeFilterIdAtom } from '@states/clusterList';
import { useRecoilValue } from 'recoil';

function useFiltering() {
  const activeFilterId = useRecoilValue(activeFilterIdAtom);

  return activeFilterId;
}
export default useFiltering;
