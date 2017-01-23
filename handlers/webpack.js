const Webpack = require('webpack');
const wpConfig = require('./webpack.config.js');
const middleware = require('koa-webpack');
const compiler = Webpack(wpConfig);

exports.init = app => {
    app.use(middleware({
        compiler: compiler,
        dev: {
            publicPath: '/dist/',
            hot: true,
            noInfo: false,
            quiet: false,
            watchOptions: {
                aggregateTimeout: 300,
                poll: true
            },
            stats: {
                colors: true
            }
        },
        hot: {

        }
    }));
};