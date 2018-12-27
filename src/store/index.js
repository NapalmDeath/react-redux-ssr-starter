import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import texts from './texts';

export default (preloadedStore = {}) => createStore(combineReducers({
    texts
}),
    preloadedStore,
    applyMiddleware(thunk)
);
