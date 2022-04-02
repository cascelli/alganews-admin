import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
//import App from './App'; // Substituido pelo componente Routes
import reportWebVitals from './reportWebVitals';
import { store } from './core/store';
import DefaultLayout from './app/layouts/Default';
import Routes from './app/routes';

// import 'antd/dist/antd.css'; //Renomeado para index.less para aplicar temas

// import './index.css'; //Renomeado para index.less para aplicar temas
import './index.less';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <DefaultLayout>
          {/* <App /> */}
          <Routes />
        </DefaultLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
