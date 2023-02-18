import { authAtom } from '@states/auth';
import { useSetRecoilState } from 'recoil';

/**
 * @description Flutter에서 로그인 성공 시, auth 상태를 변경하는 함수
 * @param data, json이 string으로 변환된 값으로 "{isAuth: boolean}" 형식이다.
 *
 */
export default function useSetAuth() {
  const setAuth = useSetRecoilState(authAtom);
  return (data: string) => {
    const JsonData = JSON.parse(data);
    if (!!JsonData && typeof JsonData === 'object' && Object.prototype.hasOwnProperty.call(JsonData, 'isAuth')) {
      setAuth(JsonData as { isAuth: boolean });
    } else {
      // eslint-disable-next-line no-console
      console.error('데이터 형식이 잘못되었습니다.');
    }
  };
}
