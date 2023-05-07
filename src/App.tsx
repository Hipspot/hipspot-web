import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GoogleLogin from 'components/GoogleLogin/GoogleLogin';
import Main from './Main';

function App() {
  return (
    <Routes>
      <Route path="/redirect" element={<GoogleLogin />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;
