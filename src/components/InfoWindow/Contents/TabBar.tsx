import styled from '@emotion/styled';

interface TabBarProps {
  isSelected: boolean;
}

function TabBar({ isSelected }: TabBarProps) {
  return (
    <Wrapper>
      <Tab isSelected={isSelected}>업체제공사진</Tab>
      <Tab>메뉴</Tab>
      <Tab>인스타그램</Tab>
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
