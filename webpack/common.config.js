const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcPath = path.join(__dirname, '..', 'src');
const clientPath = path.join(__dirname, '..', 'src', 'styles');
const buildPath = path.join(__dirname, '..', 'build');
const isProd = process.env.NODE_ENV === 'production';
const isServerBuild = process.env.BUILD === 'server';
const devPort = 3001;

const getCssLoader = (modules = false) => [
    {
        loader:
            isProd && !isServerBuild ? MiniCssExtractPlugin.loader : 'style-loader'
    },
    {
        loader: 'css-loader',
        options: {
            modules,
            importLoaders: 1,
            sourceMap: false,
            localIdentName: '[name]__[local]__[hash:base64:5]'
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            plugins: () => [autoprefixer()]
        }
    },
    {
        loader: 'sass-loader',
        options: {
            includePaths: [clientPath]
        }
    }
];

module.exports = {
    context: path.join(__dirname, '..'),
    entry: path.join(srcPath, 'client', 'index.js'),
    output: {
        path: buildPath,
        filename: 'static/js/[name]-[hash].js',
        sourceMapFilename: '[file].map',
        publicPath: isProd ? '/' : `http://127.0.0.1:${devPort}/`
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /.(s?css|sass)$/,
                exclude: /\.modules\.(s?css|sass)$/,
                use: getCssLoader(false)
            },
            {
                test: /\.modules\.(s?css|sass)$/,
                use: getCssLoader(true)
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 256,
                            name: 'static/img/[name]-[hash].[ext]'
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
                            name: 'static/fonts/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx'],
        alias: {
            client: `${srcPath}/client`,
            server: `${srcPath}/server`,
            shared: `${srcPath}/shared`,
            components: `${srcPath}/client/components`,
            pages: `${srcPath}/client/pages`,
            store: `${srcPath}/store`,
            styles: `${srcPath}/client/styles`,
            'react-dom': '@hot-loader/react-dom'
        }
    },
    devServer: {
        port: devPort,
        hot: true,
        inline: true,
        contentBase: srcPath,
        historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*' }
    }
};
