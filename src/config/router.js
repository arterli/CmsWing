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
  [/(^(?!\/admin|\/home\/|\/center\/|\/api\/|\/mod\/|\/ext\/).*)$/, 'cmswing/route/index?category=:1', 'get']
];
