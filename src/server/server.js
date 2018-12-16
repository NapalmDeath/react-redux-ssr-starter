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

    const stats = fs.readFileSync(path.join(buildPath, 'react-loadable.json'));

    // Serve static files.
    if (isProd) {
        app.use('/static', express.static(path.join(buildPath, 'static')));
    } else {
        const proxy = httpProxy.createProxyServer({ target: 'http://127.0.0.1:3001/static' });
        app.use('/static', (req, res) => proxy.web(req, res));
    }

    // Proxy API calls to API server.
    const proxy = httpProxy.createProxyServer({ target: 'http://localhost:8081' });
    app.use('/api', (req, res) => proxy.web(req, res));

    let templateHtml;

    if (isProd) {
        templateHtml = fs.readFileSync(path.join(buildPath, 'index.html'), 'utf8');
    } else {
        const template = await fetch(`http://127.0.0.1:3001`);
        templateHtml = await template.text();
    }

    // React application rendering.
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

        res.status(200);
        return res.send(
            templateHtml.replace(
                '<div id="app"></div>',
                `<div id="app">${ app }</div>
                ${bundles.map(bundle => `<script src="${bundle.publicPath}"></script>`).join('\n')}
                `
            )
        );
    });

    // Start the HTTP server.
    app.listen(3000);
}
