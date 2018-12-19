const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssPlugin = require('mini-css-extract-plugin');

const srcPath = path.join(__dirname, '..', 'src');
const buildPath = path.join(__dirname, '..', 'build');
const isProd = process.env.NODE_ENV === 'production';
const isServerBuild = process.env.BUILD === 'server';
const devPort = 3001;

module.exports = {
    context: path.join(__dirname, '..'),
    entry: path.join(srcPath, 'client', 'index.js'),
    output: {
        path: buildPath,
        filename: "static/js/[name]-[hash].js",
        sourceMapFilename: '[file].map',
        publicPath: isProd ? '/' : `http://127.0.0.1:${ devPort }/`,
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                exclude: /node_modules/,

                use: [
                    {
                        loader: isServerBuild ? 'style-loader' : MiniCssPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            importLoaders: 1,
                            sourceMap: false,
                            localIdentName: isProd ? '[local][hash:base64:10]' : '[name]__[local]-[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer({ browsers: ['Safari >= 8', 'last 3 versions'] })]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: false
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 256,
                            name: 'static/img/[name]-[hash].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 256,
                            name: 'static/fonts/[name].[ext]',
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        port: devPort,
        hot: true,
        inline: true,
        contentBase: false,
        historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
    },
};
