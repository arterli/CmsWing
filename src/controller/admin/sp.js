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
    this.tactive = 'article';
    this.db = this.model('cmswing/category_sp');
  }
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    const cate_id = this.get('cate_id') || null;
    if (think.isEmpty(cate_id)) {
      const error = this.controller('cmswing/error');
      return error.noAction('该栏目不存在！');
    }
    // 权限验证
    await this.admin_priv('init', cate_id, '您没有权限查看本栏目！');
    const name = await this.model('cmswing/category').get_category(cate_id, 'name') || cate_id;
    // 获取面包屑信息
    const nav = await this.model('cmswing/category').get_parent_category(cate_id);
    this.assign('breadcrumb', nav);
    // 获取内容
    // console.log(cate_id);
    const info = await this.db.find({where: {cid: cate_id}});
    // console.log(info);
    // auto render template file index_index.html
    // 编辑器钩子
    await this.hook('adminEdit', 'sp_html_pc', info.sp_html_pc, {$hook_key: 'sp_html_pc', $hook_type: '2_1'});
    this.meta_title = 'PC单页内容';
    this.assign({
      'navxs': true,
      'name': name,
      'info': info
    });
    return this.display();
  }

  /**
   * index action
   * @return {Promise} []
   */
  async mobileAction() {
    const cate_id = this.get('cate_id') || null;
    if (think.isEmpty(cate_id)) {
      const error = this.controller('common/error');
      return error.noAction('该栏目不存在！');
    }
    // 权限验证
    await this.admin_priv('init', cate_id, '您没有权限查看本栏目！');
    const name = await this.model('cmswing/category').get_category(cate_id, 'name') || cate_id;
    // 获取面包屑信息
    const nav = await this.model('cmswing/category').get_parent_category(cate_id);
    this.assign('breadcrumb', nav);
    // auto render template file index_index.html
    const info = await this.db.find({where: {cid: cate_id}});
    await this.hook('adminEdit', 'sp_html_m', info.sp_html_m, {$hook_key: 'sp_html_m', $hook_type: '2_1'});
    this.meta_title = '手机单页内容';
    this.assign({
      'navxs': true,
      'name': name,
      'info': info
    });
    return this.display();
  }

  // 编辑
  async updateAction() {
    const data = this.post();
    // console.log(data);
    // 权限验证
    await this.admin_priv('edit', data.cid);
    const isup = await this.db.thenAdd(data, {cid: data.cid});
    if (isup.type == 'exist') {
      await this.db.update(data, {where: {cid: data.cid}});
    }
    return this.success({name: '编辑成功！'});
  }
};
