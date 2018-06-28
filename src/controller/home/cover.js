// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.cmswing.home {
  /**
     * index action
     * @return {Promise} []
     */
  // 频道页
  async indexAction() {
    const get = this.get('category') || 0;
    let id = 0;
    const query = get.split('-');
    if (get !== 0) {
      id = query[0].slice(1);
    }

    let cate = await this.category(id);
    cate = think.extend({}, cate);

    // console.log(cate);
    let roleid = 8;// 游客
    // 访问控制
    if (this.is_login) {
      roleid = await this.model('member').where({id: this.is_login}).getField('groupid', true);
    }
    const priv = await this.model('cmswing/category_priv').priv(cate.id, roleid, 'visit');
    if (!priv) {
      const error = this.controller('cmswing/error');
      return error.noAction('您所在的用户组,禁止访问本栏目！');
    }
    this.meta_title = cate.meta_title ? cate.meta_title : cate.title; // 标题
    this.keywords = cate.keywords ? cate.keywords : ''; // seo关键词
    this.description = cate.description ? cate.description : ''; // seo描述
    // 频道页只显示模板，默认不读取任何内容
    // 内容可以通过模板标签自行定制
    // 获取面包屑信息
    const breadcrumb = await this.model('cmswing/category').get_parent_category(cate.id, true);
    this.assign('breadcrumb', breadcrumb);
    /* 模板赋值并渲染模板 */
    this.assign('category', cate);
    let temp = cate.template_index ? `${cate.template_index}` : `index`;

    // 判断浏览客户端
    if (this.isMobile) {
      temp = cate.template_m_index ? `${cate.template_m_index}` : `index`;
      return this.display(`home/mobile/cover_${temp}`);
    } else {
      return this.display(`home/cover_${temp}`);
    }
  }
};
