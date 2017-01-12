const NODE_ENV = process.env.NODE_ENV || 'dev';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        app: './handlers/app/client/',
        // test: './test'
        vendor: [
            '@angular/core',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic'
        ]
    },
    output: {
        path: __dirname + '/public',
        filename: NODE_ENV === 'prod' ? 'js/[name].[hash].js?[hash]' : '[name].js?[hash]'
    },

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: 'cheap-inline-module-source-map',

    plugins: [
        new webpack.NoErrorsPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            // The order of this array matters
            names: ['common', 'vendor'],
            minChunks: 2
        }),

        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),

        new ExtractTextPlugin('styles.css'),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.optimize.OccurenceOrderPlugin()
    ],

    externals: {
        "google": "google"
    },

    resolve: {
        modulesDirectories: [
            path.join(__dirname, 'node_modules')
        ],
        extensions: ['', '.js', '.ts']
    },

    htmlLoader: {
        minimize: false // workaround for ng2
    },

    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'awesome-typescript-loader!angular2-template-loader'
        }, {
            test: /\.html$/,
            loader: 'raw'
        }, {
            test: /\.css$/,
            loader: NODE_ENV == 'prod' ? 'style!css' : ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.styl$/,
            exclude: /node_modules/,
            loader: 'raw!stylus'
        }, {
            test: /\.(png|jpg|svg|ttf|eof|eot|woff|woff2|gif)$/,
            loader: 'file?name=/images/[name].[hash].[ext]'
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
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