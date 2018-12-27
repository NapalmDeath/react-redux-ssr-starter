import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import createStore from 'store';
import createRoutes from 'shared/routes';

let preloadedState = {};

const preloadedScript = document.getElementById('__preloaded_state__');
if (preloadedScript) {
    preloadedState = window.__PRELOADED_STATE__ || {};
    delete window.__PRELOADED_STATE__;
    preloadedScript.remove();
}

const store = createStore(preloadedState);
const routes = createRoutes(store);

ReactDOM.hydrate(
    <Provider store={ store }>
        <BrowserRouter>
            <App routes={ routes } />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
