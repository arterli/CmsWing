// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.cmswing.modAdmin {
  constructor(ctx) {
    super(ctx);
    this.tactive = 'article';
  }

  /**
     * 模型后台管理入口
     * index action
     * @return {Promise} []
     */

  async indexAction() {
    const cate = this.m_cate;
    this.assign('category', cate);

    // 获取当前栏目的模型
    const model = this.mod;
    this.assign('model', model);
    this.meta_title = this.m_cate.title;

    // 面包屑
    await this.breadcrumb();
    // 分组
    const gid = this.get('group_id') || 0;
    this.assign('group_id', gid);
    // 获取分组
    await this.groups();
    const name = await this.model('cmswing/category').get_category(cate.id, 'name') || cate.id;
    this.assign({'navxs': true, 'name': name});

    const map = {};
    // 获取当前分类的所有子栏目
    if (cate.id) {
      const subcate = await this.model('cmswing/category').get_sub_category(cate.id);
      subcate.push(cate.id);
      map.category_id = ['IN', subcate];
    }
    // 加入分组条件
    if (gid) {
      map.group_id = gid;
    }

    // 搜索
    if (this.get('title')) {
      map.title = ['like', '%' + this.get('title') + '%'];
    }
    // 分页列表实例
    // const list = await this.model('模型表名').where(map).order('update_time DESC').page(this.get('page'), 20).countSelect();
    // const html = this.pagination(list);
    // this.assign('list', list.data);
    // this.assign('pagerData', html); // 分页展示使用

    // 入口模版渲染
    return this.modDisplay();
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
