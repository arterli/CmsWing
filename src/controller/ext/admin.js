// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Admin = require('../common/admin');
module.exports = class extends Admin {
  /**
   * some base method in here
   */
  async __before() {
    await super.__before();
    this.tactive = 'ext';
    this.active = 'admin/ext/index';
    this.ext = await this.model('ext').where({ext: this.ctx.controller.split('/')[1]}).find();
    // console.log(this.ext);
    this.meta_title = this.ext.name + '管理';
    if (!think.isEmpty(this.ext.setting)) {
      this.setting = JSON.parse(this.ext.setting);
    } else {
      this.setting = {};
    }
  }

  /**
   * 获取当前插件分类
   * @returns {*}
   */
  async gettype() {
    const data = await this.model('ext_type').where({ext: this.ext.ext}).order('sort ASC').select();
    return data;
  }

  /**
   * 排序
   * @param self
   * @param model 表名
   * @param id 主键
   * @returns {*}
   */
  async sortAction(table, id = 'id') {
    table = table || 'ext_' + this.ctx.controller.split('/')[1];
    console.log(table);
    const param = this.para('sort');
    const sort = JSON.parse(param);
    console.log(sort);
    const data = [];
    for (const v of sort) {
      const map = {};
      map[id] = v.id;
      map.sort = v.sort;
      data.push(map);
    }
    const res = await this.model(table).updateMany(data);
    if (res > 0) {
      return this.success({ name: '更新排序成功！'});
    } else {
      return this.fail('排序失败！');
    }
  }

  /**
   *  插件配置管理。
   */
  async settingAction() {
    if (this.isPost) {
      const data = this.post();
      if (think.isEmpty(data.ext)) {
        data.ext = this.ext.ext;
      }
      // console.log(data);
      const res = await this.model('ext').where({ext: this.ext.ext}).update({setting: JSON.stringify(data)});
      if (res) {
        return this.success({ name: '更新成功！'});
      } else {
        return this.fail('更新失败！');
      }
    } else {
      this.assign('setting', this.setting);
      return this.display();
    }
  }
  /**
   * 插件分类管理
   * @returns {*}
   */
  async typeAction() {
    // 获取友情链接
    const data = await this.model('ext_type').where({ext: this.ext.ext}).page(this.get('page')).order('sort ASC').countSelect();
    // console.log(data);
    const Page = this.service('pagination');
    const page = new Page();
    const html = page.page(data, this.ctx, {
      desc: true, // show description
      pageNum: 2,
      url: '', // page url, when not set, it will auto generated
      class: 'nomargin', // pagenation extra class
      text: {
        next: '下一页',
        prev: '上一页',
        total: '总数: ${count} , 页数: ${pages}'
      }
    });
    this.assign('pagerData', html); // 分页展示使用
    this.assign('list', data.data);
    return this.display();
  }
  /**
   * 排序
   * @param self
   * @param model 表名
   * @param id 主键
   * @returns {*}
   */
  async typesortAction() {
    const param = this.para('sort');
    const sort = JSON.parse(param);
    const data = [];
    for (const v of sort) {
      const map = {};
      map.typeid = v.id;
      map.sort = v.sort;
      data.push(map);
    }
    const res = await this.model('ext_type').updateMany(data);
    if (res > 0) {
      return this.success({ name: '更新排序成功！'});
    } else {
      return this.fail('排序失败！');
    }
  }

  /**
   * 删除分类
   * @returns {*}
   */
  async typedelAction() {
    const ids = this.para('ids');
    // console.log(ids);
    const res = await this.model('ext_type').where({typeid: ['IN', ids]}).delete();
    if (res) {
      return this.success({name: '删除成功!'});
    } else {
      return this.fail('删除失败！');
    }
  }
  /**
   * 添加类别
   * @returns {*}
   */
  async typeaddAction() {
    if (this.isPost) {
      const data = this.post();
      data.ext = this.ext.ext;
      const res = await this.model('ext_type').add(data);
      if (res) {
        return this.success({name: '添加成功!'});
      } else {
        return this.fail('添加失败！');
      }
    } else {
      this.meta_title = '添加类别';
      return this.display();
    }
  }
  /**
   * 修改友情链接
   */
  async typeeditAction() {
    if (this.isPost) {
      const data = this.post();
      data.ext = this.ext.ext;
      const res = await this.model('ext_type').where({typeid: data.typeid}).update(data);
      if (res) {
        return this.success({name: '修改成功!'});
      } else {
        return this.fail('修改失败！');
      }
    } else {
      const id = this.get('id');
      const type = await this.model('ext_type').where({typeid: id}).find();
      console.log(type);
      this.assign('type', type);
      // 获取当前插件的分类
      this.meta_title = '修改类别';
      return this.display();
    }
  }
};
