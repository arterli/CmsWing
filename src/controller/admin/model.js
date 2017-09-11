// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

const Base = require('../common/admin');
module.exports = class extends Base {
  constructor(ctx) {
    super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
    // 其他额外的操作
    this.db = this.model('model');
    this.tactive = 'setup';
  }

  async indexAction() {
    const map = {'status': ['>', -1]};
    const data = await this.db.where(map).page(this.get('page')).countSelect();
    const html = this.pagination(data);
    this.assign('pagerData', html); // 分页展示使用
    this.assign('list', data.data);
    this.meta_title = '模型管理';
    return this.display();
  }

  /**
     * 新建模型
     * @returns {*}
     */
  async addAction() {
    if (this.isPost) {
      const data = this.post();
      // console.log(data);
      data.create_time = new Date().valueOf();
      data.update_time = new Date().valueOf();
      data.status = 1;
      // console.log(data);
      const res = await this.db.add(data);
      if (res) {
        update_cache('model');// 更新模型缓存
        return this.success({name: '添加成功', url: '/admin/model/index'});
      } else {
        return this.fail('添加模型失败!');
      }
    } else {
      this.active = 'admin/model/index';
      this.meta_title = '添加系统模型';
      return this.display();
    }
  }
  /**
     * 新建独立模型
     * @returns {*}
     */
  async addextAction() {
    if (this.isPost) {
      const data = this.post();
      // console.log(data);
      data.create_time = new Date().valueOf();
      data.update_time = new Date().valueOf();
      data.status = 1;
      // console.log(data);

      const res = await this.db.add(data);
      if (res) {
        // 初始化表结构
        const addtable = await this.model('attribute').addtable(res);
        // console.log(addtable);
        update_cache('model');// 更新模型缓存
        return this.success({name: '添加成功', url: '/admin/model/index'});
      } else {
        return this.fail('添加失败!');
      }
    } else {
      this.active = 'admin/model/index';
      this.meta_title = '添加独立模型';
      return this.display();
    }
  }

  /**
     * 编辑模型
     *
     */
  async editAction() {
    if (this.isPost) {
      const post = this.post();
      post.update_time = new Date().valueOf();
      if (think.isArray(post.attribute_list)) {
        post.attribute_list = post.attribute_list.join(',');
      }

      const res = await this.db.update(post);
      if (res) {
        update_cache('model');// 更新模型缓存
        return this.success({name: '更新模型成功!', url: '/admin/model/index'});
      }
    } else {
      const id = this.get('id');
      let allfields;
      if (think.isEmpty(id)) {
        this.fail('参数不能为空！');
      }
      const data = await this.db.find(id);
      // console.log(data);
      data.attribute_list = think.isEmpty(data.attribute_list) ? '' : data.attribute_list.split(',');
      // console.log(data.attribute_list);
      const fields = await this.model('attribute').where({model_id: data.id}).field('id,name,title,is_show').select();
      // 是否继承了其他模型
      if (data.extend != 0) {
        var extend_fields = await this.model('attribute').where({model_id: data.extend}).field('id,name,title,is_show').select();
        allfields = fields.concat(extend_fields);
      } else {
        allfields = fields;
      }
      // console.log(allfields)
      // 梳理属性的可见性
      for (const field of allfields) {
        if (!think.isEmpty(data.attribute_list) && !in_array(field.id, data.attribute_list)) {
          field.is_show = 0;
        }
        // console.log(field);
      }
      // console.log(allfields);
      // 改造数组
      var obj = {};
      if (allfields) {
        for (const v of allfields) {
          obj[v.id] = v;
        }
      } else {
        for (const v of fields) {
          obj[v.id] = v;
        }
      }
      // 获取模型排序字段
      const field_sort = JSON.parse(data.field_sort);
      if (!think.isEmpty(field_sort)) {
        for (const group in field_sort) {
          // console.log(field_sort[group])
          // for(var value of field_sort[group]){
          //    console.log(value)
          // }

          field_sort[group].forEach((v, k) => {
            if (obj[v]) {
              obj[v].group = group;
              obj[v].sort = k;
            }
            // console.log(v, k)
          });
        }
      }
      console.log(obj);
      const order = think._.values(obj);
      // console.log(order);
      const orderbgy = think._.orderBy(order, ['group', 'sort'], ['asc', 'asc']);

      this.assign({'fields': fields, 'extend_fields': extend_fields, 'allfields': orderbgy, 'info': data});
      this.active = 'admin/model/index';
      this.meta_title = '编辑模型';
      return this.display();
    }
  }

  /**
     * 编辑独立模型
     *
     */
  async editextAction() {
    if (this.isPost) {
      const post = this.post();
      post.update_time = new Date().valueOf();
      if (think.isArray(post.attribute_list)) {
        post.attribute_list = post.attribute_list.join(',');
      }

      const res = await this.db.update(post);
      if (res) {
        this.cache('get_document_model', null);// 清除模型缓存
        this.cache('get_model', null);// 清除模型缓存
        return this.success({name: '更新模型成功!', url: '/admin/model/index'});
      }
    } else {
      const id = this.get('id');
      let allfields;
      if (think.isEmpty(id)) {
        this.fail('参数不能为空！');
      }
      const data = await this.db.find(id);
      // console.log(data);
      data.attribute_list = think.isEmpty(data.attribute_list) ? '' : data.attribute_list.split(',');
      // console.log(data.attribute_list);
      const fields = await this.model('attribute').where({model_id: data.id}).field('id,name,title,is_show').select();
      // 是否继承了其他模型
      if (data.extend != 0) {
        var extend_fields = await this.model('attribute').where({model_id: data.extend}).field('id,name,title,is_show').select();
        allfields = fields.concat(extend_fields);
      } else {
        allfields = fields;
      }
      // console.log(allfields)
      // 梳理属性的可见性
      for (const field of allfields) {
        if (!think.isEmpty(data.attribute_list) && !in_array(field.id, data.attribute_list)) {
          field.is_show = 0;
        }
        // console.log(field);
      }
      // console.log(allfields);
      // 改造数组
      var obj = {};
      if (allfields) {
        for (const v of allfields) {
          obj[v.id] = v;
        }
      } else {
        for (const v of fields) {
          obj[v.id] = v;
        }
      }
      // 获取模型排序字段
      const field_sort = JSON.parse(data.field_sort);
      if (!think.isEmpty(field_sort)) {
        for (const group in field_sort) {
          // console.log(field_sort[group])
          // for(var value of field_sort[group]){
          //    console.log(value)
          // }

          field_sort[group].forEach((v, k) => {
            if (obj[v]) {
              obj[v].group = group;
              obj[v].sort = k;
            }
            // console.log(v, k)
          });
        }
      }

      const order = think._.values(obj);
      // console.log(order);
      const orderbgy = think._.orderBy(order, ['group', 'sort'], ['asc', 'asc']);

      this.assign({'fields': fields, 'extend_fields': extend_fields, 'allfields': orderbgy, 'info': data});
      this.active = 'admin/model/index';
      this.meta_title = '编辑模型';
      return this.display();
    }
  }
  /**
     * 生成模型
     * @returns {*}
     */
  generateAction() {
    this.active = 'admin/model/index';
    this.meta_title = '生成模型';
    return this.display();
  }

  /**
     * 删除模型模型
     */
  async delAction() {
    const ids = this.get('id');
    think.isEmpty(ids) && this.fail('参数不能为空');
    const res = await this.db.del(ids);
    if (!res) {
      return this.fail('删除失败');
    } else {
      update_cache('model');// 更新模型缓存
      return this.success({name: '删除成功！'});
    }
  }
  /**
     * 新增字段检查同一张表是否有相同的字段
     */
  async checknameAction() {
    const name = this.get('name');
    const id = this.get('id');
    const res = await this.db.checkName(name, id);
    if (res) {
      return this.json(1);
    } else {
      return this.json(0);
    }
  }
};
