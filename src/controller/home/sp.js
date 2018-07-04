// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.cmswing.center {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    // auto render template file index_index.html
    const get = this.get('category').slice(1) || 0;
    let cate = await this.category(get);
    const sp = await this.model('category_sp').find({where: {cid: cate.id}});
    cate = think.extend({}, cate, sp);
    // 访问控制
    let roleid = 8;// 游客
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
    // console.log(breadcrumb);
    this.assign('breadcrumb', breadcrumb);
    /* 模板赋值并渲染模板 */
    this.assign('category', cate);
    let temp;
    // console.log(sp);
    // 判断浏览客户端
    if (this.isMobile) {
      switch (Number(cate.ismt)) {
        case 0:
          // 系统模版
          temp = cate.template_m_index ? cate.template_m_index : 'index';
          temp = `home/mobile/sp_${temp}`;
          break;
        case 1:
          // 用户的自定义模版统一放在view/sp/目录下，可以但文件或者文件夹
          temp = think.ROOT_PATH + '/view/sp/' + cate.sp_temp_m;
          break;
        case 2:
          // 转跳 http://www.xxxx.com
          temp = cate.m_url;
          return this.redirect(temp);
      }
      return this.display(temp);
    } else {
      switch (Number(cate.ispct)) {
        case 0:
          // 系统模版
          temp = cate.template_index ? cate.template_index : 'index';
          temp = `home/sp_${temp}`;
          break;
        case 1:
          // 用户的自定义模版统一放在view/sp/目录下，可以但文件或者文件夹
          temp = think.ROOT_PATH + '/view/sp/' + cate.sp_temp_pc;
          break;
        case 2:
          // 转跳 http://www.xxxx.com
          temp = cate.pc_url;
          return this.redirect(temp);
      }

      return this.display(temp);
    }
  }
};
