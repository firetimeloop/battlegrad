import fs from 'fs';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import type { ViteDevServer } from 'vite';
import bodyParser from 'body-parser';
import cors from 'cors';
import { renderReduxStoreObject } from './src/render-redux-store';
import { renderStyles } from './src/render-styles';
import { dbConnect } from './db';
import router from './router/index';

dotenv.config();

const INITIAL__REDUX_STATE = {};

export async function createServer(
  hmrPort?: number,
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
) {
  const resolve = (p: string) => path.resolve(__dirname, p);

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : '';

  const app = express();

  let vite: ViteDevServer | undefined;
  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: 'info',
      server: {
        middlewareMode: true,
        hmr: {
          port: hmrPort,
        },
      },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      }),
    );
  }

  app.use(express.static(path.resolve(__dirname, '../client/public')));

  app.use(bodyParser.json());

  dbConnect();

  const allowedOrigins = ['http://localhost:3000'];

  app.use(cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'CORS policy not allow access from the specified origin';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },

  }));

  app.use(router);

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template;
      let render;
      if (!isProd && vite) {
        template = fs.readFileSync(resolve('index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = indexProd;
        // @ts-ignore
        // eslint-disable-next-line import/extensions
        render = (await import('./dist/server/entry-server.js')).render;
      }

      const context: { url?: string } = {};
      const [appHtml, styles] = render(url, context);

      if (context.url) {
        return res.redirect(301, context.url);
      }

      const html = template
        .replace('<!--app-html-->', appHtml)
        .replace(
          '<!--script-redux-html-->',
          renderReduxStoreObject(INITIAL__REDUX_STATE),
        )
        .replace('<!--script-styles-html-->', renderStyles(styles));

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      // eslint-disable-next-line no-unused-expressions
      !isProd && vite && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

createServer().then(({ app }) =>
  app.listen(3001, () => {
    console.log('http://localhost:3001');
  }),
);
