import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GoogleLogin from 'components/GoogleLogin/GoogleLogin';
import Login from 'Login/Login';
import Main from './Main';

function App() {
  return (
    <Routes>
      <Route path="/redirect" element={<GoogleLogin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;
