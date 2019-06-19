const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const merge = require('webpack-merge');

const commonConfig = require('./common.config');

const srcPath = path.join(__dirname, '..', 'src');
const buildPath = path.join(__dirname, '..', 'build');

const isProd = process.env.NODE_ENV === 'production';

module.exports = merge(commonConfig, {
  devtool: 'source-map',
  optimization: {
    minimizer: isProd
      ? [
          new TerserPlugin({
            cache: true,
            parallel: true,
            terserOptions: {
              output: {
                comments: false
              }
            }
          })
        ]
      : []
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html.ejs'),
      filename: 'index.html'
    }),
    new LoadablePlugin({
      filename: path.join(buildPath, 'loadable-stats.json'),
      writeToDisk: true
    }),
    new MiniCssPlugin({
      filename: 'static/css/[name]-[hash].css'
    })
  ]
});
