// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.cmswing.extIndex {
  // 验证码
  async geetestAction() {
    const geetest = this.extService('geetest'); // 加载 commoon 模块下的 geetset service
    if (this.isPost) {
      const post = this.post();
      // console.log(post);
      const res = await geetest.validate(this.ctx, post);
      return this.json(res);
    } else {
      const res = await geetest.register(this.ctx);
      // console.log(res);
      return this.json(res);
    }
  }
};
