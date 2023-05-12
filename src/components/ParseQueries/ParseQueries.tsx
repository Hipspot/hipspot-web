import { authAtom } from '@states/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

function GoogleLogin() {
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authAtom);

  useEffect(() => {
    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get('access_token');

    setAuthState({ isAuth: true, accessToken });

    navigate('/');
  }, [navigate]);

  return <div>Loading...</div>;
}

export default GoogleLogin;
