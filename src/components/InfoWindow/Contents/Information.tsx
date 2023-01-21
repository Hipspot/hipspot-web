import styled from '@emotion/styled';

const Information = styled.div`
  .item {
    display: flex;
    padding: 24px 0px;
    gap: 12px;

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .itemTitle {
        font-family: 'Pretendard';
        font-weight: 600;
        line-height: 24px;
        color: #181818;
      }

      .itemDescription {
        font-family: 'Pretendard';
        line-height: 24px;
        color: #868686;
      }
    }

    border-bottom: solid #efefef 1px;
  }
`;
