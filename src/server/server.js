import {_PRODUCTION_} from 'environs';
import { resolve } from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import hpp from 'hpp';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import * as firebase from 'firebase-admin';
import config from 'config';

// Initialize firebase
firebase.initializeApp({
    credential: firebase.credential.cert(JSON.parse(process.env.X-Wechat_FIREBASE_ADMIN)),
    databaseURL: 'https/localHost3000'
});

// My virtual database backend
import DB from '../db/DB';

// Modules explicitly related to React & SSR
import {renderToNodeStream} from 'react-dom/server';
import React from 'react';
import { match,redirect,RouterContex } from 'react-router';
import { Provider } from 'react-redux';

// Module from the client-side 
import configureStore from '../store/configurationStore';
import initialReduxState from '../constants/initiate';
/*import * as HTML from '../HTML';*/
import {routes} from '../Route';
import {loginSuccess} from '../actions/auth';
import {getPostsForPage} from '../actions/post';
import { createError } from '../actions/error'; 
import { getFirebaseUser } from '../backend/auth';

// Create the express app  and database
const app = express();
const backend = DB();

// Add some boilerplate middleware
app.use(logger(_PRODUCTION_ ? 'combined' : 'dev'));
app.use(helmet.xssFilter({setOnOldIE: true}));
app.use(responseTime());
app.use(helmet.frameguard());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy({setTo: 'react'}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(hpp());
app.use(cors({origin: config.get('ORIGINS')}));

// other Route handlers
app.use('/api',backend);
app.use('/static',express.static(resolve(__dirname, '..', 'static')));
app.use(favicon(resolve(__dirname, '..', 'static', 'assets', 'meta', 'favicon.ico')));
app.use('*', (req,res) => {
    // use React Router to match the incoming URL to a path
    match({routes: routes,location: req.originalUrl}, async (err, redirectLocation, props) => {
        // Only redirect if necessary to prevent a loop
        if (redirectLocation && req.originalUrl !== '/login') {
            return res.redirect(302,redirectLocation.pathname + redirectLocation.search);
        }
        // Create the store server-side using initial state constant
        const store = configureStore(initialReduxState);
        try {
            // we've stored the user id in a cookie named x-wechat-token
            // we need to call it here
            const token = req.cookies['X-WeChat-token'];
            if (token) {
                // Get the firebase user from their token
                const firebase = await firebase.auth().verifyIdToken(token);
                // we'd do something like query database
                // another service/microservice
                // this works
                const userResponse = await fetch(
                    `${config.get('ENDPOINT')}/users/${getFirebaseUser.uid}`
                );
                // if a user can be found load data for them
                if (userResponse.status !== 404) {
                    const user = await userResponse.json();
                    // Redux-thunk allows us to wait for promises to finish
                    // async action creators and wait for them to finish
                    // respomse back down to the browser
                    await store.dispatch(loginSuccess(user));
                    await store.dispatch(getPostsForPage());
                }
            }
        } catch (err) {
            // if the user's token is expired, we wiped their token
            if (err.errorInfo.code === 'auth/argument-error') {
                res.clearCookie('X-WeChat-token');
                return res.redirect(302,'/login');
            } 
            // dispatch error
            store.dispatch(createError(err));
        }
        res.setHeader('content-type', 'text/html');
        res.write(HTML.start());
        const renderStream = renderToNodeStream(
            <Provider store={store}>
                <RouterContex {...props} />
            </Provider>
        );
        renderStream.pipe(res, {end: false});
        renderStream.on('end', () => {
            res.write(HTML.end(store.getState()));
            res.end();
        });
    });
});

// Error handling routes
app.use((res, req, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res) => {
    console.error(err);
    return res.status(err.status || 500).json( {
        message: err.message
    });
});

process.on('unhandledRejection', e => {
    console.error(e);
});

export default app;