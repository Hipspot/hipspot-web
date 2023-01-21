import styled from '@emotion/styled';
import { activeFilterIdAtom } from '@recoil/ui';
import { useRecoilState } from 'recoil';
import { FilterData, FilterId } from '@libs/types/filter';

type FilterItemProps = {
  id: FilterId;
  filterData: FilterData;
};

export default function FilterItem({ id, filterData }: FilterItemProps) {
  const [activeFilterId, setActiveFilterId] = useRecoilState(activeFilterIdAtom);
  const isActive = id === activeFilterId;

  const handleClick = () => {
    setActiveFilterId(id);
  };

  return (
    <Wrapper onClick={handleClick} color={isActive ? filterData.color : '#9A9A9A'}>
      <ShadowFrame>
        <ContentFrame>
          <FilterIcon src={isActive ? filterData.icon : filterData.iconDisabled} alt="icon" />
          <p>{filterData.label}</p>
        </ContentFrame>
      </ShadowFrame>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ color: string }>`
  padding: 2px;

  width: fit-content;
  height: 40px;

  background: #f2f2f2;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.16);
  border-radius: 6px;

  box-sizing: border-box;

  white-space: nowrap;
  color: ${({ color }) => color};

  &:hover {
    cursor: pointer;
  }
`;

const ShadowFrame = styled.div`
  padding: 4px;

  width: fit-content;
  height: 36px;

  background: #f2f2f2;
  box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;

  box-sizing: border-box;
`;

const ContentFrame = styled.div`
  display: flex;
  padding: 2px 6px;
  gap: 4px;

  width: fit-content;
  height: 28px;

  background: #f2f2f2;
  box-shadow: 1px -1px 2px rgba(255, 255, 255, 0.9), -1px 1px 2px rgba(0, 0, 0, 0.12);
  border-radius: 2px;

  box-sizing: border-box;
`;

const FilterIcon = styled.img`
  width: 24px;
  height: 24px;
`;
