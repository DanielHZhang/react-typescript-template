/**
 * Ts-node register used for start:api and start:i modes as the --inspect flag
 * requires the default node CLI.
 *
 * Uses the same compilerOptions as server's tsconfig.json.
 */
const path = require('path');
require('ts-node').register({
  project: path.join(__dirname, 'tsconfig.json'),
});
const {Server} = require('./server');
Server.run();
