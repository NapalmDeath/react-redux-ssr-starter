const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const {
    projectFolder,
    buildPath,
    rules,
    srcPath,
    devServer,
    output,
} = require('./common.config');

module.exports = {
    context: projectFolder,
    entry: path.join(srcPath, 'client', 'index.js'),
    devtool: 'source-map',
    output,
    module: {
        rules,
    },
    optimization: {
        namedChunks: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
        }),
        new ReactLoadablePlugin({
            filename: path.join(buildPath, 'react-loadable.json'),
        }),
        new MiniCssPlugin({
            filename: 'static/css/[name]-[hash].css'
        })
    ],
    devServer,
};
