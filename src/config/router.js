module.exports = [
  ['', 'home/index/index', 'get'],
  ['/index', 'home/index/index', 'get'],
  ['/index/:order', 'home/index/index', 'get'],
  ['/p/:id', 'home/detail/index', 'get'],
  ['/dlink/:id', 'home/detail/downloadgetid', 'get'],
  ['/u/avatar', 'center/index/avatar', 'get'],
  ['/u/avatar/:uid', 'center/index/avatar', 'get'],
  ['/search', 'home/search/index', 'get'],
  ['/topic', 'home/keyword/index', 'get'],
  ['/topic/:key', 'home/keyword/index', 'get'],
  ['/t/:key', 'home/keyword/list', 'get'],
  ['/admin/mod/:cate_id', 'cmswing/modadminbase/index', 'get'],
  ['/q/:id', 'mod/question/index/detail', 'get'],
  [/\/api\/(\w+)(?:\/(\d+))?/, 'api/:1?id=:2', 'rest'],
  ['/download/:id/:name', 'home/detail/download', 'get'],
  // [/^(?!\/admin\/|\/home\/|\/center\/|\/api\/|\/uxxx\/):id/i, '/home/route/index/:1/', 'get'],
  ['/:category', 'cmswing/route/index', 'get']
];
