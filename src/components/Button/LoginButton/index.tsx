import React from 'react';
import styled from '@emotion/styled';

function LoginButton() {
  const handleClick = () => {
    console.log('클릭');
  };
  return (
    <div>
      <Button onClick={handleClick}>
        <span style={{ color: 'white' }}>로그인</span>
      </Button>
    </div>
  );
}

export default LoginButton;

export const Button = styled.button`
  border-radius: 6px;
  background-color: #ea5fed;
  display: flex;
  flex-direction: row;
  height: 40px;
  width: 94px;
  border: none;
  position: sticky;
  align-items: center;
`;
