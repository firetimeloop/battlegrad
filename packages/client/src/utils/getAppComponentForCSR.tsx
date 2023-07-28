import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../app/store';
import App from '../components/App';
import '../fonts/Inter/index.css';
import '../vendor/normalize.css';
import '../index.css';

export function getAppComponentForCSR() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
