import styled from '@emotion/styled';
import { authAtom } from '@states/auth';
import React from 'react';
import { useRecoilValue } from 'recoil';

function LoginButton() {
  const authState = useRecoilValue(authAtom);
  return !authState.isAuth ? (
    <Button>
      <a style={{ textDecoration: 'none' }} href="https://api.hipspot.xyz/auth/login/google">
        <p style={{ fontFamily: 'Pretendard', fontStyle: 'normal', color: 'white' }}> 로그인</p>
      </a>
    </Button>
  ) : null;
}

const Button = styled.button`
  position: sticky;
  width: fit-content;
  height: 40px;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background-color: #ea5fed;
  position: sticky;
  font-weight: 200;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.16);
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export default LoginButton;
