const router = require('koa-router')();
const config = require('config');

router.get('/', require('./controller/main').get);

module.exports = router;