const Koa = require('koa');
const app = new Koa();
const config = require('config');
const Webpack = require('webpack');
const wpConfig = require('./webpack.config.js');
const middleware = require('koa-webpack');
const compiler = Webpack(wpConfig);

config.handlers.forEach(handler => {
    require(`./handlers/${handler}`).init(app);
});

app.use(middleware({
  compiler: compiler,
  dev: {
    publicPath: '/dist/'
  }
}));

console.log('test');

if (module.hot) {
  module.hot.accept()
}

module.exports = app;