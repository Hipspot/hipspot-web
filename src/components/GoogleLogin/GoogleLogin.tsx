import React, { useEffect } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GoogleLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    const url = new URL(window.location.href);
    const { href } = url;
    if (!href) return;
    const accessToken = href.split('&')[0].split('=')[1];
    console.log(accessToken);
  }, [navigate]);

  return <div>googleLogin</div>;
}

export default GoogleLogin;
