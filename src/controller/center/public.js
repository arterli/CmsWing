// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.cmswing.center {
  /**
     * 注册页面
     */
  async registerAction() {
    if (this.isPost) {
      const data = this.post();
      // console.log(data);
      // 验证
      let res;
      if (think.isEmpty(data.username)) {
        return this.fail('用户昵称不能为空！');
      } else {
        res = await this.model('member').where({username: ltrim(data.username)}).find();
        if (!think.isEmpty(res)) {
          return this.fail('用户昵称已存在，请重新填写！');
        }
      }
      if (think.isEmpty(data.mobile)) {
        return this.fail('手机号码不能为空！');
      } else {
        res = await this.model('member').where({mobile: data.mobile}).find();
        if (!think.isEmpty(res)) {
          return this.fail('手机号码已存在，请重新填写！');
        }
      }
      if (think.isEmpty(data.email)) {
        return this.fail('电子邮箱不能为空！');
      } else {
        res = await this.model('member').where({email: data.email}).find();
        if (!think.isEmpty(res)) {
          return this.fail('电子邮箱已存在，请重新填写！');
        }
      }
      if (think.isEmpty(data.password) && think.isEmpty(data.password2)) {
        return this.fail('密码不能为空！');
      } else {
        if (data.password != data.password2) {
          return this.fail('两次输入的密码不一致，请重新填写！');
        }
      }
      if (data.clause != 'on') {
        return this.fail('必须要同意,网站服务条款');
      }

      data.status = 1;
      data.reg_time = new Date().valueOf();
      data.reg_ip = _ip2int(this.ip);
      data.password = encryptPassword(data.password);
      const reg = await this.model('member').add(data);
      await this.model('cmswing/member').autoLogin({id: reg}, this.ip);// 更新用户登录信息，自动登陆
      const userInfo = {
        'uid': reg,
        'username': data.username,
        'last_login_time': data.reg_time
      };
      await this.session('webuser', userInfo);
      return this.success({name: '注册成功,登录中!', url: '/center/index'});
    } else {
      this.meta_title = '用户注册';
      // 短信注册视图钩子
      await this.hook('smsRegistration');
      // 第三方登录钩子
      await this.hook('logins');
      return this.isMobile ? this.display(this.mtpl()) : this.display();
    }
  }
  //   登陆页面
  async loginAction() {
    // 判断公众账号类型
    if (this.config('setup.wx_type') == 4 || this.config('setup.wx_type') == 2) {
      await this.action('center/weixin', 'oauth');
    }
    if (this.isAjax('post')) {
      // 验证码 钩子
      const signinBefore = await this.hook('loginBefore');
      if (signinBefore === 'no') {
        return this.fail(-3, '验证码不正确!');
      }
      // 用户账号密码验证
      const username = this.post('username');
      let password = this.post('password');
      password = encryptPassword(password);
      const res = await this.model('cmswing/member').signin(username, password, this.ip, 5, 0);
      // 钩子
      if (res.uid > 0) {
        // 记录用户登录行为
        // await this.model("action").log("user_login", "member", res.uid, res.uid, this.ip(), this.http.url);
        // console.log(111111111111121);
        // console.log(res);
        await this.session('webuser', res);
        // TODO 用户密钥
        return this.success({name: '登录成功！'});
      } else { // 登录失败
        let fail;
        switch (res) {
          case -1:
            fail = '用户不存在或被禁用';
            break; // 系统级别禁用
          case -2:
            fail = '密码错误';
            break;
          default:
            fail = '未知错误';
            break; // 0-接口参数错误（调试阶段使用）
        }
        return this.fail(res, fail);
      }
    } else {
      // 如果已经登陆直接跳转到用户中心
      if (this.is_login) {
        return this.redirect('/center/index');
      }
      this.meta_title = '用户登录';
      // 第三方登录钩子
      await this.hook('logins');
      // 登录验证视图钩子
      await this.hook('loginView');
      // 判断浏览客户端
      if (this.isMobile) {
        this.active = 'center/index';
        return this.display(this.mtpl());
      } else {
        return this.display();
      }
    }
  }
  // 退出登录
  async logoutAction() {
    // 退出登录

    if (this.is_login) {
      await this.session('webuser', null);
      // 清楚cy_id
      // await this.session("wx_openid",null);
      // cysoIp9AH
      return this.display();
    } else {
      return this.redirect('/index');
    }
  }
};
