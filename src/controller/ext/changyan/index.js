// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const crypto = require('crypto');
const fs = require('fs');
const superagent = require('superagent');
module.exports = class extends think.cmswing.extIndex {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    // auto render template file index_index.html
    return this.display();
  }
  // 获取用户信息接口
  getuserinfoAction() {
    //

    const cy_appkey = this.config('ext.changyan.appkey');
    let ret;
    if (this.is_login) {
      ret = {
        'is_login': 1, // 已登录，返回登录的用户信息
        'user': {
          'user_id': this.user.uid,
          'nickname': this.user.username,
          'img_url': '//' + this.ctx.host + '/u/avatar/' + this.user.uid,
          'profile_url': '',
          'sign': this.cysign(cy_appkey, '', '', this.user.username, '', this.user.uid)}
      };
    } else {
      ret = {
        'is_login': 0// 为登录
      };
    }
    return this.jsonp(ret);
  }
  // 用户登录接口
  async loginAction() {
    const cy_appkey = this.config('ext.changyan.appkey');
    const get = this.get();
    get.img_url = decodeURIComponent(get.img_url);
    get.sign = decodeURIComponent(get.sign);
    get.profile_url = decodeURIComponent(get.profile_url);
    get.nickname = decodeURIComponent(get.nickname);

    console.log(get);
    console.log(this.cysign(cy_appkey, get.cy_user_id, get.img_url, get.nickname, get.profile_url, get.user_id));
    const cy_user = await this.model('ext_changyan').where({cy_user_id: get.cy_user_id}).find();
    if (think.isEmpty(cy_user)) {
      await this.model('ext_changyan').add(get);
    }
    const uid = await this.model('ext_changyan').where({cy_user_id: get.cy_user_id}).getField('uid', true);
    console.log(uid);
    // return false;
    let ret;
    if (!this.is_login) {
      if (think.isEmpty(uid)) {
        // 没有绑定网站用户去绑定
        ret = {
          'user_id': '0',
          'reload_page': 0,
          'js_src': [`//${this.ctx.host}/static/assets/js/cy.js`]
        };
        await this.session('changyan', get);
        // return this.redirect('/changyan/binduser');
      } else {
        // 已绑定用户直接登录/uc
        const userinfo = await this.model('member').find(uid);
        await this.model('cmswing/member').autoLogin({id: userinfo.id}, this.ip);// 更新用户登录信息，自动登陆
        const cy_userInfo = {
          'uid': userinfo.id,
          'username': userinfo.username,
          'last_login_time': userinfo.reg_time
        };
        await this.session('webuser', cy_userInfo);
        ret = {
          'user_id': userinfo.id,
          'reload_page': 1
        };
      }
    } else {
      ret = {
        'user_id': this.user.uid,
        'reload_page': 0
      };
    }
    return this.jsonp(ret);
  }
  // 补充资料
  async binduserAction() {
    const data = await this.session('changyan');
    this.cookie('changyanurl', this.referrer());
    this.meta_title = '畅言用户绑定';
    this.assign('data', data);
    return this.extDisplay();
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
    console.log(data);
    const resurl = this.cookie('changyanurl');
    const reg = await this.model('member').add(data);
    if (!think.isEmpty(reg)) {
      // 添加用户副表
      await this.model('ext_changyan').where({cy_user_id: data.cy_user_id}).update({uid: reg});
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
    return this.success({name: '绑定成功', url: resurl});
  }
  /** 登录绑定 */
  async logonbindingAction() {
    const data = this.post();
    // console.log(data);
    const username = this.post('username');
    let password = this.post('password');
    password = encryptPassword(password);
    console.log(data);
    const resurl = this.cookie('changyanurl');
    const res = await this.model('cmswing/member').signin(username, password, this.ip, 5, 0);
    if (res.uid > 0) {
      // 记录用户登录行为
      // await this.model("action", {}, "admin").log("user_login", "member", res.uid, res.uid, this.ip(), this.http.url);
      // console.log(11111111111111);
      // 更新微信头像
      await this.model('ext_changyan').where({cy_user_id: data.cy_user_id}).update({uid: res.uid});
      const filePath = think.resource + '/upload/avatar/' + res.uid;
      think.mkdir(filePath);
      if (!think.isFile(filePath + '/avatar.png')) {
        await this.spiderImage(data.headimgurl, filePath + '/avatar.png');
      }
      await this.session('webuser', res);

      // TODO 用户密钥
      return this.success({name: '绑定成功', url: resurl});
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

  async signinAction() {
    // 用户登录
    if (this.isPost) {
      const username = this.post('username');
      let password = this.post('password');
      password = encryptPassword(password);
      const res = await this.model('cmswing/member').signin(username, password, this.ip, 5, 0);
      if (res.uid > 0) {
        // 记录用户登录行为
        // await this.model("action").log("user_login","member",res.uid,res.uid,this.ip,this.ctx.url);
        // console.log(11111111111111);
        await this.session('webuser', res);
        // TODO 用户密钥
        return this.success({name: '绑定成功'});
      } else { // 登录失败
        let fail;
        switch (res) {
          case -1: fail = '用户不存在或被禁用'; break; // 系统级别禁用
          case -2: fail = '密码错误'; break;
          case -3: fail = '您无权登陆后台！'; break;
          default: fail = '未知错误'; // 0-接口参数错误（调试阶段使用）
        }
        return this.fail(fail);
      }
    } else {
      return this.extDisplay();
    }
  }
  // //签名验证
  // truesign(cy_user_id,img_url,nickname,profile_url,user_id){
  //    let toSign=`cy_user_id=${cy_user_id}&img_url=${img_url}&nickname=${nickname}&profile_url=${profile_url}&user_id=${user_id}`
  //     return crypto.createHmac('sha1', user_id).update(toSign,'utf8').digest('hex');
  // }
  // 生成畅言回调签名
  cysign(key, cy_user_id, imgUrl, nickname, profileUrl, isvUserId) {
    let str;
    str = 'img_url=' + imgUrl + '&nickname=' + nickname + '&profile_url=' + profileUrl + '&user_id=' + isvUserId;
    if (!think.isEmpty(cy_user_id)) {
      str = `cy_user_id=${cy_user_id}` + str;
    }
    return crypto.createHmac('sha1', key).update(str, 'utf8').digest().toString('base64');
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
