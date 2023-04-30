import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AxiosResponse } from 'axios';
import { store } from './app/store';
import App from './components/App';
import './fonts/Inter/index.css';
import './vendor/normalize.css';
import './index.css';
import { theme } from './theme';

export const errorHandler = (error: Error) => Promise.reject(error);

export const successHandler = (response: AxiosResponse) => response;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
