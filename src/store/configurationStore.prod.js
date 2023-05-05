import thunk from 'redux-thunk';
import {createStore,compose,applyMiddleware} from 'redux';

import { isServer } from '../utils/environment';
import rootReducer from '../reducers/root';
import crashReporting from '../middleware/crash';

let store;
export default function configurationStore(initialState) {
    // on the client side we to make sure it's singleton
    // reset always on the server side
    if (store && !isServer()) {
        return store;
    }
    const hydratedState = 
    // we embed the initial state as a data property on an HTML element
    !isServer() && Process.env.NODE_ENV === 'production'
       ? window._INITIAL_STATE_
       : initialState;
    store = createStore(
        rootReducer,
        hydratedState,
        compose(applyMiddleware(thunk,crashReporting))
    );
    return store;
}