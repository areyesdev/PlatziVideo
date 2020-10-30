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
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="assets/app.css" type="text/css"/> 
        <title>Platzi Video</title>
    </head>
    <body>
        <div id="app"></div>
    </body>
    <script src="assets/app.js" type="text/javascript"></script>
    </html>
  `);
});

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Server running on port ${port}`);
});
