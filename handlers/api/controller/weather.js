exports.get = async (ctx, next) => {
    console.log('render main page');
    ctx.body = 'Weather API UP!';
};