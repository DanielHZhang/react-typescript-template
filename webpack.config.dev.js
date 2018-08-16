const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path');
const chalk = require('chalk');

const ENTRY_POINT = path.join(__dirname, 'src', 'index.tsx');

module.exports = {
  mode: 'development',
  entry: {
    app: [
      // 'react-hot-loader/patch',
      ENTRY_POINT
    ],
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
    // publicPath: 'http://localhost:3000/dist/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: ['react-hot-loader/babel']
            }
          },
          'awesome-typescript-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(gif|png|woff|woff2|eot|ttf|svg|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            limit: 50000
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CheckerPlugin(),
    new ProgressBarPlugin({
      format: `build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false
    })
  ],
  node: {
    fs: 'empty'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    compress: true,
    hot: true
  },
};
