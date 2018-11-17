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
