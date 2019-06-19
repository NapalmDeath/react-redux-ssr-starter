import React from 'react';
import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChunkExtractor } from '@loadable/server';

import createStore from 'store';
import loadData from 'shared/loadData';
import createRoutes from 'shared/routes';
import App from 'client/App';

const buildPath = path.join(__dirname, '../../build');
const srcPath = path.join(__dirname, '../../src');
const isProd = process.env.NODE_ENV === 'production';

const HOST = isProd ? '0.0.0.0' : '127.0.0.1';
const PORT = 3000;

export default function startServer() {
  const app = new express();

  if (isProd) {
    app.use('/static', express.static(path.join(buildPath, 'static')));
  }

  const extractor = new ChunkExtractor({
    statsFile: path.join(buildPath, 'loadable-stats.json')
  });

  let templateHtml;

  templateHtml = fs.readFileSync(path.join(srcPath, 'index.html.ejs'), 'utf8');

  app.use((req, res) => {
    const store = createStore();

    const routes = createRoutes(store);

    loadData(routes, req.url).then(() => {
      const context = { };

      const view = (
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App routes={routes} context={context} />
          </StaticRouter>
        </Provider>
      );

      const jsx = extractor.collectChunks(view);
      extractor.chunks = [];

      const app = renderToString(jsx);

      const preloadedStore = store.getState();

      const scripts = extractor.getScriptTags();
      const styles = extractor.getStyleTags();

      let renderedHtml = ejs.render(templateHtml, {
        app,
        scripts,
        styles,
        preloadedStore: JSON.stringify(preloadedStore).replace(/</g, '\\u003c')
      });

      res.status(200);

      return res.send(renderedHtml);
    });
  });

  app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}/`);
  });
}
