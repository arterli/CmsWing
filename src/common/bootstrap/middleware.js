// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
/**
 * this file will be loaded before server started
 * you can register middleware
 * https://thinkjs.org/doc/middleware.html
 */

/**
 * 
 * think.middleware('xxx', http => {
 *   
 * })
 * 
 */
//import debugToolbar from 'think-debug-toolbar';
//
//let conf = {
//    panels: ['request', 'session', 'view', 'template', 'response', 'config', 'info'],
//    depth: 4,
//    extra_attrs: '',
//    disabled: false,
//    sort: false
//};
//
//think.middleware('debug_toolbar', debugToolbar(conf));
import wechatMiddleware from 'think-wechat';

think.middleware('parse_wechat', wechatMiddleware({
    pathname: 'uc/wechat',    //默认，可配置为其他路径，与公众号对应的服务器URL设置一致
    wechat: {
        token: think.config("setup.wx_Token"),
        appid: think.config("setup.wx_AppID"),
        encodingAESKey: ''
    }
}));
