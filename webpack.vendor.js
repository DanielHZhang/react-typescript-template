const path = require('path');
const webpack = require('webpack');
const {BUILD_OUTPUT_PATH, vendors} = require('./webpack.constants');

/**
 * Webpack configuration for common vendor bundle, using DllPlugin for long-term
 * bundle caching of vendor files. Only needs to be rebuilt when updating dependencies.
 */
module.exports = {
  mode: 'development', // Can be changed to production for minification
  context: process.cwd(), // Use current working directory
  entry: {
    vendor: vendors,
  },
  output: {
    filename: '[name].bundle.js',
    library: '[name]',
    path: BUILD_OUTPUT_PATH,
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(BUILD_OUTPUT_PATH, '[name].json'),
    }),
  ],
};
