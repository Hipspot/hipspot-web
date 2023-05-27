import { FilterId } from '@libs/types/filter';
import { CustomGeoJSONFeatures } from '@libs/types/map';
import { activeFilterIdAtom } from '@states/clusterList';
import { geoJsonAtom } from '@states/map';
import { useRecoilValue } from 'recoil';

function useFiltering() {
  const allFeatures = useRecoilValue(geoJsonAtom);
  const activeFilterId = useRecoilValue(activeFilterIdAtom);

  const filteredFeatures = useFiltering.filterFeatures({ features: allFeatures, filterId: activeFilterId });

  return [activeFilterId, filteredFeatures] as [FilterId, CustomGeoJSONFeatures[]];
}
export default useFiltering;

useFiltering.filterFeatures = ({ features, filterId }: { features: CustomGeoJSONFeatures[]; filterId: FilterId }) => {
  const filteredFeatures: CustomGeoJSONFeatures[] = [];

  features.forEach((feature: CustomGeoJSONFeatures) => {
    if (feature.properties?.filterList.includes(filterId)) {
      filteredFeatures.push(feature);
    }
  });
  return filteredFeatures;
};
