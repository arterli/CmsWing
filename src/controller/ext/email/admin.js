// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.cmswing.extAdmin {
  async indexAction() {
    const email = this.extService('email', 'email');
    email.send({
      to: '15617817578@163.com',  // list of receivers
      subject: 'this is subject',   // subject line
      html: '<b>this is HTML content</b>' // html content
    });
    return this.success();
  }
};
