import Layout from '../Layout';

import { AppWrapper } from './styles';
import { Router } from '../Router';
import Alert from '../Alert';

function App() {
  return (
    <AppWrapper>
      <Layout />
      <Router />
      <Alert />
    </AppWrapper>
  );
}

export default App;
