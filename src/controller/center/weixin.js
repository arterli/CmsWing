// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
// const pingpp = require('pingpp');
const API = require('co-wechat-api');
const fs = require('fs');
const superagent = require('superagent');
module.exports = class extends think.cmswing.center {
  constructor(ctx) {
    super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
    // 其他额外的操作
    // this.api = new API(this.config('setup.wx_AppID'), this.config('setup.wx_AppSecret'));
    this.api = new API(this.config('setup.wx_AppID'), this.config('setup.wx_AppSecret'), async function() {
      // 传入一个获取全局token的方法
      try {
        const fn = think.promisify(fs.readFile, fs);
        const txt = await fn(think.ROOT_PATH + '/private/access_token.txt');
        return JSON.parse(txt);
      } catch (e) {
        return null;
      }
    }, async function(token) {
      // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
      // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
      const fns = think.promisify(fs.writeFile, fs);
      await fns(think.ROOT_PATH + '/private/access_token.txt', JSON.stringify(token));
    });
  }

  /**
     * index action
     * @return {Promise} []
     */
  indexAction() {
    // auto render template file index_index.html
    return this.display();
  }
  async oauthAction() {
    // 判断是否是微信浏览器
    // 微信公众账号内自动登陆
    const openid = await this.session('wx_openid');
    // let openid = null;
    if (this.isweixin && think.isEmpty(openid)) {
      this.cookie('cmswing_wx_url', this.ctx.url);
      const pingpp = require('pingpp')(this.config('setup.wx_AppSecret'));
      const oauthUrl = pingpp.wxPubOauth.createOauthUrlForCode(this.config('setup.wx_AppID'), `http://${this.ctx.host}/center/weixin/getopenid?showwxpaytitle=1`);
      console.log(oauthUrl);
      return this.redirect(oauthUrl);
    }
  }
  // 用微信客户端获取getopenid
  async getopenidAction() {
    const pingpp = require('pingpp')(this.config('setup.wx_AppSecret'));
    // 获取用户openid
    const code = this.get('code');
    console.log(code);
    // 获取openid
    const getopenid = () => {
      const deferred = think.defer();
      pingpp.wxPubOauth.getOpenid(this.config('setup.wx_AppID'), this.config('setup.wx_AppSecret'), code, function(err, openid) {
        // console.log(openid);
        deferred.resolve(openid);
        // ...
        // pass openid to extra['open_id'] and create a charge
        // ...
      });
      return deferred.promise;
    };
    const openid = await getopenid();
    // 9think.log(think.isEmpty(openid));
    const userinfo = await this.api.getUser(openid);
    // console.log(userinfo);
    // 如果没有关注先跳到关注页面
    if (userinfo.subscribe == 0) {
      console.log(1111111111111);
      return this.redirect('/center/weixin/follow');
    };
    userinfo.subscribe_time = userinfo.subscribe_time * 1000;

    const wx_user = await this.model('wx_user').where({openid: openid}).find();

    // 存储Openid
    await this.session('wx_openid', openid);
    if (think.isEmpty(wx_user)) {
      await this.model('wx_user').add(userinfo);
      this.redirect('/center/weixin/signin');
    } else {
      await this.model('wx_user').where({openid: openid}).update(userinfo);

      // 检查微信号是否跟网站会员绑定
      if (think.isEmpty(wx_user.uid)) {
        // 没绑定跳转绑定页面
        this.redirect('/center/weixin/signin');
      } else {
        // 更新微信头像
        const filePath = think.resource + '/upload/avatar/' + wx_user.uid;
        think.mkdir(filePath);
        await this.spiderImage(userinfo.headimgurl, filePath + '/avatar.png');
        // 绑定直接登陆
        const last_login_time = await this.model('member').where({id: wx_user.uid}).getField('last_login_time', true);

        const wx_userInfo = {
          'uid': wx_user.uid,
          'username': userinfo.nickname,
          'last_login_time': last_login_time
        };
        await this.session('webuser', wx_userInfo);
        return this.redirect(this.cookie('cmswing_wx_url'));
      }
    }
  }

  /**
     * 没有关注提示关注
     */
  async followAction() {
    // console.log(this.setup)
    // 创建关注二维码
    // TODO
    // let titck =await createLimitQRCode(this.api,1);
    // console.log(titck);
    const qrcod = this.api.showQRCodeURL('gQHz7zoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL3JqX0p2Zm5sMnBtalQwX215eE1NAAIEjMBoVwMEAAAAAA==');
    this.assign('qrurl', qrcod);
    // think.log(qrcod);
    // this.end(qrcod);
    this.meta_title = `扫码关注`;
    // 判断浏览客户端
    if (this.isMobile) {
      return this.display(this.mtpl());
    } else {
      return this.display(this.mtpl());
    }
  }

  /**
     * 微信账号与网站会员绑定
     */
  async signinAction() {
    // await this.session('wx_openid',"o33lBt0Pz3rEXUARWtUUO5GxuUG0");
    let open_id;
    if (think.isEmpty(this.cookie('wx_openid'))) {
      open_id = await this.session('wx_openid');
      this.cookie('wx_openid', open_id);
    } else {
      open_id = this.cookie('wx_openid');
    }

    // 清除openid，如果中途失败，可重新激活注册流程
    await this.session('wx_openid', null);
    const wx_info = await this.model('wx_user').where({openid: open_id}).find();
    this.assign('wx_info', wx_info);
    this.meta_title = '账号绑定';
    this.assign('openid', open_id);
    this.assign('headimgurl', wx_info.headimgurl);
    // todo
    if (this.isMobile) {
      return this.display(this.mtpl());
    } else {
      return this.display();
    }
    // this.end("网站会员绑定页面")
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
      // 用户副表
      await this.model('wx_user').where({openid: data.openid}).update({uid: reg});
      // 更新微信头像
      const filePath = think.resource + '/upload/avatar/' + reg;
      think.mkdir(filePath);
      await this.spiderImage(data.headimgurl, filePath + '/avatar.png');
    }
    console.log(data);
    await this.model('cmswing/member').autoLogin({id: reg}, this.ip);// 更新用户登录信息，自动登陆
    const wx_userInfo = {
      'uid': reg,
      'username': data.username,
      'last_login_time': data.reg_time
    };
    await this.session('webuser', wx_userInfo);
    // 成功后储存opid,防止无限登陆
    await this.session('wx_openid', data.openid);
    this.cookie('wx_openid', null);
    return this.success({name: '绑定成功', url: '/center/index'});
  }
  /** 登录绑定 */
  async logonbindingAction() {
    const data = this.post();
    const username = this.post('username');
    let password = this.post('password');
    password = encryptPassword(password);
    console.log(data);

    const res = await this.model('cmswing/member').signin(username, password, this.ip, 5, 0);
    if (res.uid > 0) {
      // 记录用户登录行为
      // await this.model("action",).log("user_login", "member", res.uid, res.uid, this.ip(), this.http.url);
      // console.log(11111111111111);
      const wx_info = await this.model('wx_user').where({openid: data.openid}).find();
      await this.model('wx_user').where({openid: data.openid}).update({uid: res.uid});
      // 更新微信头像
      const filePath = think.resource + '/upload/avatar/' + res.uid;
      think.mkdir(filePath);
      await this.spiderImage(data.headimgurl, filePath + '/avatar.png');
      res.username = wx_info.nickname;
      await this.session('webuser', res);
      // 成功后储存opid,防止无限登陆
      await this.session('wx_openid', data.openid);
      this.cookie('wx_openid', null);
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
      this.fail(fail);
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
