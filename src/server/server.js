/* eslint-disable global-require */
import express from 'express';
import webpack from 'webpack';
import config from './config';

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

app.get('*', (req, res) => {
  console.log('hola');
  res.send({ hello: 'express' }).end();
});

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server running on port ${port}`);
});
