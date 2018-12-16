import React from 'react';
import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';
import express from 'express';
import httpProxy from 'http-proxy';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

import App from '../client/App';

const buildPath = path.join(__dirname, '../../build');
const isProd = process.env.NODE_ENV === 'production';

// Starts the server.
export default async function startServer(options) {
    // Create HTTP server.
    const app = new express();
    const { configuration: { output: { publicPath: baseUrl } } } = options;

    const stats = JSON.parse(fs.readFileSync(path.join(buildPath, 'react-loadable.json'), 'utf8'));

    // Serve static files.
    if (isProd) {
        app.use('/static', express.static(path.join(buildPath, 'static')));
    } else {
        const proxy = httpProxy.createProxyServer({ target: `${ baseUrl }static` });
        app.use('/static', (req, res) => proxy.web(req, res));
    }

    let templateHtml;

    if (isProd) {
        templateHtml = fs.readFileSync(path.join(buildPath, 'index.html'), 'utf8');
    } else {
        const template = await fetch(baseUrl);
        templateHtml = await template.text();
    }

    app.use((req, res) => {
        const context = {};
        const modules = [];
        const app = renderToString(
            <Loadable.Capture report={ moduleName => modules.push(moduleName) }>
                <StaticRouter location={req.url} context={context}>
                    <App />
                </StaticRouter>
            </Loadable.Capture>
        );
        const bundles = getBundles(stats, modules);

        const styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
        const scripts = bundles.filter(bundle => bundle.file.endsWith('.js'));

        let renderedHtml = templateHtml.replace(
            '<div id="app"></div>',
            `<div id="app">${ app }</div>
            ${scripts.map(bundle => `<script src="${bundle.publicPath}"></script>`).join('\n')}
            `
        );
        renderedHtml = renderedHtml.replace(
            '</head>',
            styles.map(bundle => `<link href="${bundle.publicPath}" rel="stylesheet"/>`).join('\n')
        );

        res.status(200);

        return res.send(renderedHtml);
    });

    Loadable.preloadAll().then(() => {
        app.listen(3000, () => {
            console.log('Running on http://localhost:3000/');
        });
    });
}
