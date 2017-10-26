// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const fs = require('fs');
const superagent = require('superagent');
module.exports = class extends think.cmswing.extIndex {
  /**
   * index action
   * @return {Promise} []
   */
  /** qq登陆回掉地址
   * /ext/qq/index
   * */
  indexAction() {
    // auto render template file index_index.html
    if (Number(this.config('ext.qq.is')) === 0) {
      const error = this.controller('cmswing/error');
      return error.noAction('没有开启QQ登陆，请到后台开启！');
    }
    if (this.is_login) {
      return this.redirect('/center/index');
    }
    return this.extDisplay();
  }
  /** 获取qq登陆信息 */
  async loginresultAction() {
    if (Number(this.config('ext.qq.is')) === 0) {
      const error = this.controller('cmswing/error');
      return error.noAction('没有开启QQ登陆，请到后台开启！');
    }
    if (this.is_login) {
      return this.redirect('/center/index');
    }
    const res = this.get();
    const qq = this.extService('qq','qq', res.access_token, res.openid);
    const userinfo = await qq.get_user_info();
    const qq_user = await this.model('ext_qq').where({openid: res.openid}).find();
    if (think.isEmpty(qq_user)) {
      userinfo.openid = res.openid;
      // think.log(userinfo);
      await this.model('ext_qq').add(userinfo);
      return this.redirect(`/ext/qq/index/qqlogin/?id=${res.openid}`);
    } else {
      await this.model('ext_qq').where({openid: res.openid}).update(userinfo);
      // 检查qq号是否跟网站会员绑定
      if (think.isEmpty(qq_user.uid)) {
        // 没绑定跳转绑定页面
        return this.redirect(`/ext/qq/index/qqlogin/?id=${res.openid}`);
      } else {
        // 更qq信头像
        const filePath = think.resource + '/upload/avatar/' + qq_user.uid;
        think.mkdir(filePath);
        // 如果没有用户没有图像，使用QQ头像
        if (!think.isFile(filePath + '/avatar.png')) {
          await this.spiderImage(userinfo.figureurl_qq_2 || userinfo.figureurl_qq_1, filePath + '/avatar.png');
        }
        // 绑定直接登陆
        const last_login_time = await this.model('member').where({id: qq_user.uid}).getField('last_login_time', true);
        const qq_userInfo = {
          'uid': qq_user.uid,
          'username': userinfo.nickname,
          'last_login_time': last_login_time
        };
        await this.session('webuser', qq_userInfo);
        await this.model('cmswing/member').autoLogin({id: qq_user.uid}, this.ip);// 更新用户登录信息，自动登陆
        return this.redirect('/center/index');
      }
    }
  }
  // qq用户绑定页面
  async qqloginAction() {
    if (Number(this.config('ext.qq.is')) === 0) {
      const error = this.controller('common/error');
      return error.noAction('没有开启QQ登陆，请到后台开启！');
    }
    if (this.is_login) {
      return this.redirect('/center/index');
    }
    const openid = this.get('id');
    const qq_user = await this.model('ext_qq').where({openid: openid}).find();
    this.assign('qq_user', qq_user);
    this.meta_title = '账号绑定';
    return this.isMobile ? this.extDisplay('m') : this.extDisplay();
  }
  /** 完善资料绑定 */
  async organizingAction() {
    const data = this.post();
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
    data.status = 1;
    data.reg_time = new Date().valueOf();
    data.reg_ip = _ip2int(this.ip);
    data.password = encryptPassword(data.password);
    const reg = await this.model('member').add(data);
    if (!think.isEmpty(reg)) {
      // 添加用户副表
      await this.model('ext_qq').where({openid: data.openid}).update({uid: reg});
      // 更新微信头像
      const filePath = think.resource + '/upload/avatar/' + reg;
      think.mkdir(filePath);
      if (!think.isFile(filePath + '/avatar.png')) {
        await this.spiderImage(data.headimgurl, filePath + '/avatar.png');
      }
    }
    console.log(data);
    await this.model('cmswing/member').autoLogin({id: reg}, this.ip);// 更新用户登录信息，自动登陆
    const wx_userInfo = {
      'uid': reg,
      'username': data.username,
      'last_login_time': data.reg_time
    };
    await this.session('webuser', wx_userInfo);
    return this.success({name: '绑定成功', url: '/center/index'});
  }
  /** 登录绑定 */
  async logonbindingAction() {
    const data = this.post();
    // console.log(data);
    const username = this.post('username');
    let password = this.post('password');
    password = encryptPassword(password);
    console.log(data);

    const res = await this.model('cmswing/member').signin(username, password, this.ip, 5, 0);
    if (res.uid > 0) {
      // 记录用户登录行为
      // await this.model("action", {}, "admin").log("user_login", "member", res.uid, res.uid, this.ip(), this.http.url);
      // console.log(11111111111111);
      const qq_info = await this.model('ext_qq').where({openid: data.openid}).find();
      await this.model('ext_qq').where({openid: data.openid}).update({uid: res.uid});
      // 更新微信头像
      const filePath = think.resource + '/upload/avatar/' + res.uid;
      think.mkdir(filePath);
      if (!think.isFile(filePath + '/avatar.png')) {
        await this.spiderImage(data.headimgurl, filePath + '/avatar.png');
      }
      res.username = qq_info.nickname;
      await this.session('webuser', res);
      // TODO 用户密钥
      return this.success({name: '绑定成功', url: '/center/index'});
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
      return this.fail(fail);
    }
  }
  /**
   * 更新微信头像
   */
  spiderImage(imgUrl, filePath) {
    const deferred = think.defer();
    superagent
      .get(imgUrl) // 这里的URL也可以是绝对路径
      .end(function(req, res) {
        // console.log(filePath);
        // console.log(res.body);
        fs.writeFileSync(filePath, res.body);
        deferred.resolve(filePath);
      });
    return deferred.promise;
  }
};
