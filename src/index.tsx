import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import axios from 'axios';
import App from './App';
import { worker } from './mocks';
import './index.css';

if (process.env.NODE_ENV === 'development') {
  worker.start();
} else {
  axios.defaults.baseURL = '';
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
