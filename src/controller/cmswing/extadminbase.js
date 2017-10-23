// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
const Admin = require('./admin');
const path = require('path');
const fs = require('fs');
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
    const c = this.ctx.controller.split('/');
    this.extConfig = think.app.controllers[`ext/${c[1]}/config`];
    this.extPath = `${think.ROOT_PATH}/src/controller/ext/${c[1]}`;
    const extadminleftlist = await this.model('ext').where({status: 1, isadm: 1}).order('sort DESC, installtime DESC').select();
    this.assign('extadminleftlist', extadminleftlist);
    this.tactive = 'article';
    this.assign({'navxs': true});
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
    const param = this.para('sort');
    const sort = JSON.parse(param);
    const data = [];
    for (const v of sort) {
      const map = {};
      map[id] = v.id;
      map.sort = v.sort;
      data.push(map);
    }
    await this.model(table).updateMany(data);
    await update_cache('ext');
    await update_cache('hooks');
    return this.success({ name: '更新排序成功！'});
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
        await update_cache('ext');
        await update_cache('hooks');
        process.send('think-cluster-reload-workers'); // 给主进程发送重启的指令
        return this.success({ name: '更新成功！'});
      } else {
        return this.fail('更新失败！');
      }
    } else {
      this.assign('setting', this.setting);
      return this.display('ext/setting');
    }
  }
  /**
   * 插件分类管理
   * @returns {*}
   */
  async typeAction() {
    // 获取友情链接
    const data = await this.model('cmswing/ext_type').where({ext: this.ext.ext}).page(this.get('page')).order('sort ASC').countSelect();
    // console.log(data);
    const html = this.pagination(data);
    this.assign('pagerData', html); // 分页展示使用
    this.assign('list', data.data);
    return this.display('ext/type');
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
      return this.display('ext/type_add');
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
      return this.display('ext/type_edit');
    }
  }

  /**
   * 安装插件
   */
  async installAction() {
    const ext = this.get('ext');
    const data = this.extConfig;
    data.installtime = new Date().getTime();
    // console.log(data);
    // 安装插件
    if (think.isEmpty(data.setting)) {
      data.setting = '{}';
    } else {
      const setting = {};
      for (const s of data.setting) {
        for (const ss in s) {
          for (const sss of s[ss]) {
            // console.log(sss);
            setting[sss.name] = sss.value;
          }
        }
      }
      data.setting = JSON.stringify(think.extend(setting, {ext: ext}));
    }
    // console.log(data);
    // 导入数据
    await this.model('ext').add(data);
    // 将插件添加到钩子
    if (!think.isEmpty(data.hooks)) {
      for (const h of data.hooks) {
        const hooks = await this.model('hooks').where({name: h}).find();
        let extarr = hooks.ext ? hooks.ext.split(',') : [];
        extarr.push(data.ext);
        extarr = think._.uniq(extarr);
        // 更新钩子
        await this.model('hooks').where({name: h}).update({ext: extarr.join(',')});
      }
    }
    // 导入数据库文件
    const sqlpath = !think.isEmpty(data.sql) ? path.join(this.extPath, `${data.sql}`) : path.join(this.extPath, `${ext}.sql`);
    if (think.isFile(sqlpath)) {
      const sqlfile = fs.readFileSync(sqlpath, 'utf8');
      // todo 自动适配表名
      // 导入数据库
      let content = sqlfile.split(/(?:\r\n|\r|\n)/g).filter(item => {
        item = item.trim();
        const ignoreList = ['--', 'SET', '#', 'LOCK', 'UNLOCK', 'INSERT'];
        for (const it of ignoreList) {
          if (item.indexOf(it) === 0) {
            return false;
          }
        }
        return true;
      }).join('');
      content = content.replace(/\/\*.*?\*\//g, '');
      content = content.substring(0, content.length - 1);
      // console.log(content);
      const arr = content.split(';');
      // console.log(arr);
      const insert = sqlfile.split(/(?:\r\n|\r|\n)/g).filter(item => {
        item = item.trim();
        if (item.indexOf('INSERT') === 0) {
          return true;
        }
        return false;
      });
        // console.log(insert);
      const sqlarr = arr.concat(insert);
      try {
        for (let item of sqlarr) {
          item = item.trim();
          if (item) {
            item = item.replace(/cmswing_/g, this.config('model.mysql.prefix') || '');
            think.logger.info(item);
            await this.model('mysql').execute(item);
          }
        }
      } catch (e) {
        think.logger.error(e);
        return this.fail('数据表导入失败，请在控制台下查看具体的错误信息，并在 GitHub 上发 issue。');
      }
    }
    await update_cache('ext');
    await update_cache('hooks');
    process.send('think-cluster-reload-workers'); // 给主进程发送重启的指令
    return this.success({name: `安装成功！`, url: `/admin/ext/index`});
  }

  /**
   * 卸载插件
   * @returns {Promise.<*>}
   */
  async uninstallAction() {
    const ext = this.get('ext');
    const data = this.extConfig;
    // 删除插件表中的数据
    await this.model('ext').where({ext: ext}).delete();
    // 卸载钩子
    const hooks = await this.model('hooks').where({ext: ['like', `%${ext}%`]}).select();
    for (const h of hooks) {
      const ne = think._.remove(h.ext.split(','), function(n) {
        return n !== ext;
      });
      await this.model('hooks').where({id: h.id}).update({ext: ne.join(',')});
    }
    // 删除数据库插件表信息
    // 删除数据库，表
    const tables = data.table;
    await this.deltable(tables);
    await update_cache('ext');
    await update_cache('hooks');
    process.send('think-cluster-reload-workers'); // 给主进程发送重启的指令
    return this.success({name: '卸载成功!'});
  }

  /**
   * 重载插件
   * @returns {Promise.<*>}
   */
  async reloadAction() {
    const ext = this.get('ext');
    const data = this.extConfig;
    data.installtime = new Date().getTime();
    // console.log(data);
    delete data.setting;
    console.log(data);
    // 导入数据
    await this.model('ext').where({ext: ext}).update(data);
    // 卸载钩子
    const hooks = await this.model('hooks').where({ext: ['like', `%${ext}%`]}).select();
    for (const h of hooks) {
      const ne = think._.remove(h.ext.split(','), function(n) {
        return ext !== n;
      });
      await this.model('hooks').where({id: h.id}).update({ext: ne.join(',')});
    }
    // 重新添加钩子
    if (!think.isEmpty(data.hooks)) {
      for (const h of data.hooks) {
        const hooks = await this.model('hooks').where({name: h}).find();
        const extarr = hooks.ext ? hooks.ext.split(',') : [];
        extarr.push(data.ext);
        // 更新钩子
        await this.model('hooks').where({name: h}).update({ext: extarr.join(',')});
      }
    }
    // 导入数据库文件
    // todo
    await update_cache('ext');
    await update_cache('hooks');
    process.send('think-cluster-reload-workers'); // 给主进程发送重启的指令
    return this.success({name: '重载成功！', url: '/admin/ext/index'});
  }

  /**
   * 删除插件
   * @returns {Promise.<*>}
   */
  async delextAction() {
    const ext = this.get('ext');
    if (ext === 'demo') return this.fail('不允许删除');
    const extpath = `${think.ROOT_PATH}/src/controller/ext/${ext}`;
    const data = this.extConfig;
    // 删除数据库，表
    const tables = data.table;
    await this.deltable(tables);
    await think.rmdir(extpath).then(() => {
      console.log('删除完成');
    });
    await update_cache('ext');
    await update_cache('hooks');
    process.send('think-cluster-reload-workers'); // 给主进程发送重启的指令
    return this.success({name: '删除成功！'});
  }
  // 删除表
  async deltable(tables) {
    const prefix = `${this.config('model.mysql.prefix')}ext_`;
    if (!think.isEmpty(tables)) {
      for (const t of tables) {
        const table = prefix + t;
        let sql = `SHOW TABLES LIKE '${table}'`;
        const istable = await this.model('mysql').query(sql);
        if (!think.isEmpty(istable)) {
          sql = `DROP TABLE ${table}`;
          await this.model('mysql').execute(sql);
        }
      }
    }
  }
};
