const router = require('koa-router')();

router.get('/', require('./controller/weather').get);
router.get('/weather', require('./controller/weather').weather);
router.get('/city', require('./controller/weather').city);

module.exports = router;