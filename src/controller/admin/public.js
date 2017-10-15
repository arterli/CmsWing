// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.Controller {
  /**
     * public action
     * @return {Promise} []
     */
  async signinAction() {
    // 用户登录
    const is_login = await this.islogin();
    if (this.isAjax()) {
      // console.log(this.isAjax());
      // console.log(this.post());
      // 验证码 钩子
      const signinBefore = await this.hook('signinBefore');
      if (signinBefore === 'no') {
        const error = this.controller('cmswing/error');
        return error.noAction('验证码不正确');
      }

      const username = this.post('username');
      let password = this.post('password');
      password = encryptPassword(password);
      const res = await this.model('cmswing/member').signin(username, password, this.ip, 1, 1);
      if (res.uid > 0) {
        // 记录用户登录行为
        // await this.model("cmswing/action").log("user_login","member",res.uid,res.uid,this.ip,this.ctx.url);
        // console.log(11111111111111);
        await this.session('userInfo', res);
        // TODO 用户密钥
        // this.redirect('/admin/index');
        return this.success({name: '登陆成功!', url: '/admin/index'});
      } else { // 登录失败
        let fail;
        switch (res) {
          case -1:
            fail = '用户不存在或被禁用';
            break; // 系统级别禁用
          case -2:
            fail = '密码错误';
            break;
          case -3:
            fail = '您无权登陆后台！';
            break;
          default:
            fail = '未知错误'; // 0-接口参数错误（调试阶段使用）
        }
        const error = this.controller('cmswing/error');
        return error.noAction(fail);
      }
    } else {
      if (is_login) {
        return this.redirect('/admin/index');
      } else {
        await this.hook('signinView');
        return this.display();
      }
    }
  }

  /**
     * 退出登陆
     * @returns {Promise.<void>}
     */
  async logoutAction() {
    // 退出登录
    const is_login = await this.islogin();
    if (is_login) {
      await this.session('userInfo', null);
      this.redirect('/admin/public/signin');
    } else {
      this.redirect('/admin/public/signin');
    }
  }

  async islogin() {
    const user = await this.session('userInfo');
    const res = !think.isEmpty(user);
    return res;
  }

  verAction() {
    this.end('df11df');
  }

  // 验证菜单标示是否重复
  async categorynameAction() {
    const name = this.get('name');
    const pid = this.get('pid');
    const res = await this.model('category').where({name: name, pid: pid}).find();
    if (!think.isEmpty(res)) {
      return this.json({'message': 'your custom message'});
    } else {
      return this.json(1);
    }
  }

  // 选择分离
  async selectcateAction() {
    this.meta_title = '选择分类';
    return this.display();
  }

  // 获取分类
  async getmenuAction() {
    const cate = await this.model('cmswing/category').get_all_category();
    // console.log(cate);
    // 生成菜单

    for (const val of cate) {
      const id = think.isEmpty(val.title) ? val.id : val.title;
      val.url = `/${id}`;
      delete val.icon;
    }
    // think.log(cate);
    return this.json(arr_to_tree(cate, 0));
  }

  /**
     * 关键词自动完成
     */
  async getkeywordAction() {
    const term = this.get('term');
    const data = await this.model('keyword').where({keyname: ['LIKE', `%${term}%`]}).field('id,keyname as label,keyname as value').select();
    return this.json(data);
  }

  /**
     * 关联字段
     * @returns {Promise<PreventPromise>}
     */
  async getrelationAction() {
    const model = this.get('model');
    const id = this.get('id');
    const val = this.get('val');
    const key = this.get('key');
    const map = {};
    map[val] = ['like', '%' + key + '%'];
    const data = await this.model(model).where(map).field(`${id} as id, ${val} as data`).select();
    console.log(data);
    this.header('Content-Type', 'text/html');
    return this.body=JSON.stringify(data);
  }

  /**
     * 验证表内字段是否重复
     * /public/remote/table/要验证的表名
     * @returns {Promise<PreventPromise>}
     */
  async remoteAction() {
    const data = this.get();
    const table = this.get('table');
    for (const v in data) {
      data[v] = think._.trim(data[v]);
    }
    delete data.table;
    const res = await this.model(table).where(data).find();
    if (think.isEmpty(res)) {
      return this.json(1);
    } else {
      return this.json(0);
    }
  }
};
