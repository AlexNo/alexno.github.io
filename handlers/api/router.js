const router = require('koa-router')();

router.get('/', require('./controller/weather').get);
router.get('/weather', require('./controller/weather').weather);

module.exports = router;