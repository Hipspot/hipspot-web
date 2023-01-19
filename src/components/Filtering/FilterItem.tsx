import styled from '@emotion/styled';
import { FilterData } from '@lib/types/filter';

type FilterItemProps = {
  filterData: FilterData;
};

export default function FilterItem({ filterData }: FilterItemProps) {
  return (
    <Wrapper color={filterData.color}>
      <ShadowFrame>
        <ContentFrame>
          <FilterIcon src={filterData.icon} alt="icon" />
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
