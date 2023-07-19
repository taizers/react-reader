import React from 'react';
import ReactDOM from 'react-dom/client';
import { Browserrorouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import createAppStore from './store/index';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = createAppStore();

root.render(
  <React.StrictMode>
    <Browserrorouter>
      <Provider store={store}>
        <App />
      </Provider>
    </Browserrorouter>
  </React.StrictMode>
);
