import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 16px;
  gap: 21px;

  width: 128px;
  height: 100%;

  background: #f2f2f2;
  box-shadow: 1px -1px 2px rgba(255, 255, 255, 0.9), -1px 1px 2px rgba(0, 0, 0, 0.12);
  border-radius: 2px;

  box-sizing: border-box;

  overflow: scroll;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div``;

const ItemImg = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 4px;
`;

const ItemName = styled.p`
  font-family: 'Pretendard';
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  color: #181818;
`;

export default { Wrapper, Item, ItemImg, ItemName };
