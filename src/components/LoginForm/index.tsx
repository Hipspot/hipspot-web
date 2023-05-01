import React from 'react';
import LoginButton from '@components/Button/LoginButton';
import * as S from './style';

type LoginProps = {
  /**
   * 필터링의 상단
   * @description 여백모바일 환경마다 다를 윗 여백을 조정하기 위함
   * @example 20
   */
  marginTop?: number;
};

function LoginForm({ marginTop }: LoginProps) {
  return (
    <S.Wrapper marginTop={marginTop}>
      <LoginButton />
    </S.Wrapper>
  );
}
export default LoginForm;
