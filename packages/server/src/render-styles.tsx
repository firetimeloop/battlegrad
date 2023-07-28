import ReactDOMServer from 'react-dom/server';

export function renderStyles(styles: string) {
  return ReactDOMServer.renderToString(
    <style
      data-styled="true"
      dangerouslySetInnerHTML={{ __html: styles }}
      />,
  );
}
