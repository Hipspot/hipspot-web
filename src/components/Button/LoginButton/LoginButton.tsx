import styled from '@emotion/styled';
import { authAtom } from '@states/auth';
import React from 'react';
import { useRecoilValue } from 'recoil';

function LoginButton() {
  const authState = useRecoilValue(authAtom);
  return !authState.isAuth ? (
    <Button>
      <a style={{ textDecoration: 'none' }} href="https://api.hipspot.xyz/auth/login/google">
        <p
          style={{
            fontSize: '20px',
            fontFamily: 'Pretendard',
            color: 'white',
          }}
        >
          로그인
        </p>
      </a>
    </Button>
  ) : null;
}

const Button = styled.button`
  position: sticky;
  width: fit-content;
  height: 40px;
  padding: 5px 25px;
  border: none;
  border-radius: 6px;
  background-color: #ea5fed;
  position: sticky;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.24);
  &:hover {
    background-color: #d44fc5;
  }
`;

export default LoginButton;
