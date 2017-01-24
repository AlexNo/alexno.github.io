exports.init = app => {
    console.log('weather-app init');
    const router = require('./router');
    app.use(router.routes());
};