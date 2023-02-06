import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import './index.css';
import App from './App';
import { worker } from './mocks';

worker.start();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
