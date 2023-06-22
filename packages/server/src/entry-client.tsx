import ReactDOM from 'react-dom/client';

// А вот тут lerna неприятно укусила,
// и все функции рендеринга должны лежать в клиентском пакете
// иначе будет теряться контекст редакса,
// потому что серверный и клиентские пакеты будут смотреть в разные версии react-redux
import { getAppComponentForCSR } from 'client/src/utils/getAppComponentForCSR';

declare global {
  interface Window {
    __INITIAL_STATE__: any;
  }
}

ReactDOM.hydrateRoot(
  document.getElementById('app')!,
  getAppComponentForCSR(),
);
