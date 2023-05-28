import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ParseQueries from './components/ParseQueries/ParseQueries';
import Main from './Main';

function App() {
  return (
    <Routes>
      <Route path="/redirect" element={<ParseQueries />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;
