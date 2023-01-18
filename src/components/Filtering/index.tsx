import styled from '@emotion/styled';
import filterDataList from '@constants/filterDataList';
import { FilterId } from '@lib/types/filter';
import FilterItem from './FilterItem';

type FilteringProps = {
  marginTop?: number;
};

export default function Filtering({ marginTop }: FilteringProps) {
  return (
    <Wrapper marginTop={marginTop}>
      {Object.values(filterDataList).map((filter, index: FilterId) => (
        <FilterItem key={filter.label} id={index} filterData={filter} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ marginTop?: number }>`
  height: 64px;
  padding-top: ${(props) => props.marginTop || '20px'};
  padding-left: 16px;
  padding-right: 16px;
  position: sticky;
  display: flex;
  gap: 8px;

  overflow: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  box-sizing: content-box;
`;
