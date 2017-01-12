exports.init = app => {
    console.log('app init');
    const router = require('./router');
    app.use(router.routes());
};