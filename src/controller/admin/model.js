// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const path = require('path');
const fs = require('fs');
module.exports = class extends think.cmswing.admin {
  constructor(ctx) {
    super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
    // 其他额外的操作
    this.db = this.model('cmswing/model');
    this.tactive = 'setup';
  }

  async indexAction() {
    const map = {'status': ['>', -1], 'ismod': 0};
    const data = await this.db.where(map).page(this.get('page')).countSelect();
    const html = this.pagination(data);
    this.assign('pagerData', html); // 分页展示使用
    this.assign('list', data.data);
    this.meta_title = '系统模型管理';
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
   * 独立模型
   * @returns {Promise.<*>}
   */
  async extAction() {
    const map = {'status': ['>', -1], 'ismod': 1};
    const data = await this.db.where(map).page(this.get('page')).countSelect();
    const html = this.pagination(data);
    this.assign('pagerData', html); // 分页展示使用
    this.assign('list', data.data);
    this.meta_title = '独立模型管理';
    this.tactive = 'ext';
    return this.display();
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
      data.ismod = 1;
      // console.log(data);
      if (think.isArray(data.attribute_list)) {
        data.attribute_list = data.attribute_list.join(',');
      }
      const res = await this.db.add(data);
      if (res) {
        // 初始化表结构
        const addtable = await this.model('cmswing/attribute').addtable(res);

        // 将模型添加到钩子
        if (!think.isEmpty(data.hooks)) {
          for (const h of data.hooks.split(',')) {
            const hooks = await this.model('hooks').where({name: h}).find();
            let extarr = hooks.ext ? hooks.ext.split(',') : [];
            extarr.push(data.name);
            extarr = think._.uniq(extarr);
            // 更新钩子
            await this.model('hooks').where({name: h}).update({ext: extarr.join(',')});
          }
        }
        // console.log(addtable);
        update_cache('model');// 更新模型缓存
        return this.success({name: '添加成功', url: '/admin/model/ext'});
      } else {
        return this.fail('添加失败!');
      }
    } else {
      const hooks = await this.model('hooks').select();
      this.assign('hooks', hooks);
      this.tactive = 'ext';
      this.active = 'admin/model/ext';
      this.meta_title = '添加独立模型';
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
      post.ismod = 1;
      post.update_time = new Date().valueOf();
      if (think.isArray(post.attribute_list)) {
        post.attribute_list = post.attribute_list.join(',');
      }
      console.log(post);
      if (!think.isEmpty(post.hooks) && think.isArray(post.hooks)) {
        post.hooks = post.hooks.join(',');
      }
      const res = await this.db.update(post);
      if (res) {
        // 将模型添加到钩子
        if (!think.isEmpty(post.hooks)) {
          for (const h of post.hooks.split(',')) {
            const hooks = await this.model('hooks').where({name: h}).find();
            let extarr = hooks.ext ? hooks.ext.split(',') : [];
            extarr.push(post.name);
            extarr = think._.uniq(extarr);
            // 更新钩子
            await this.model('hooks').where({name: h}).update({ext: extarr.join(',')});
          }
        }

        // 生成或更新配置文件
        const configs = await this.model('model').fieldReverse('id').find(post.id);
        // console.log(configs);
        const moddir = `${think.APP_PATH}/controller/mod`;
        const modpath = `${moddir}/${configs.name}`;
        fs.writeFileSync(`${modpath}/config.js`, `module.exports = ${JSON.stringify(configs)}`);
        // return this.fail('ddd');
        this.cache('get_document_model', null);// 清除模型缓存
        this.cache('get_model', null);// 清除模型缓存
        return this.success({name: '更新模型成功!', url: '/admin/model/ext'});
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
      //
      if (!think.isEmpty(data.hooks)) {
        data.hooks = data.hooks.split(',');
      }
      const hooks = await this.model('hooks').select();
      this.assign('hooks', hooks);
      this.assign({'fields': fields, 'extend_fields': extend_fields, 'allfields': orderbgy, 'info': data});
      this.tactive = 'ext';
      this.active = 'admin/model/ext';
      this.meta_title = '编辑模型';
      return this.display();
    }
  }

  /**
   * 卸载独立模型
   */
  async unextAction() {
    const id = this.get('id');
    const m = await this.model('model').find(id);
    console.log(m);
    // 删除该模型的数据库表
    if (!think.isEmpty(m.table)) {
      await this.deltable(m.table.split(','), m.name);
    }
    // 删除该模型的分类
    const cats = await this.model('category').where({model: m.id}).getField('id');
    console.log(cats);
    // await this.model('category').where({id:['IN',cats]}).delete();
    console.log('删除分类');
    // 清理 分类权数据
    // await this.model('category_priv').where({catid:['IN',cats]}).delete();
    console.log('清除分类权限');
    // 清除
    return this.fail('ddd');
  }

  // 删除表
  async deltable(tables, name) {
    console.log('删除表');
    const prefix = `${this.config('model.mysql.prefix')}`;
    if (!think.isEmpty(tables)) {
      for (const t of tables) {
        if (t.indexOf(name) === 0) {
          const table = prefix + t;
          const sql = `SHOW TABLES LIKE '${table}'`;
          const istable = await this.model('mysql').query(sql);
          console.log(istable);
        // if (!think.isEmpty(istable)) {
        //   sql = `DROP TABLE ${table}`;
        //   await this.model('mysql').execute(sql);
        // }
        }
      }
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
