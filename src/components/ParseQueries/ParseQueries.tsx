import { authAtom } from '@states/auth';
// import { accessToken } from 'mapbox-gl';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

function GoogleLogin() {
  const navigate = useNavigate();
  const setAuthState = useSetRecoilState(authAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get('access_token');

    try {
      if (accessToken === null) {
        throw Error('accessToken is null');
      }
      window.localStorage.setItem('token', accessToken);
      setAuthState({ isAuth: true, accessToken });
      navigate('/');
    } catch (e) {
      console.log(e);
      setAuthState({ isAuth: false, accessToken: 'null' });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 10);
    }
  }, [setAuthState, navigate]);

  if (loading) return <div>Loading...</div>;

  return null;
}

export default GoogleLogin;
