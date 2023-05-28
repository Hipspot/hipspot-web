import { authAtom } from '@states/auth';
import { toast } from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';

/**
 * @description Flutter에서 로그인 성공 시, auth 상태를 변경하는 함수
 * @param data, json이 string으로 변환된 값으로 "{isAuth: boolean}" 형식이다.
 *
 */
export default function useSetAuth() {
  const setAuthAtom = useSetRecoilState(authAtom);
  return (data: string) => {
    if (data !== 'null') {
      setAuthAtom({ isAuth: true, accessToken: data });
      toast('플러터로부터 액세스 토큰을 전달받았습니다.');
    } else {
      setAuthAtom({ isAuth: false, accessToken: '' });
      toast('플러터의 액세스 토큰 정보가 없습니다.');
    }
  };
}
