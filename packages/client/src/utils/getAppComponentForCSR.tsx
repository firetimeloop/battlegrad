import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { store } from '../app/store';
import App from '../components/App';
import { theme } from '../theme';
import '../fonts/Inter/index.css';
import '../vendor/normalize.css';
import '../index.css';

export function getAppComponentForCSR() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}
