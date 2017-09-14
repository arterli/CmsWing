// invoked in worker
require('./global');
require('./model');
require('./tags');
think.beforeStartServer(async() => {
  // 加载网站配置
  const webconfig = await think.model('cmswing/setup').getset();
  think.config('setup', webconfig);
  // 加载扩展配置
  const extconfig = await think.model('cmswing/ext').getset();
  think.config('ext', extconfig);
});
