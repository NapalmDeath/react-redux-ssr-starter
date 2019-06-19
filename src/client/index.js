import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import createStore from 'store';
import createRoutes from 'shared/routes';

let preloadedState = {};
const context = {};

const preloadedScript = document.getElementById('__preloaded_state__');
if (preloadedScript) {
  preloadedState = window.__PRELOADED_STATE__ || {};
  delete window.__PRELOADED_STATE__;

  context.initialLoad = window.__INITIAL_LOAD__ || false;
  delete window.__INITIAL_LOAD__;

  preloadedScript.remove();
}

const store = createStore(preloadedState);
const routes = createRoutes(store);

loadableReady(() => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App routes={routes} context={context} />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  );
});
