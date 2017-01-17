const NODE_ENV = process.env.NODE_ENV || 'dev';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        app: './handlers/app/client/',
        vendor: [
            'core-js/es7/reflect',
            'zone.js',
            '@angular/core',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic'
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: NODE_ENV === 'prod' ? 'js/[name].[hash].js?[hash]' : '[name].js?[hash]'
    },

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: 'cheap-inline-module-source-map',

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            // The order of this array matters
            names: ['common', 'vendor'],
            minChunks: 2
        }),

        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),

        new ExtractTextPlugin({
          filename: 'styles.css'
        }),

        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({
            template: 'templates/index.html',
            inject: 'body',
            filename: '../index.html',
            hash: true,
            chunks: ['vendor', 'app']
        })
    ],

    externals: {
        "google": "google"
    },

    resolve: {
        modules: [
            path.join(__dirname, 'node_modules')
        ],
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'awesome-typescript-loader!angular2-template-loader'
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.css$/,
            // loader: NODE_ENV == 'prod' ? 'style!css' : ExtractTextPlugin.extract('style', 'css')
          loader: ExtractTextPlugin.extract({
            fallbackLoader: "style-loader",
            loader: "css-loader"
        })
        }, {
            test: /\.styl$/,
            exclude: /node_modules/,
            loader: 'raw-loader!stylus-loader'
        }, {
            test: /\.(png|jpg|svg|ttf|eof|eot|woff|woff2|gif)$/,
            loader: 'file-loader?name=/images/[name].[hash].[ext]'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
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