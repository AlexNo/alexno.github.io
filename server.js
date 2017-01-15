const Koa = require('koa');
let app = new Koa();
const config = require('config');

config.handlers.forEach(handler => {
    require(`./handlers/${handler}`).init(app);
});

module.exports = app;