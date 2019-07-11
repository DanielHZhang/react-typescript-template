const path = require('path');
const webpack = require('webpack');
const ExtractCssPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  REACT_ENTRY_PATH,
  BUILD_OUTPUT_PATH,
  vendors,
} = require('./webpack.constants');

module.exports = {
  mode: 'production',
  entry: {
    vendor: vendors,
    app: [path.join(process.cwd(), ...REACT_ENTRY_PATH)],
  },
  output: {
    path: path.join(process.cwd(), ...BUILD_OUTPUT_PATH),
    filename: '[name].[chunkhash].js',
    publicPath: '/assets/',
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: ['awesome-typescript-loader'],
    },
    {
      test: /\.css$/,
      use: [{
        loader: ExtractCssPlugin.loader,
        options: {
          minimize: true,
        },
      }],
    },
    {
      test: /\.scss$/,
      use: [{
        loader: ExtractCssPlugin.loader,
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'sass-loader'
      }
      ],
    },
    {
      test: /\.less$/,
      use: [{
        loader: ExtractCssPlugin.loader,
        options: {
          minimize: true,
        },
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
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'assets', 'template.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
    new ExtractCssPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // Ignore moment locale modules
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
