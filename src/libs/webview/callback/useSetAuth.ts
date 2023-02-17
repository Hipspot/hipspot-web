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
    setAuth(JSON.parse(data));
  };
}
