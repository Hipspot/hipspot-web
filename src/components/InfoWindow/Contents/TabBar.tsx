import styled from '@emotion/styled';
import { useState } from 'react';
import { BookmarkFilledIcon, BookmarkIcon } from '@assets/index';

interface TabBarProps {
  isSelected: boolean;
}

function TabBar({ isSelected }: TabBarProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <Wrapper>
      <Tab isSelected={isSelected}>업체제공사진</Tab>
      <Tab>메뉴</Tab>
      <Tab>인스타그램</Tab>
      <Icon
        onClick={() => {
          setIsBookmarked(!isBookmarked);
        }}
      >
        {isBookmarked ? <BookmarkFilledIcon /> : <BookmarkIcon />}
      </Icon>
    </Wrapper>
  );
}

export default TabBar;

const Wrapper = styled.div`
  padding: 0px 20px;
  width: 100%;
  height: 60px;
  display: flex;
  gap: 32px;
  flex-shrink: 0;

  align-items: center;
`;

const Tab = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;

  border-radius: 12px 12px 0px 0px;
  color: #999999;
  filter: brightness(0.99);

  ${(props) =>
    props.isSelected &&
    `
    color: black;
    filter: none;
  `}
`;

const Icon = styled.div<{ isClicked?: boolean }>`
  margin-left: auto;
`;
