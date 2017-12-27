// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
// 本文件不能删除
module.exports = class extends think.cmswing.extAdmin {
  /**
   * index action
   * 插件管理入口
   * @return {Promise} []
   */
  async indexAction() {
    const map = {};
    // 获取友情链接
    const data = await this.model('ext_guestbook').where(map).page(this.get('page')).countSelect();
    // console.log(data);
    const html = this.pagination(data);
    this.assign('pagerData', html); // 分页展示使用
    this.assign('list', data.data);
    return this.extDisplay();
  }

  /**
   * 添加
   * @returns {*}
   */
  async addAction() {
    // d

  }

  /**
     * 修改
     */
  async editAction() {

  }

  /**
     * 删除
     */
  async delAction() {
    const ids = this.para('ids');
    // console.log(ids);
    const res = await this.model('ext_guestbook').where({id: ['IN', ids]}).delete();
    if (res) {
      return this.success({name: '删除成功!'});
    } else {
      return this.fail('删除失败！');
    }
  }
};
