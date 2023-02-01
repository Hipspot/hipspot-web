import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import './index.css';
// import axios from 'axios';
import App from './App';
import { worker } from './mocks';

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
worker.start();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
