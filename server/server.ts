import express from 'express';
import webpack from 'webpack';
import http from 'http';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import {json, urlencoded} from 'body-parser';
import {BUILD_URL, PORT, VENDOR_BUNDLE_FILENAME} from 'webpack.constants';
import {DEV_ENV, API_ONLY, ASSETS_PATH, BUNDLE_PATH, INDEX_PATH} from 'server/config/constants';
import {mainRouter} from 'server/routes';

export async function main() {
  const app = express();
  const runtime = http.createServer(app);

  /**
   * Setup webpack configuration and its associated top-level express middleware.
   * Only served in development if the server is not in API_ONLY mode.
   */
  if (DEV_ENV && !API_ONLY) {
    // Require the webpack config synchronously to prevent extraneous webpack output
    const webpackDevConfig = require('../webpack.config.dev').config;
    const compiler = webpack(webpackDevConfig);
    const options = {
      publicPath: BUILD_URL, // Serve app.bundle.js on https://.../assets
      logLevel: 'error', // Suppress build info output
    };
    app.use(webpackDevMiddleware(compiler, options));
    app.use(webpackHotMiddleware(compiler));
    app.use(express.static(ASSETS_PATH)); // Serve website external assets
  }

  /** Middleware */
  app.use(json({limit: '50mb'}));
  app.use(urlencoded({extended: true, limit: '50mb'}));

  /** Routes */
  app.use(mainRouter);
  app.get('*', (req, res) => {
    if (req.url === `/assets/${VENDOR_BUNDLE_FILENAME}`) {
      return res.sendFile(BUNDLE_PATH);
    }
    return res.sendFile(INDEX_PATH);
  });

  /** Listen */
  return runtime.listen(PORT, () => {
    if (API_ONLY) {
      console.log(`Server started on port ${PORT}!`);
    }
  });
}
