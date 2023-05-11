import React from 'react';
import { toast } from 'react-hot-toast';
import { BookmarkFilledIcon, BookmarkIcon } from '@assets/index';
import styled from '@emotion/styled';

interface BookMarkProps {
  isBookmarked: boolean;
}

function BookMark({ isBookmarked }: BookMarkProps) {
  const onBookmarkClick = () => {
    toast.success(isBookmarked === true ? '북마크가 해제되었습니다.' : '북마크가 추가되었습니다.');
  };

  return (
    <IconButton onClick={onBookmarkClick}>
      {isBookmarked ? <BookmarkFilledIcon /> : isBookmarked === false ? <BookmarkIcon /> : null}
    </IconButton>
  );
}

export default BookMark;
const IconButton = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;
