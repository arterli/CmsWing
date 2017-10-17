// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const assert = require('assert');
const Index = require('./home');
const path = require('path');
module.exports = class extends Index {
  /**
     * 模型公共参数
     * @private
     */
  async __before() {
    await super.__before();// 继承父类before
    const getCategory = this.get('category') ? this.get('category').split('-')[0] : false;
    if (this.get('category') || this.get('cid')) {
      // 获取当前模型栏目id
      this.m_cate = await this.category(getCategory || this.get('cid'));

      // 当前模型信息
      this.mod = await this.model('cmswing/model').get_model(this.m_cate.model);
      if (think.isEmpty(this.mod)) {
        const error = this.controller('cmswing/error');
        return error.noAction('模型不存在或被禁用!');
      }
      // seo
      this.meta_title = this.m_cate.meta_title ? this.m_cate.meta_title : this.m_cate.title; // 标题
      this.keywords = this.m_cate.keywords ? this.m_cate.keywords : ''; // seo关键词
      this.description = this.m_cate.description ? this.m_cate.description : ''; // seo描述
    }
  }
  /**
   * index action
   * @return {Promise} []
   * 封面入口
   */
  async indexAction() {
    try {
      await this.action('mod/' + this.mod.name + '/index', 'index');
    } catch (err) {
      assert(!think.isError(err), err);
    }
  }

  /**
   * 列表入口
   * @returns {*}
   */
  async listAction() {
    try {
      await this.action('mod/' + this.mod.name + '/index', 'list');
    } catch (err) {
      assert(!think.isError(err), err);
    }
    //
  }

  // 创建独立模型时错误提示
  moderrorAction() {
    return this.display('cmswing/moderror');
  }
  // 独立模型display方法封装
  modDisplay(p = this.ctx.action, m = '') {
    let c = this.ctx.controller.split('/');
    if (this.ctx.controller === 'cmswing/route') {
      c = `mod/${this.mod.name}/index`.split('/');
      if (Number(this.m_cate.allow_publish) === 1 && p === 'index') {
        p = 'list';
      } else if (think.isEmpty(p)) {
        p = 'index';
      }
    }
    if (p === 'm' || !think.isEmpty(m)) {
      if (p === 'm') {
        p = this.ctx.action;
        if (this.ctx.controller === 'cmswing/route') {
          p = Number(this.m_cate.allow_publish) === 1 ? 'list' : 'index';
        }
      }
      const pp = path.join(think.ROOT_PATH, 'src', 'controller', 'mod', c[1], 'view', 'mobile', c[2]);
      return this.display(`${pp}_${p}`);
    } else {
      const pp = path.join(think.ROOT_PATH, 'src', 'controller', 'mod', c[1], 'view', 'pc', c[2]);
      return this.display(`${pp}_${p}`);
    }
  }
  // 获取钩子模板方法
  async hookRender(p = this.ctx.action, mod = '', m = '') {
    // console.log(this.ctx.controller);
    if (p === 'm' || !think.isEmpty(m)) {
      if (p === 'm') p = this.ctx.action;
      const pp = path.join(think.ROOT_PATH, 'src', 'controller', 'mod', mod, 'view', 'mobile', 'hooks');
      return await this.render(`${pp}_${p}`);
    } else {
      const pp = path.join(think.ROOT_PATH, 'src', 'controller', 'mod', mod, 'view', 'pc', 'hooks');
      return await this.render(`${pp}_${p}`);
    }
  }

  // 独立模型get方法封装,只针对index入口action,其他的请用 this.get()方法。
  modget(n) {
    const get = this.get('category') || 0;
    const query = get.split('-');
    return query[n];
  }

  /**
     * 前台用户组栏目权限验证方法
     * await this.c_verify("visit") 访问验证
     * await this.c_verify("add") 投稿验证
     * await this.c_verify("edit") 前台编辑控制
     * @returns {PreventPromise}
     */
  async c_verify(ac, cid = this.m_cate.id, info = '您所在的用户组,禁止访问本栏目！') {
    let roleid = 8;// 游客
    // 访问控制
    if (this.is_login) {
      roleid = await this.model('member').where({id: this.is_login}).getField('groupid', true);
    }
    const priv = await this.model('cmswing/category_priv').priv(cid, roleid, ac);
    // if(!priv){
    //     // this.http.error = new Error(info);
    //     // return think.statusAction(702, this.http);
    //     //return this.body="ddd"
    //     const error = this.controller('cmswing/error');
    //     return error.noAction('您所在的用户组,禁止访问本栏目！');
    // }
    return priv;
  }

  /**
     * 当前栏目列表每页行数
     * @returns {*}
     */
  page_num() {
    let num;
    if (this.m_cate.list_row > 0) {
      num = this.m_cate.list_row;
    } else if (this.m_cate.model.split(',').length == 1) {
      const pagenum = this.mod.list_row;
      if (pagenum != 0) {
        num = pagenum;
      }
    } else {
      num = 10;
    }
    if (this.isMobile) {
      num = 10;
    }
    return num;
  }

  /**
   * 面包屑
   * @param cid 栏目id
   * @returns {Promise.<void>}
   */
  async breadcrumb(cid = this.m_cate.id) {
    const breadcrumb = await this.model('cmswing/category').get_parent_category(cid, true);
    this.assign('breadcrumb', breadcrumb);
  }
};
