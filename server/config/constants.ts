import {join} from 'path';
import {VENDOR_BUNDLE_PATH} from 'webpack.constants';

/** Checks if the server is started in API only mode (no webpack compilation) */
export const API_ONLY = process.env.API_ONLY === 'true';

/** Checks if the server is started in development mode */
export const DEV_ENV = process.env.NODE_ENV === 'development';

/** Path to the index HTML file (root of the application) */
export const INDEX_PATH = join(process.cwd(), 'assets', 'index.html');

/** Path to the static folder (serves images, files, etc.) */
export const ASSETS_PATH = join(process.cwd(), 'assets');

/** Path to the vendor bundle javascript file on the local file system */
export const BUNDLE_PATH = join(process.cwd(), ...VENDOR_BUNDLE_PATH);
