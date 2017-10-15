// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
/**
 * 插件前台控制器
 * 如果插件有前台展示业务，写在这个控制器里面
 * 插件如需建立表务必遵循下面格式：
 * 单表：表前缀_ext_插件目录名
 * 多表：表前缀_ext_插件目录名，表前缀_ext_插件目录名_分表1，表前缀_ext_插件目录名_分表2...
 */

module.exports = class extends think.cmswing.extIndex {
  /**
   * index action
   *
   * @return {Promise} []
   */
  async indexAction() {
    // auto render template file index_index.html
    const table = 'ext_' + this.ext.ext;
    // console.log(table);
    // 获取当前分类
    this.assign('type', await this.gettype());
    // 获取友情链接
    const data = await this.model(table).where({passed: 1}).order('sort ASC').select();
    // console.log(data);
    this.assign('list', data);
    return this.extDisplay();
  }

  async applyAction() {
    if (this.setting.ispost == 0) {
      const error = this.controller('cmswing/error');
      return error.noAction('已关闭申请，请在后台插件设置开启！');
    }
    if (this.isPost) {
      const data = this.post();
      data.passed = 0;
      if (data.linktype == 1) {
        if (think.isEmpty(data.logo)) {
          return this.fail('logo链接类型，请填写logo地址！');
        }
      }
      const res = await this.model('ext_link').add(data);
      if (res) {
        return this.success({name: '申请成功!', url: '/ext/link/index'});
      } else {
        return this.fail('添加失败！');
      }
    } else {
      this.meta_title = '申请友情链接';
      // 获取当前分类
      this.assign('type', await this.gettype());
      return this.extDisplay();
    }
  }
};
