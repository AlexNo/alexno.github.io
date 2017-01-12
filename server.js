const Koa = require('koa');
const convert = require('koa-convert');
let app = new Koa();
const config = require('config');
const Webpack = require('webpack');
const webpackMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');
const webpackConfig = require('./webpack.config');


const compiler = Webpack(webpackConfig);

config.handlers.forEach(handler => {
    require(`./handlers/${handler}`).init(app);
});

const middleware = webpackMiddleware(compiler);

app.use(convert(middleware));
app.use(convert(webpackHotMiddleware(compiler)));

module.exports = app;