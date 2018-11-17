const path = require('path');
const webpack = require('webpack');
const {VENDOR_OUTPUT_PATH} = require('./webpack.constants')(path);

/**
 * Webpack configuration for common vendor bundle, using DllPlugin for long-term
 * bundle caching of vendor files. Only needs to be rebuilt when updating dependencies.
 */
module.exports = {
  mode: 'development', // Can be changed to production for minification
  context: process.cwd(), // Use current working directory
  entry: {
    // Change this array to contain everything that does not need to be rebuilt often
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-redux',
      'redux',
    ],
  },
  output: {
    filename: '[name].dll.js',
    library: '[name]',
    path: VENDOR_OUTPUT_PATH,
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(VENDOR_OUTPUT_PATH, '[name].json'),
    }),
  ],
};
