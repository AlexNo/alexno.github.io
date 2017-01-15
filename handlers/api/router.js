const router = require('koa-router')();

router.get('/', require('./controller/weather').get);

module.exports = router;