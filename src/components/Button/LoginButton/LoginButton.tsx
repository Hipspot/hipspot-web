import { authAtom } from '@states/auth';
import React from 'react';
import { useRecoilValue } from 'recoil';

function LoginButton() {
  const authState = useRecoilValue(authAtom);
  return !authState.isAuth ? (
    <button type="button" style={{ position: 'sticky' }}>
      <a href="https://api.hipspot.xyz/auth/login/google">로그인</a>
    </button>
  ) : null;
}

export default LoginButton;
