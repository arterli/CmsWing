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
   * 友情链接管理列表
   * @return {Promise} []
   */
  async indexAction() {
    // auto render template file index_index.html
    const typeid = this.get('typeid') || 0;
    this.assign('typeid', typeid);
    const map = {};
    if (typeid > 0) {
      map.typeid = typeid;
    }
    // 获取友情链接
    const data = await this.model('ext_link').where(map).page(this.get('page')).countSelect();
    // console.log(data);
    const html = this.pagination(data);
    this.assign('pagerData', html); // 分页展示使用
    this.assign('list', data.data);
    // 获取当前插件的分类
    this.assign('type', await this.gettype());
    return this.extDisplay();
  }

  /**
   * 添加友情链接
   * @returns {*}
   */
  async ajaxaddAction() {
    if (this.isPost) {
      const data = this.post();
      if (data.linktype == 1) {
        if (think.isEmpty(data.logo)) {
          return this.fail('logo链接类型，请填写logo地址！');
        }
      }
      const res = await this.model('ext_link').add(data);
      if (res) {
        return this.success({name: '添加成功!'});
      } else {
        return this.fail('添加失败！');
      }
    } else {
      // 获取当前插件的分类
      this.assign('type', await this.gettype());
      this.meta_title = '添加友情链接';
      return this.extDisplay();
    }
  }

  /**
     * 修改友情链接
     */
  async ajaxeditAction() {
    if (this.isPost) {
      const data = this.post();
      if (data.linktype == 1) {
        if (think.isEmpty(data.logo)) {
          return this.fail('logo链接类型，请填写logo地址！');
        }
      }
      const res = await this.model('ext_link').where({id: data.id}).update(data);
      if (res) {
        return this.success({name: '修改成功!'});
      } else {
        return this.fail('修改失败！');
      }
    } else {
      const id = this.get('id');
      const link = await this.model('ext_link').find(id);
      console.log(link);
      this.assign('link', link);
      // 获取当前插件的分类
      this.assign('type', await this.gettype());
      this.meta_title = '添加友情链接';
      return this.extDisplay();
    }
  }
  async delAction() {
    const ids = this.para('ids');
    // console.log(ids);
    const res = await this.model('ext_link').where({id: ['IN', ids]}).delete();
    if (res) {
      return this.success({name: '删除成功!'});
    } else {
      return this.fail('删除失败！');
    }
  }

  /**
   *  友情链接审核申请
   * @returns {*}
   */
  async applyAction() {
    if (this.isPost) {
      const ids = this.post('ids');
      const res = await this.model('ext_link').where({id: ['IN', ids]}).update({passed: 1});
      if (res) {
        return this.success({name: '审核成功!'});
      } else {
        return this.fail('审核失败！');
      }
    } else {
      // 获取友情链接
      const data = await this.model('ext_link').where({passed: 0}).page(this.get('page')).countSelect();
      // console.log(data);
      const html = this.pagination(data);
      this.assign('pagerData', html); // 分页展示使用
      this.assign('list', data.data);
      return this.extDisplay();
    }
  }
};
