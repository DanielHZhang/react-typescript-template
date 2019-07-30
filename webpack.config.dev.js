const {
  PORT,
  REACT_ENTRY_PATH,
  VENDOR_JSON_PATH,
  BUILD_URL,
  BUILD_OUTPUT_PATH,
} = require('./webpack.constants');
const {join} = require('path');
const webpack = require('webpack');
const ProgressPlugin = require('@supersede/webpack-progress-plugin');
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');
const manifest = require(join(process.cwd(), ...VENDOR_JSON_PATH));
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

/**
 * @type webpack.Configuration
 */
module.exports.config = {
  mode: 'development',
  target: 'web',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      join(process.cwd(), ...REACT_ENTRY_PATH),
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: join(process.cwd(), ...BUILD_OUTPUT_PATH),
    publicPath: BUILD_URL,
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ],
      },
      {
        test: /\.scss$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|woff|woff2|eot|ttf|svg|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'files/[name].[ext]',
            limit: 50000,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin({configFile: join(process.cwd(), 'client', 'tsconfig.json')})],
  },
  plugins: [
    new ProgressPlugin({format: 'minimal'}),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      PORT,
    }),
    // new BundleAnalyzerPlugin(),
  ],
  // node: {
  //   child_process: 'empty',
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty',
  // },
};
