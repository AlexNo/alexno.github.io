exports.get = async (ctx, next) => {
  console.log('render settings page');
  ctx.body = ctx.render('settings/templates/settings');
};