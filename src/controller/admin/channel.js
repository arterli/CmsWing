// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

module.exports = class extends think.cmswing.admin {
  /**
     * index action
     * @return {Promise} []
     */
  constructor(ctx) {
    super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
    // 其他额外的操作
    this.db = this.model('cmswing/channel');
    this.tactive = 'setup';
  }

  /**
     * 导航管理首页
     * @returns {*}
     */
  async indexAction() {
    // auto render template file index_index.html
    const tree = await this.db.get_channel(0);
    // console.log(tree)
    this.assign('list', tree);
    this.meta_title = '导航管理';
    return this.display();
  }

  /**
     * 获取全部导航ajax
     * @returns {*}
     */
  async getchannelAction() {
    const tree = await this.db.get_channel_cache();
    return this.json(tree);
  }

  addAction() {
    // 添加导航
    this.meta_title = '添加导航';
    this.active = 'admin/channel/index';
    return this.display();
  }
  async editAction() {
    // 编辑导航
    const id = this.get('cid');
    const info = await this.model('channel').find(id);
    if (think.isEmpty(info)) {
      const error = this.controller('cmswing/error');
      return error.noAction('参数错误！');
    }
    this.assign('info', info);
    this.meta_title = '编辑导航';
    this.active = 'admin/channel/index';
    return this.display('admin/channel_add');
  }
  // 更新或者新增导航
  async updatesAction() {
    const data = this.post();
    const res = await this.model('cmswing/channel').updates(data);
    switch (res.err) {
      case 1:
        await this.model('cmswing/action').log('update_channel', 'channel', res.id, this.user.uid, this.ip, this.ctx.url);// 记录行为
        return this.success({name: '新增成功！', url: '/admin/channel/index'});
      case 2:
        return this.fail('新增失败！');
      case 3:
        await this.model('cmswing/action').log('update_channel', 'channel', res.id, this.user.uid, this.ip, this.ctx.url);// 记录行为
        return this.success({name: '更新成功！', url: '/admin/channel/index'});
      default:
        return this.fail('更新失败！');
    }
  }

  // 删除导航
  async delAction() {
    let id = this.get('id');
    id = id.split(',');
    if (think.isEmpty(id)) {
      this.fail('请选择要操作的数据！');
    }
    const channel = this.model('channel');
    let loca = 0;
    do {
      const list = await channel.where({pid: id[loca]}).field('id').select();
      for (const _id of list) { id.push(_id.id) }
      loca++;
    } while (loca < id.length);
    // 开始删除
    const map = {id: ['IN', id]};
    const res = await channel.where(map).delete();
    if (res) {
      await this.model('cmswing/action').log('update_channel', 'channel', id, this.user.uid, this.ip, this.ctx.url);// 记录行为
      await update_cache('channel');// 更新频道缓存信息
      return this.success({name: '删除成功！'});
    } else {
      return this.fail('删除失败！');
    }
  }
};
