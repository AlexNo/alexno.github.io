const NODE_ENV = process.env.NODE_ENV || 'DEV';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        app: './app.ts',
        vendor: [
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: NODE_ENV === 'prod' ? 'js/[name].[hash].js' : '[name].js'
    },

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: 'cheap-inline-module-source-map',

    plugins: [
        new webpack.NoErrorsPlugin(),

        // new webpack.optimize.CommonsChunkPlugin({
        //     // The order of this array matters
        //     names: ['common', 'vendor'],
        //     minChunks: 2
        // }),

        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),

        new ExtractTextPlugin('styles.css'),

        new HtmlWebpackPlugin({
            template: 'templates/index.html',
            inject: 'body',
            filename: '../index.html',
            hash: true,
            chunks: ['vendor', 'app']
        })
    ],

    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "google": "google"
    },

    resolve: {
        modulesDirectories: [
            path.join(__dirname, 'node_modules')
        ],
        extensions: ['', '.js', '.ts']
    },

    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts!tslint'
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.styl$/,
            loader: 'style!css!stylus'
        }, {
            test: /\.(png|jpg|svg|ttf|eof|eot|woff|woff2|gif)$/,
            loader: 'file?name=/images/[name].[hash].[ext]'
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    },

    devServer: {
        host: 'localhost',
        port: 7007
    }
};

if(NODE_ENV == 'prod'){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            },
            output: {comments: false}
        })
    );
}