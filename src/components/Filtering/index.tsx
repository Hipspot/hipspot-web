import styled from '@emotion/styled';
import filterDataList from '@constants/filterDataList';
import { FilterId } from '@libs/types/filter';
import FilterItem from './FilterItem';
import { useEffect } from 'react';
import messageToFlutter from '@libs/webview/messageToFlutter';
import { MessageToFlutterType } from '@constants/flutterCallback';

export default function Filtering() {
  useEffect(() => {
    messageToFlutter(MessageToFlutterType.getOnboardingFilter, null);
  }, []);

  return (
    <Wrapper>
      {Object.values(filterDataList).map((filter, index: FilterId) => (
        <FilterItem key={filter.label} id={index} filterData={filter} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ marginTop?: number }>`
  height: 64px;
  gap: 8px;
  display: flex;
  align-items: center;
  overflow: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  box-sizing: content-box;
`;
