const mount = require('koa-mount');

exports.init = app => {
  console.log('Settings part initialized');
  const router = require('./router');

  app.use(mount('/settings', router.middleware()));
};