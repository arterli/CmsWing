'use strict';
const Controller = require('../../core/base_controller');
const path = require('path');
/**
* @controller admin/index
*/
class IndexController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('admin/index');
  }
  async login() {
    const { ctx } = this;
    if (ctx.session.adminToken) {
      ctx.redirect('/admin');
    }
    await ctx.render('admin/login');
  }
  /**
  * @summary 登录接口
  * @description 登录接口
  * @router get /admin/loginPost
  * @request body loginPost *body desc
  * @response 200 baseRes desc
  */
  async lginPost() {
    const { ctx } = this;
    let { username, password } = ctx.request.body;
    password = ctx.helper.cipher(password);
    const user = await ctx.model.Admin.User.findOne({
      where: {
        username,
        password,
      },
    });
    if (user) {
      const token = ctx.helper.generateToken(user);
      // 设置 Session
      ctx.session.adminToken = token;
      console.log(token);
      this.success('登录成功');
    } else {
      this.fail('账号密码错误');
    }
  }
  // 退出登陆
  async logout() {
    const { ctx } = this;
    ctx.session.adminToken = null;
    ctx.redirect('/admin/login');
  }
  async getJson() {
    const { ctx } = this;
    const { name } = ctx.params;
    const jsonDir = path.join(this.app.baseDir, 'app', 'pages', name);
    const json = require(jsonDir);
    ctx.body = json;
  }
}
module.exports = IndexController;
