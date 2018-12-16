var startServer = require('universal-webpack/server');
var settings = require('../webpack/universal-webpack-settings');
var configuration = require('../webpack/client.config');

startServer(configuration, settings);
