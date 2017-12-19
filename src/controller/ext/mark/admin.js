// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
// 本文件不能删除
module.exports = class extends think.cmswing.extAdmin {
  constructor(ctx) {
    super(ctx);
  }
  /**
   * index action
   * 插件管理入口
   * @return {Promise} []
   */
  async indexAction() {
    // 入口模版渲染
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

  }
};
