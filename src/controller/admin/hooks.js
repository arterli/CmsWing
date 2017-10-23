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
    this.tactive = 'ext';
  }
  // 钩子列表
  async indexAction() {
    this.meta_title = '钩子列表';
    const list = await this.model('hooks').page(this.get('page'), 20).order('update_time DESC').countSelect();
    const html = this.pagination(list);
    this.assign('pagerData', html); // 分页展示使用
    this.assign('list', list.data);
    return this.display();
  }
  // 添加钩子
  async addAction() {
    this.meta_title = '添加钩子';
    this.active = 'admin/hooks/index';
    if (this.isPost) {
      const data = this.post();
      data.update_time = new Date().getTime();
      const res = await this.model('hooks').add(data);
      await update_cache('hooks');
      return res ? this.success({name: '添加成功!', url: '/admin/hooks/index'}) : this.fail('添加失败!');
    } else {
      return this.display();
    }
  }
  // 编辑钩子
  async editAction() {
    this.meta_title = '编辑钩子';
    this.active = 'admin/hooks/index';
    if (this.isPost) {
      const data = this.post();
      data.update_time = new Date().getTime();
      console.log(data);
      const res = await this.model('hooks').update(data);
      await update_cache('hooks');
      return res ? this.success({name: '更新成功!', url: '/admin/hooks/index'}) : this.fail('更新失败!');
    } else {
      const id = this.get('id');
      const info = await this.model('hooks').find(id);
      this.assign('info', info);
      return this.display();
    }
  }
  // 删除钩子
  async delAction() {
    const id = this.get('id');
    await this.model('hooks').where({id: id}).delete();
    await update_cache('hooks');
    return this.success({name: '删除成功！'});
  }
  /**
   * 验证同一张表是否存在相同的子段值
   * @returns {*}
   */
  async checkextAction() {
    const get = this.get();
    // let key = think._.keys(get)[0];
    // let val = get[key];
    const res = await this.model('hooks').where(get).count();
    if (res) {
      return this.json(0);
    } else {
      return this.json(1);
    }
  }
};
