import { CafeInfo } from '@libs/types/cafe';

/** 카페 영업일을 가공하는 함수 */
export const stringifyBusinessDate = ({
  businessDay,
  businessTime,
}: Pick<CafeInfo, 'businessDay' | 'businessTime'>): string => {
  const dayName = ['월', '화', '수', '목', '금', '토', '일'];

  let day = '';
  let time = '';

  // 시간 전처리
  if (!businessTime) time = '시간정보 없음';

  // 날짜 전처리
  if (businessDay.length === 7) day = '매일';
  else if (
    businessDay.length === 5 &&
    businessDay.includes('월') &&
    businessDay.includes('화') &&
    businessDay.includes('수') &&
    businessDay.includes('목') &&
    businessDay.includes('금')
  )
    day = '평일';
  else if (businessDay.length === 2 && businessDay.includes('토') && businessDay.includes('일')) day = '주말';
  else if (businessDay) day = businessDay.sort((a, b) => (dayName.indexOf(a) > dayName.indexOf(b) ? 1 : -1)).join(', ');
  else {
    day = '영업일정 없음';
    time = '';
  }

  return `${day} / ${time}`;
};

/** 텍스트를 클라이언트의 클립보드에 복사하는 함수 */
export const copyToClipboard = (text: string) => {
  const input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
};
