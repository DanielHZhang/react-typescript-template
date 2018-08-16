const path = require('path');
const webpack = require('webpack');
const {CheckerPlugin} = require('awesome-typescript-loader');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

const ENTRY_POINT = path.join(process.cwd(), 'src', 'index.tsx');
// Path on the local file system to serve from
const OUTPUT_PATH = path.join(process.cwd(), 'assets');
// Path by which the HTML will access the bundle
const OUTPUT_PUBLIC_PATH = 'http://localhost:3000/assets/';

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    app: [
      'react-hot-loader/patch',
      ENTRY_POINT
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: OUTPUT_PATH,
    publicPath: OUTPUT_PUBLIC_PATH,
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
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
    new webpack.DllReferencePlugin({ // Reference pre-built vendor dlls
      context: process.cwd(),
      manifest: require(path.join(process.cwd(), 'assets', 'vendor', 'vendor.json'))
    }),
    new CheckerPlugin(),
    new SimpleProgressWebpackPlugin({format: 'minimal'}),
    new webpack.HotModuleReplacementPlugin(), // Enable HMR
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      PORT: 3000,
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
  devServer: {
    contentBase: [OUTPUT_PATH, path.join(OUTPUT_PATH, 'vendor')],
    port: 3000,
    compress: true,
    hot: true
  },
};
