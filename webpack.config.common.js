const path = require('path');
const webpack = require('webpack');

const OUTPUT_PATH = path.join(process.cwd(), 'dist');
const OUTPUT_PUBLIC_PATH = path.join('http://localhost:3000/assets/');

/**
 * Webpack configuration for common vendor bundle, using DllPlugin for long-term
 * bundle caching of vendor files. Only needs to be rebuilt when updating dependencies.
 */
module.exports = {
  mode: 'development', // Can be changed to production for minification
  context: process.cwd(), // Use current working directory
  entry: {
    vendor: [
      'core-js',
      'react',
      'react-dom',
      'react-router-dom',
      'react-redux',
      'redux',
      'redux-thunk',
    ],
  },
  output: {
    filename: '[name].dll.js',
    library: '[name]',
    path: OUTPUT_PATH,
    publicPath: OUTPUT_PUBLIC_PATH,
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(OUTPUT_PATH, '[name].json'),
    }),
  ],
};
