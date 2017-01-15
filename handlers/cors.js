let cors = require('koa-cors');
let convert = require('koa-convert');

exports.init = app => app.use(convert(cors()));