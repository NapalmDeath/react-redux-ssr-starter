import React from 'react';
import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

import createStore from 'store';
import loadData from 'shared/loadData';
import createRoutes from 'shared/routes';
import App from 'client/App';

const buildPath = path.join(__dirname, '../../build');
const srcPath = path.join(__dirname, '../../src');
const isProd = process.env.NODE_ENV === 'production';

const HOST = '127.0.0.1';
const PORT = 3000;

export default function startServer(options) {
  const app = new express();

  const stats = JSON.parse(
    fs.readFileSync(path.join(buildPath, 'react-loadable.json'), 'utf8')
  );

  if (isProd) {
    app.use('/static', express.static(path.join(buildPath, 'static')));
  }

  const templateHtml = fs.readFileSync(
    path.join(srcPath, 'index.html.ejs'),
    'utf8'
  );

  app.use((req, res) => {
    const store = createStore();

    const routes = createRoutes(store);

    loadData(routes, req.url).then(() => {
      const context = {};
      const modules = [];

      const app = renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              <App routes={routes} />
            </StaticRouter>
          </Provider>
        </Loadable.Capture>
      );

      const preloadedStore = store.getState();

      const bundles = getBundles(stats, modules);

      const styles = [
        ...new Set([
          ...bundles
            .filter(bundle => bundle.file.endsWith('.css'))
            .map(style => style.publicPath),
          ...Object.values(options.chunks().styles)
        ])
      ];
      const scripts = [
        ...new Set([
          ...bundles
            .filter(bundle => bundle.file.endsWith('.js'))
            .map(script => script.publicPath),
          ...Object.values(options.chunks().javascript)
        ])
      ];

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

  Loadable.preloadAll().then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Running on http://${HOST}:${PORT}/`);
    });
  });
}
