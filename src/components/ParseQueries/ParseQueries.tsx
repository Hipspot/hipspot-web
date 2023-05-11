import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GoogleLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    const url = new URL(window.location.href);
    const urlString = url.href;
    const params = {} as { [key: string]: string };
    const queryString = urlString.split('?')[1];
    if (queryString) {
      const keyValuePairs = queryString.split('&');
      keyValuePairs.forEach((pair) => {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
      });
    }
    console.log(params);
  }, [navigate]);

  return <div>accesstoken</div>;
}

export default GoogleLogin;
