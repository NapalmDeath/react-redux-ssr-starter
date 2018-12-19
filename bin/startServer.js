const startServer = require('universal-webpack/server');
const settings = require('../webpack/universal-webpack-settings');
const configuration = require('../webpack/client.config');

startServer(configuration, settings);
