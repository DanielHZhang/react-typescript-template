import webpack from 'webpack';
import ProgressPlugin from 'simple-progress-webpack-plugin';
import getConstants from './webpack.constants';
import path from 'path';

const {
  PORT,
  REACT_ENTRY_POINT,
  VENDOR_OUTPUT_PATH,
  OUTPUT_PUBLIC_PATH,
  VENDOR_DLL_PATH
} = getConstants(path);

export const config: webpack.Configuration = {
  mode: 'development',
  target: 'web',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      REACT_ENTRY_POINT,
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: VENDOR_OUTPUT_PATH,
    publicPath: OUTPUT_PUBLIC_PATH,
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['awesome-typescript-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['react-hot-loader/babel'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
      },
      {
        test: /\.scss$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}],
      },
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
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
            name: 'fonts/[name].[ext]',
            limit: 50000,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new ProgressPlugin({format: 'minimal'}),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(VENDOR_DLL_PATH)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      PORT,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // Ignore moment locale modules
    // new BundleAnalyzerPlugin(),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
