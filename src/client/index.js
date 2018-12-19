import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PageLoader from 'components/PageLoader';
import App from './App';

ReactDOM.hydrate(
    <BrowserRouter>
        <PageLoader>
            <App />
        </PageLoader>
    </BrowserRouter>,
    document.getElementById('app')
);
