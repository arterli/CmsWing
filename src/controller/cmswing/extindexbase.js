// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Index = require('./home');
const path = require('path');
module.exports = class extends Index {
  /**
   * index action
   * @return {Promise} []
   */
  async __before() {
    await super.__before();
    this.ext = await this.model('ext').where({ext: this.ctx.controller.split('/')[1]}).find();
    // console.log(this.ext);
    this.meta_title = this.ext.name;
    // 获取插件配置
    if (!think.isEmpty(this.ext.setting)) {
      this.setting = JSON.parse(this.ext.setting);
    } else {
      this.setting = {};
    }
  }
  /**
   * 获取当前插件分类
   * @returns {*}
   */
  async gettype() {
    const data = await this.model('ext_type').where({ext: this.ext.ext}).order('sort ASC').select();
    return data;
  }
  // 获取钩子模板方法
  async hookRender(p = this.ctx.action, ext = '', m = '') {
    // console.log(this.ctx.controller);
    if (p === 'm' || !think.isEmpty(m)) {
      if (p === 'm') p = this.ctx.action;
      const pp = path.join(think.ROOT_PATH, 'src', 'controller', 'ext', ext, 'view', 'mobile', 'hooks');
      return await this.render(`${pp}_${p}`);
    } else {
      const pp = path.join(think.ROOT_PATH, 'src', 'controller', 'ext', ext, 'view', 'pc', 'hooks');
      return await this.render(`${pp}_${p}`);
    }
  }
};
