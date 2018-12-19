import React from 'react';
import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

import App from '../client/App';
import loadData from '../shared/loadData';

const buildPath = path.join(__dirname, '../../build');
const srcPath = path.join(__dirname, '../../src');
const isProd = process.env.NODE_ENV === 'production';

const HOST = '127.0.0.1';
const PORT = 3000;

// Starts the server.
export default async function startServer(options) {
    // Create HTTP server.
    const app = new express();

    const stats = JSON.parse(fs.readFileSync(path.join(buildPath, 'react-loadable.json'), 'utf8'));

    // Serve static files.
    if (isProd) {
        app.use('/static', express.static(path.join(buildPath, 'static')));
    }

    let templateHtml;

    if (isProd) {
        templateHtml = fs.readFileSync(path.join(buildPath, 'index.html'), 'utf8');
    } else {
        templateHtml = fs.readFileSync(path.join(srcPath, 'index.html.ejs'), 'utf8')
    }

    app.use(async (req, res) => {
        await loadData(req.url);

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

        const styles = [
            ...bundles.filter(bundle => bundle.file.endsWith('.css')).map(style => style.publicPath),
            ...Object.values(options.chunks().styles),
        ];
        const scripts = [
            ...bundles.filter(bundle => bundle.file.endsWith('.js')).map(script => script.publicPath),
            ...Object.values(options.chunks().javascript),
        ];

        let renderedHtml = ejs.render(templateHtml, {
            app,
            scripts,
            styles,
        });

        res.status(200);

        return res.send(renderedHtml);
    });

    Loadable.preloadAll().then(() => {
        app.listen(PORT, HOST, () => {
            console.log(`Running on http://${ HOST }:${ PORT }/`);
        });
    });
}
