module.exports = [
    ['', '/home/index/index', 'get'],
    ['/index', '/home/index/index', 'get'],
    ['/index/:order', '/home/index/index/:1/', 'get'],
    ['/p/:id', "/home/detail/index/:1/",'get'],
    ['/dlink/:id', "/home/detail/downloadgetid/:1/",'get'],
    ['/u/avatar',"/center/index/avatar/:1/",'get'],
    ['/u/avatar/:uid',"/center/index/avatar/:1/",'get'],
    ['/search',"home/search/index","get"],
    ['/topic',"home/keyword/index",'get'],
    ['/topic/:key',"home/keyword/index/:1",'get'],
    ['/t/:key',"home/keyword/list/:1","get"],
    ['/q/:id','/mod/question/index/detail/:1/','get'],
    [/\/api\/category(?:\/(\d+))?/, 'api/category?id=:1', 'rest'],//rest
    [/\/api\/document(?:\/(\d+))?/, 'api/document?id=:1', 'rest'],//rest
    [/^(?!\/admin\/|\/home\/|\/center\/|\/api\/|\/uxxx\/):id/i, '/home/route/index/:1/', 'get'],
    ['/:category', '/home/route/index/:1/', 'get'],
];