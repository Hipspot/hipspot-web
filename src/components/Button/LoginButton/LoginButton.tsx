import React from 'react';

function LoginButton() {
  return (
    <button type="button" style={{ position: 'sticky' }}>
      <a href="https://api.hipspot.xyz/auth/login/google">로그인</a>
    </button>
  );
}

export default LoginButton;
