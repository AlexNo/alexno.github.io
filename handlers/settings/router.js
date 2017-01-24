const router = require('koa-router')();

router.get('/', require('./controller/settings').get);

module.exports = router;