import express from 'express';
import webpack from 'webpack';
import http from 'http';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import {join} from 'path';
import {json, urlencoded} from 'body-parser';
import {BUILD_URL, VENDOR_BUNDLE_PATH, VENDOR_BUNDLE_FILENAME, PORT} from '../webpack.constants';
import {mainRouter} from './routes';

/** Checks if the server is started in API only mode (no webpack compilation) */
const API_ONLY = process.env.API_ONLY === 'true';

/** Checks if the server is started in development mode */
const DEV_ENV = process.env.NODE_ENV === 'development';

/** Path to the index HTML file (root of the application) */
const INDEX_PATH = join(process.cwd(), 'assets', 'index.html');

/** Path to the static folder (serves images, files, etc.) */
const ASSETS_PATH = join(process.cwd(), 'assets');

/** Path to the vendor bundle javascript file on the local file system */
const BUNDLE_PATH = join(process.cwd(), ...VENDOR_BUNDLE_PATH);

export async function main() {
  const app = express();
  const runtime =  http.createServer(app);

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
    res.sendFile(INDEX_PATH);
  });

  /** Listen */
  return runtime.listen(PORT, () => {
    if (API_ONLY) {
      console.log(`Server started on port ${PORT}!`);
    }
  });
}
