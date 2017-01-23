exports.get = async (ctx, next) => {
    console.log('render main page');
    ctx.body = ctx.render('weather-app/templates/main');
};