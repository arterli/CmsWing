module.exports = [{
  cron: '*/1 * * * *',
  handle: 'admin/crontab/cloa',
  worker: 'all',
  enable: true // 关闭当前定时器，默认true
}];
