exports.get = async (ctx, next) => {
    console.log('render main page');
    ctx.body = ctx.render('app/templates/main');
};