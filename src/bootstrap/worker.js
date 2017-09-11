// invoked in worker
require('./global');
require('./model');
require('./tags');
think.beforeStartServer(async() => {
  const config = await think.model('setup').getset();
  think.config('setup', config); // 从数据库中将配置读取出来，然后设置
});
