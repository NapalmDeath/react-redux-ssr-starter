const path = require('path');
const MiniCssPlugin = require('mini-css-extract-plugin');

const {
    rules,
    srcPath,
    devServer,
    output,
    projectFolder,
} = require('./common.config');

module.exports = {
    entry: path.join(srcPath, 'client', 'index.js'),
    context: projectFolder,
    output,
    module: {
        rules,
    },
    plugins: [
        new MiniCssPlugin({
            filename: 'static/css/[name]-[hash].css'
        })
    ],
    devServer,
};
