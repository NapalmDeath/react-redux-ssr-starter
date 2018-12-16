import { client } from 'universal-webpack/config'
import settings from './universal-webpack-settings'
import configuration from './client.config';

// Create client-side Webpack config.
export default client(configuration, settings)
