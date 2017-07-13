module.exports = [
    ['', '/home/index', 'get'],
    ['/index', '/home/index/index', 'get'],
    ['/index/:order', '/home/index/index/:1/', 'get'],
    ['/p/:id', "/home/detail/index/:1/",'get'],
    ['/dlink/:id', "/home/detail/downloadgetid/:1/",'get'],
    [/^(?!\/admin\/|\/home\/|\/center\/|\/uuu\/|\/uxxx\/):id/i, '/home/route/index/:1/', 'get'],
    ['/:category', '/home/route/index/:1/', 'get'],
];