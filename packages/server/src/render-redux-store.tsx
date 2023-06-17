import ReactDOMServer from 'react-dom/server';

export function renderReduxStoreObject(reduxState = {}) {
  return ReactDOMServer.renderToString(
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(reduxState)}`,
      }}
      />,
  );
}
