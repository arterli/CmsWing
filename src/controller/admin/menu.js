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
    this.db = this.model('menu');
    this.tactive = 'setup';
  }

  indexAction() {
    // auto render template file index_index.html
    this.meta_title = '菜单管理';
    return this.display();
  }

  /**
     * getlist
     */
  async getlistAction() {
    const pid = this.get('pid') || 0;
    const draw = this.get('draw');
    if (pid) {
      const data = await this.db.where({id: pid}).find();
    }
    let i = pid;
    //
    const breadcrumb = [];
    while (i != 0) {
      const nav = await this.db.where({id: i}).field('id,title,pid').find();
      breadcrumb.push(nav);
      i = nav.pid;
    }
    const all_menu = await this.db.field('id,title').select();
    // all_men
    const obj = {};
    all_menu.forEach(v => {
      obj[v.id] = v.title;
    });

    const map = {};
    map.pid = pid;
    const list = await this.db.where(map).order('sort asc ,id asc').select();
    // list
    if (list) {
      list.forEach((v, k) => {
        if (v.pid) {
          v.up_title = obj[v.pid];
        } else {
          v.up_title = '一级菜单';
        }

        v.group = (this.config('setup.MENU_GROUP'))[v.group];
      });
    }
    const relist = {
      'draw': draw,
      'data': list,
      'breadcrumb': breadcrumb.reverse()
    };
    // console.log(data);
    return this.json(relist);
  }
  /**
     * 改变状态
     * @returns {Promise|*}
     */
  async chstaAction() {
    // let gets = this.get();
    const map = {};
    // console.log(gets);
    if (this.get('key') == 1) {
      map.hide = this.get('status');
    } else {
      map.is_dev = this.get('status');
    }
    map.id = this.get('id');
    const res = await this.db.update(map);
    if (res) {
      think.cache('adminenu', null);// 清除菜单缓存
      return this.json(res);
    }
  }
  /**
     * 编辑菜单
     * @returns {*}
     */
  async editAction() {
    if (this.isAjax('post')) {
      const id = this.post('id');
      const data = await this.db.where({id: id}).update(this.post());
      think.cache('adminenu', null);// 清除菜单缓存
      return this.json(data);
    } else {
      const id = this.get('id');
      const res = await this.db.where({id: id}).find();
      // console.log(res);
      this.assign({
        data: res
      });
      return this.display();
    }
  }

  /**
     * 添加菜单
     * @returns {*}
     */
  async addAction() {
    if (this.isAjax('post')) {
      const data = this.post();
      data.status = 1;
      const add = await this.db.add(data);
      think.cache('adminenu', null);// 清除菜单缓存
      return this.json(add);
    } else {
      return this.display();
    }
  }

  /**
     * 删除菜单
     * @returns {Promise|*}
     */
  async deleteAction() {
    const id = this.post('id');
    // console.log(id);
    const res = await this.db.where({id: id}).delete();
    think.cache('adminenu', null);// 清除菜单缓存
    return this.json(res);
  }

  /**
     * 获取上级菜单
     * @returns {Promise|*}
     */
  async getmenuAction() {
    const menu = await this.returnnodes();
    // console.log(menu);
    return this.json(menu);
  }
};
