import http from 'http';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import hpp from 'hpp';
import throng from 'throng';

import React from 'react';
import ReactDOM from 'react-dom/server';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { trigger } from 'redial';
import { StyleSheetServer } from 'aphrodite';
import Helm from 'react-helmet'; // because we are already using helmet
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import DefaultServerConfig from './config';
import webpackConfig from '../tools/webpack.client.dev';
import { compileDev, startDev } from '../tools/dx';
import { configureStore } from '../common/store';
import createRoutes from '../common/routes/root';
import { modRewrite } from './utils';

export const createServer = (config) => {
  const __PROD__ = config.nodeEnv === 'production';
  const __TEST__ = config.nodeEnv === 'test';

  const app = express();
  let assets = null;
  app.disable('x-powered-by');
  app.set('trust proxy', true);
  app.use(modRewrite);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  if (__PROD__ || __TEST__) {
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
    app.use(compression());
    if (__PROD__) {
      assets = require('../assets.json');
    }
  } else {
    app.use(morgan('dev'));
    const compiler = compileDev((webpack(webpackConfig)), config.port);
    app.use(webpackDevMiddleware(compiler, {
      quiet: true,
      watchOptions: {
        ignored: /node_modules/,
      },
    }));
    app.use(webpackHotMiddleware(compiler, { log: console.log }));
  }

  app.use(express.static('public'));
  app.use('/api/v0/posts', require('./api/posts'));


  app.get('*', (req, res) => {
    const store = configureStore({
      sourceRequest: {
        protocol: req.headers['x-forwarded-proto'] || req.protocol,
        host: req.headers.host,
      },
    });
    const routes = createRoutes(store);
    const history = createMemoryHistory(req.originalUrl);
    const { dispatch } = store;

    match({ routes, history }, (err, redirectLocation, renderProps) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
      }

      if (!renderProps) {
        return res.status(404).send('Not found');
      }

      const { components } = renderProps;

      // Define locals to be provided to all lifecycle hooks:
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,

        // Allow lifecycle hooks to dispatch Redux actions:
        dispatch,
      };

      return trigger('fetch', components, locals)
        .then(() => {
          const initialState = store.getState();
          const InitialView = (
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );

          // just call html = ReactDOM.renderToString(InitialView)
          // to if you don't want Aphrodite. Also change renderFullPage
          // accordingly
          const data = StyleSheetServer.renderStatic(
            () => ReactDOM.renderToString(InitialView),
          );
          const head = Helm.rewind();
          res.status(200).send(`
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charSet="utf-8">
                <meta httpEquiv="X-UA-Compatible" content="IE=edge">
                ${head.title.toString()}
                ${head.meta.toString()}
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
                <link rel="shortcut icon" href="/favicon.ico">
                <link rel="stylesheet" href="/app.css" />
                ${head.link.toString()}
                <style data-aphrodite>${data.css.content}</style>
              </head>
              <body>
                <div id="root">${data.html}</div>
                <script>
                  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

                  ga('create', 'UA-64447029-1', 'auto');
                  ga('send', 'pageview');

                </script>
                ${head.script.toString()}
                <script>window.renderedClassNames = ${JSON.stringify(data.css.renderedClassNames)};</script>
                <script>window.INITIAL_STATE = ${JSON.stringify(initialState)};</script>
                <script src="${__PROD__ ? assets.vendor.js : '/vendor.js'}"></script>
                <script async src="${__PROD__ ? assets.main.js : '/main.js'}" ></script>
              </body>
            </html>
          `);
        }).catch(e => console.log(e));
    });
  });


  const server = http.createServer(app);

  return server;
};


export const startServer = (serverConfig) => {
  const config = { ...DefaultServerConfig, ...serverConfig };
  const server = createServer(config);
  server.listen(config.port, (err) => {
    if (config.nodeEnv === 'production' || config.nodeEnv === 'test') {
      if (err) console.log(err);
      console.log(`server ${config.id} listening on port ${config.port}`);
    } else {
      startDev(config.port, err);
    }
  });
};

if (require.main === module) {
  throng({
    start: id => startServer({ id }),
    workers: process.env.WEB_CONCURRENCY || 1,
    lifetime: Infinity,
  });
}
