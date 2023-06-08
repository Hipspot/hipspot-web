import { toast } from 'react-hot-toast';
import { BookmarkFilledIcon, BookmarkIcon } from '@assets/index';
import styled from '@emotion/styled';
import { MessageToFlutterType } from '@constants/flutterCallback';
import messageToFlutter from '@libs/webview/messageToFlutter';
import { useRecoilValue } from 'recoil';
import { activatedCafeIdAtom } from '@states/infoWindow';
import { favoriteListAtom } from '@states/favoriteList';
import { isWebViewAtom } from '@states/isWebView';
import { useEffect, useRef } from 'react';

function BookMark() {
  const activatedCafeId = useRecoilValue<number | null>(activatedCafeIdAtom);
  const favoriteList = useRecoilValue(favoriteListAtom);
  const isBookmarked = activatedCafeId !== null ? favoriteList.includes(Number(activatedCafeId)) : false;
  const isWebView = useRecoilValue<boolean>(isWebViewAtom);
  const isMounted = useRef(false);

  const onBookmarkClick = () => {
    if (!isWebView) {toast('현재 모바일 환경에서만 북마크를 추가할 수 있습니다.');}
      if (isBookmarked) {
        messageToFlutter(MessageToFlutterType?.removeFavorite, activatedCafeId);
      } else {
      const bookMarkActionType = isBookMarked ?  MessageToFlutterType.removeFavorite : MessageToFlutterType.addFavorite;

        messageToFlutter(bookMarkActionType, activatedCafeId);
      }
    } else {
      toast('현재 모바일 환경에서만 북마크를 추가할 수 있습니다.');
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      toast.success(isBookmarked === false ? '북마크가 해제되었습니다.' : '북마크가 추가되었습니다.');
    } else {
      isMounted.current = true;
    }
  }, [isBookmarked]);

  return (
    <IconButton>
      {isBookmarked ? (
        <BookmarkFilledIcon onClick={onBookmarkClick} />
      ) : isBookmarked === false ? (
        <BookmarkIcon onClick={onBookmarkClick} />
      ) : null}
    </IconButton>
  );
}

export default BookMark;
const IconButton = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;
