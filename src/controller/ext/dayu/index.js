// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.cmswing.extIndex {
  // 获取短信验证码
  async verifycodesendAction() {
    if (!this.isPost) {
      return this.fail('请求错误！');
    }
    const data = this.post();
    const code = MathRand();
    if (data.check == 1) {
      const res = await this.model('member').where({mobile: data.mobile}).find();
      if (!think.isEmpty(res)) {
        return this.fail('该手机号已存在！');
      }
    }
    // 检查执行周期
    const map = {
      mobile: data.mobile,
      type: data.type
    };
    map.create_time = ['>', new Date().valueOf() - 24 * 3600 * 1000];
    // console.log(map);
    const exec_count = await this.model('ext_smslog').where(map).count();
    // console.log(exec_count);
    if (exec_count >= 3) {
      return this.fail('发送过于频发请24小时后，再尝试。');
    }

    const dayu = this.extService('client');
    const qianming = this.config('ext.dayu.qianming');
    let temp_code;
    if (data.type == 1) {
      temp_code = this.config('ext.dayu.zhuce');
    }
    const info = {
      'extend': data.mobile,
      'sms_type': 'normal',
      'sms_free_sign_name': qianming,
      'sms_param': `{"code":"${code}","product":"${this.config('ext.dayu.product')}"}`,
      'rec_num': data.mobile,
      'sms_template_code': temp_code
    };
    const result = await dayu.send(info);
    // let result ={ err_code: '0',
    //     model: '102201717069^1102848633337',
    //     success: true }
    console.log(result);
    // 发送成功记录到数据库
    if (result.result.err_code == 0) {
      await this.model('ext_smslog').add({
        mobile: data.mobile,
        type: data.type,
        code: code,
        create_time: new Date().valueOf()
      });
    }
    return this.json(result.result);
  }
  // 短信注册
  async smsregAction() {
    const data = this.post();
    // 对比验证码
    const map = {
      mobile: data.mobile,
      type: data.sms_type
    };
    map.create_time = ['>', new Date().valueOf() - 1 * 3600 * 1000];
    // console.log(map);
    const code = await this.model('ext_smslog').where(map).order('id DESC').getField('code', true);
    if (think.isEmpty(code) || code != data.verifycode) {
      return this.fail('验证码不正确!');
    }
    const patrn = /^(\w){6,20}$/;
    if (!patrn.test(data.password)) {
      return this.fail('密码：只能输入6-20个字母、数字、下划线');
    }
    data.email = 0;
    data.username = data.mobile;
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
  }
};
