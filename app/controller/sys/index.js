'use strict';
const Controller = require('../../core/base_controller');
const path = require('path');
/**
* @controller admin/index
*/
class IndexController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('sys/index');
  }
  async login() {
    const { ctx } = this;
    if (ctx.session.adminToken) {
      ctx.redirect('/admin');
    }
    await ctx.render('sys/login');
  }
  /**
  * @summary 登录接口
  * @description 登录接口1
  * @router get /admin/loginPost
  * @request body loginPost *body desc
  * @response 200 baseRes desc
  */
  async lginPost() {
    const { ctx } = this;
    let { username, password } = ctx.request.body;
    password = ctx.helper.cipher(password);
    const user = await ctx.model.SysUser.findOne({
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
    ctx.redirect('/sys/login');
  }
  async getJson() {
    const { ctx } = this;
    const name = ctx.params[0];
    const jsonDir = path.join(this.app.baseDir, 'app', 'pages', name);
    const json = require(jsonDir);
    ctx.body = json;
  }
}
module.exports = IndexController;
