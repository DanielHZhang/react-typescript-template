import express from 'express';
import webpack from 'webpack';
import http from 'http';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import {join} from 'path';
import {connect} from 'mongoose';
import {json, urlencoded} from 'body-parser';
import {BUILD_URL, VENDOR_BUNDLE_PATH, VENDOR_BUNDLE_FILENAME} from '../webpack.constants';
import {ApiRouter, AuthRouter} from './routes';
import keys from './config/keys';

export class Server {
  /** Checks if the server is started in API only mode (no webpack compilation) */
  private static readonly API_ONLY = process.env.API_ONLY === 'true';

  /** Checks if the server is started in development mode */
  private static readonly DEV_ENV = process.env.NODE_ENV === 'development';

  /** Path to the index HTML file (root of the application) */
  private static readonly INDEX_PATH = join(process.cwd(), 'assets', 'index.html');

  /** Path to the static assets folder (serves images, files, etc.) */
  private static readonly ASSETS_PATH = join(process.cwd(), 'assets');

  /** Path to the vendor bundle javascript file on the local file system */
  private static readonly VENDOR_BUNDLE_PATH = join(process.cwd(), ...VENDOR_BUNDLE_PATH);

  /** Reference to the express application */
  private app: express.Application;

  /** Reference to the https node server */
  private runtime: http.Server;

  constructor() {
    this.app = express();
    this.serveWebpack();
    this.connectMongo();
    this.setupMiddleware();
    this.createRoutes();
    this.listen();
  }

  public static run(): Server {
    return new Server();
  }

  /**
   * Setup webpack configuration and its associated top-level express middleware.
   * Only served in development if the server is not in API_ONLY mode.
   */
  private serveWebpack() {
    if (Server.DEV_ENV && !Server.API_ONLY) {
      // Require the webpack config synchronously to prevent extraneous webpack output
      const webpackDevConfig = require('../webpack.config.dev').config;
      const compiler = webpack(webpackDevConfig);
      const options = {
        publicPath: BUILD_URL, // Serve app.bundle.js on https://.../assets
        logLevel: 'error', // Suppress build info output
      };
      this.app.use(webpackDevMiddleware(compiler, options));
      this.app.use(webpackHotMiddleware(compiler));
      this.app.use(express.static(Server.ASSETS_PATH)); // Serve website external assets
    }
  }

  /**
   * Connect to the MongoDB database hosted by mLabs. If that connection fails,
   * use a local MongoDB instance as a fallback.
   */
  private connectMongo() {
    // ONLY REQUIRED IF YOU ARE CONNECTING TO A MONGOOSE DATABASE
    return null;
    const options = {
      keepAlive: 1,
      reconnectTries: Number.MAX_VALUE,
      useNewUrlParser: true,
    };
    connect(keys.mongo.uri, options, (error) => {
      if (error) {
        console.error('\nCannot connect to the mLabs database.');
        console.error('Check your internet connection or firewall settings.');
        // Try to connect to local dev database if mLab connection fails
        connect(keys.mongo.uriLocal, options, (error) => {
          if (error) {
            console.error('\nCannot connect to the local database.');
            console.error('This is likely because the local database is not running.');
            console.error(error);
          }
          console.log('\nConnected to local the database.');
        });
      }
    });
  }

  /**
   * Setup express middlewares: body-parser, express-session, passport, image database.
   */
  private setupMiddleware() {
    this.app.use(json({limit: '50mb'}));
    this.app.use(urlencoded({extended: true, limit: '50mb'}));
  }

  /**
   * Create express routes to handle API calls and serve webpack assets.
   */
  private createRoutes() {
    this.app.use('/api', ApiRouter);
    this.app.use('/auth', AuthRouter);
    // ADD ADDITIONAL ROUTES HERE
    this.app.get('*', (req, res) => {
      if (req.url === `/assets/${VENDOR_BUNDLE_FILENAME}`) {
        return res.sendFile(Server.VENDOR_BUNDLE_PATH);
      }
      res.sendFile(Server.INDEX_PATH);
    });
  }

  /**
   * Listen for connections on the specified port.
   */
  private listen() {
    this.runtime = http.createServer(this.app);
    this.runtime.listen(PORT, () => {
      if (Server.API_ONLY) {
        console.log(`Server started on port ${PORT}!`);
      }
    });
  }
}
