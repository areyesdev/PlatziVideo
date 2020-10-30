/* eslint-disable global-require */
import React from 'react';
import { renderToString } from 'react-dom/server';
//Funcion para renderear los componentes como string
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import webpack from 'webpack';
import serverRoutes from '../frontend/routes/serverRoutes';
import reducer from '../frontend/reducers';
import initialState from '../frontend/initialState';
import config from './config';
import Layout from '../frontend/components/Layout';

const { env, port } = config;

const app = express();
if (env === 'development') {
  console.log(env);
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = { port: process.env.PORT, hot: true };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));

}

const setResponse = (html, preloadedState) => {
  return (`<!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="assets/app.css" type="text/css"/> 
        <title>Platzi Video</title>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script src="assets/app.js" type="text/javascript"></script>
    </html>`);
};

const renderApp = (req, res) => {
  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Layout>
          {renderRoutes(serverRoutes)}
        </Layout>
      </StaticRouter>
    </Provider>,
  ); //con esta funcion preparamos el provider para el redux y el router,
  //dentro del router colocamos la funcion renderRoutes y le pasamos el archivo de las rutas
  res.send(setResponse(html, preloadedState));
};

app.get('*', renderApp);

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server running on port ${port}`);
});
