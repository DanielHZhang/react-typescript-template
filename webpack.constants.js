/**
 * Get the Webpack configuration constants
 *
 * @param {typeof import("path")} path NodeJS path module
 * @returns {{VENDOR_OUTPUT_PATH: string, OUTPUT_PUBLIC_PATH: string, REACT_ENTRY_POINT: string, VENDOR_DLL_PATH: string, VENDOR_JS_PATH: string, PORT: number}} String constants
 */
module.exports = function getConstants(path) {
  const PORT = 3000;
  return {
    // Port on localhost in which the server is served
    PORT,

    // Path on local file system to the root of React app
    REACT_ENTRY_POINT: path.join(process.cwd(), 'src', 'index.tsx'),

    // Path on the local file system to serve index.html from
    VENDOR_OUTPUT_PATH: path.join(process.cwd(), 'build'),

    // Path by which the HTML will access the bundle
    OUTPUT_PUBLIC_PATH: `http://localhost:${PORT}/assets/`,

    // Path to vendor dll json
    VENDOR_DLL_PATH: path.join(process.cwd(), 'build', 'vendor.json'),

    // Path in local file system to which the vendor files will be emitted
    VENDOR_JS_PATH: path.join(process.cwd(), 'build', 'vendor.dll.js'),
  }
}

/** Port that the server will run on -> default is 443 for all HTTPS connections */
module.exports.PORT = 3000;

/** URL path to which vendor files can be accessed from */
module.exports.BUILD_URL = `http://localhost${module.exports.PORT}/assets/`;

/** Path in the local file system to which the vendor files will be emitted */
module.exports.BUILD_OUTPUT_PATH = ['build'];

/** Path in the local file system to the client-side React root */
module.exports.REACT_ENTRY_PATH = ['src', 'index.tsx'];

/** Filename of the vendor bundle on local system */
module.exports.VENDOR_BUNDLE_FILENAME = 'vendor.bundle.js';

/** Path in the local file system to the vendor DLL JSON file */
module.exports.VENDOR_JSON_PATH = ['build', 'vendor.json'];

/** Path in the local file system to the vendor DLL javascript file */
module.exports.VENDOR_BUNDLE_PATH = ['build', module.exports.VENDOR_BUNDLE_FILENAME];

/** Array of vendors to bundle in DLL */
module.exports.vendors = [
  'react',
  'react-dom',
  'react-router-dom',
  'react-redux',
  'redux',
  'redux-thunk',
];
