import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Store from './Store/store';
import { Provider } from 'react-redux';

import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import MainRoute from './Pages/MainRoute';
AOS.init();


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

axios.defaults.baseURL = "http://localhost:3001"
axios.defaults.withCredentials = true

root.render(
  <Provider store={Store} >
    <MainRoute/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
