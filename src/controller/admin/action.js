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
    this.tactive = 'user';
  }

  /**
   * index action
   * @return {Promise} []
   */

  async indexAction() {
    // auto render template file index_index.html
    const action = await this.model('action').where({'status': ['>', -1]}).order('id DESC').page(this.get('page')).countSelect();
    const html = this.pagination(action);
    this.assign('pagerData', html);
    this.assign('list', action.data);
    this.meta_title = '用户行为';
    return this.display();
  }

  /**
   * 日志列表
   * @returns {*}
   */
  async logAction() {
    // 获取列表数据
    const map = {};
    map.status = ['>', -1];
    const list = await this.model('action_log').where({'status': ['>', -1]}).order('id DESC').page(this.get('page')).countSelect();
    // console.log(list);
    const html = this.pagination(list);
    this.assign('pagerData', html);
    for (const itme of list.data) {
      itme.action_id = await this.model('cmswing/action').get_action(itme.action_id, 'title');
      itme.user_id = await this.model('cmswing/member').get_nickname(itme.user_id);
    }
    this.assign('list', list.data);
    this.meta_title = '行为日志';
    return this.display();
  }

  /**
   * 新增行为
   * @returns {*}
   */
  addAction() {
    this.meta_title = '新增行为';
    this.active = 'admin/action/index';
    this.assign('data', null);
    return this.display();
  }

  /**
   * 编辑行为
   * @returns {*}
   */
  async editAction() {
    const id = this.get('id');
    think.isEmpty(id) && this.fail('参数不能为空！');
    const data = await this.model('action').find(id);
    this.active = 'admin/action/index';
    this.meta_title = '编辑行为';
    this.assign('data', data);
    return this.display('admin/action_add');
  }

  /**
   * 更新行为
   */
  async updateAction() {
    const data = this.post();
    if (think.isEmpty(data.id)) {
      data.status = 1;
      data.update_time = Date.now();
      const res = await this.model('action').add(data);
      if (res) {
        this.success({name: '新增成功！', url: '/admin/action/index'});
      } else {
        this.fail('添加失败！');
      }
    } else {
      data.update_time = Date.now();
      const res = await this.model('action').update(data);
      if (res) {
        this.success({name: '更新成功！', url: '/admin/action/index'});
      } else {
        this.fail('更新失败！');
      }
    }
  }

  /**
   * 删除日志
   */
  async removeAction() {
    const ids = this.param('ids');
    think.isEmpty(ids) && this.fail('参数错误');
    const map = {};
    if (think.isArray(ids)) {
      map.id = ['IN', ids];
    } else if (think.isNumberString(ids)) {
      map.id = ids;
    }
    const res = await this.model('action_log').where(map).delete();
    if (res) {
      this.success({name: '删除成功！', url: '/admin/action/log'});
    } else {
      this.fail('删除失败！');
    }
  }

  // 清楚日志
  async clearAction() {
    const res = await this.model('action_log').where('1=1').delete();
    if (res) {
      this.success({name: '日志清空成功！', url: '/admin/action/log'});
    } else {
      this.fail('日志清空失败！');
    }
  }
};
