// hooks
module.exports = class extends think.cmswing.extIndex {
  // 后台登录 控制器验证
  async signinBefore() {
    // 钩子业务处理
    if (Number(this.config('ext.geetest.isa')) === 1) {
      const geetest = this.extService('geetest', 'geetest');
      const validate = await geetest.validate(this.ctx, this.post());
      if (validate.status !== 'success') {
        return 'no';
      }
    }
  }
  // 后台登录 视图显示
  async signinView() {
    if (Number(this.config('ext.geetest.isa')) === 1) {
      const html = await this.hookRender('signinView', 'geetest');
      return html;
    }
  }

  // 后台登录 控制器验证
  async loginBefore() {
    // 钩子业务处理
    if (Number(this.config('ext.geetest.isl')) === 1) {
      const geetest = this.extService('geetest', 'geetest');
      const validate = await geetest.validate(this.ctx, this.post());
      if (validate.status !== 'success') {
        return 'no';
      }
    }
  }
  // 后台登录 视图显示
  async loginView() {
    if (Number(this.config('ext.geetest.isl')) === 1) {
      let html;
      if (this.isMobile) {
        html = await this.hookRender('loginView', 'geetest', 'm');
      } else {
        html = await this.hookRender('loginView', 'geetest');
      }
      return html;
    }
  }
};
