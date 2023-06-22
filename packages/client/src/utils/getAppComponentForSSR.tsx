import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components';

import App from 'client/src/components/App';
import { theme } from 'client/src/theme';
import { store } from 'client/src/app/store';

export function getAppComponentForSSR(url: string) {
  const sheet = new ServerStyleSheet();
  const markupString = ReactDOMServer.renderToStaticMarkup(
    <Provider store={store}>
      <StaticRouter location={url}>
        <StyleSheetManager sheet={sheet.instance}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </StyleSheetManager>
      </StaticRouter>
    </Provider>,
  );

  const styledTags = sheet.getStyleTags();

  return [markupString, styledTags];
}
