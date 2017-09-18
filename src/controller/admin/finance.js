// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

module.exports = class extends think.cmswing.admin {
  constructor(ctx) {
    super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
    // 其他额外的操作
    this.tactive = 'finance';
  }
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    // auto render template file index_index.html
    return this.display();
  }

  /**
   * 财务日志
   */
  async logAction() {
    const list = await this.model('balance_log').order('id DESC').page(this.get('page') || 1, 20).countSelect();
    // console.log(list);
    const html = this.pagination(list);
    this.assign('pagerData', html);
    for (const itme of list.data) {
      itme.user_id = await this.model('cmswing/member').get_nickname(itme.user_id);
      itme.admin_id = await get_nickname(itme.admin_id);
    }
    this.assign('list', list.data);
    this.meta_title = '财务日志';
    return this.display();
  }
};
