// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

const Base = require('../cmswing/admin');
module.exports = class extends Base {
  constructor(ctx) {
    super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
    // 其他额外的操作
    this.db = this.model('cmswing/ext');
    this.tactive = 'ext';
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    // auto render template file index_index.html
    const data = await this.db.page(this.get('page')).order('sort DESC, updatetime DESC').countSelect();
    const html = this.pagination(data);
    this.assign('pagerData', html); // 分页展示使用
    this.assign('list', data.data);
    this.meta_title = '插件管理';
    return this.display();
  }

  /**
     * 添加插件
     * @returns {*}
     */
  async addAction() {
    if (this.isPost) {
      const data = this.post();
      data.setting = '{}';
      if (think.isEmpty(data.installtime)) {
        data.installtime = new Date().getTime();
      } else {
        data.installtime = new Date(data.installtime).valueOf();
      }
      if (think.isEmpty(data.updatetime)) {
        data.updatetime = new Date().getTime();
      } else {
        data.updatetime = new Date(data.updatetime).valueOf();
      }
      const res = await this.model('ext').add(data);
      if (res === 0) {
        return this.success({name: '添加插件成功！', url: '/admin/ext/index'});
      } else {
        return this.fail('添加失败！');
      }
    } else {
      this.active = 'admin/ext/index';
      this.meta_title = '新增插件';
      return this.display();
    }
  }

  /**
     * 更新插件
     * @returns {*}
     */
  async editAction() {
    if (this.isPost) {
      const data = this.post();
      data.setting = '{}';
      if (think.isEmpty(data.updatetime)) {
        data.updatetime = new Date().getTime();
      } else {
        data.updatetime = new Date(data.updatetime).getTime();
      }
      const res = await this.model('ext').where({ext: data.ext}).update(data);
      if (res) {
        return this.success({name: '更新插件成功！'});
      } else {
        return this.fail('更新失败！');
      }
    } else {
      const ids = this.get('ids');
      const info = await this.model('ext').where({ext: ids}).find();
      this.assign('info', info);
      this.meta_title = '更新插件';
      return this.display();
    }
  }
  /**
     * 验证同一张表是否存在相同的子段值
     * @returns {*}
     */
  async checkextAction() {
    const get = this.get();
    // let key = think._.keys(get)[0];
    // let val = get[key];
    const res = await this.model('ext').where(get).count('ext');
    if (res) {
      return this.json(0);
    } else {
      return this.json(1);
    }
  }
  /**
   * 排序
   */
  async sortAction() {
    await super.sortAction('cmswing/ext', 'ext');
  }
};
