/**
 * Ts-node register used for start:api and start:i modes as the --inspect flag requires
 * the default node CLI. Uses the same compilerOptions as server's tsconfig.json.
 */
require('ts-node').register({project: require('path').join(__dirname, 'tsconfig.json')});
require('./server').main().catch((error) => console.error(`Fatal server error: ${error}`));
