// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

module.exports = class extends think.cmswing.extAdmin {
  /**
   * index action
   * 插件管理入口
   * @return {Promise} []
   */
  async indexAction() {
    // 分页列表实例

    // let data = await this.model("ext_表名").page(this.get('page')).countSelect();
    // let Pages = think.adapter("pages", "page"); //加载名为 dot 的 Template Adapter
    // let pages = new Pages(this.http); //实例化 Adapter
    // let page = pages.pages(data);
    // this.assign('pagerData', page); //分页展示使用
    // this.assign('list', data.data);

    // 获取当前插件的分类,插件如有分类的需求，直接调用。

    // await this.gettype()

    // 入口模版渲染
    return this.display();
  }
};
