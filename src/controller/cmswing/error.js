// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.Controller {
  okAction(message = '成功信息！', status = 0) {
    if (this.isJsonp()) {
      return this.jsonp({
        [this.config('errnoField')]: status,
        [this.config('errmsgField ')]: message
      });
    } else if (this.isAjax()) {
      return this.fail(status, message);
    }
    this.assign({
      status: status,
      message: message
    });

    return this.display('cmswing/error_ok');
  }
  noAction(message = '错误信息！', status = 100) {
    if (this.isJsonp()) {
      return this.jsonp({
        [this.config('errnoField')]: status,
        [this.config('errmsgField ')]: message
      });
    } else if (this.isAjax()) {
      return this.fail(status, message);
    }
    this.assign({
      status: status,
      message: message
    });

    return this.display('cmswing/error_no');
  }
  loginAction(message = '错误信息！', status = 700) {
    if (this.isJsonp()) {
      return this.jsonp({
        [this.config('errnoField')]: status,
        [this.config('errmsgField ')]: message
      });
    } else if (this.isAjax()) {
      return this.fail(status, message);
    }
    this.assign({
      status: status,
      message: message
    });

    return this.display('cmswing/error_login');
  }
};
