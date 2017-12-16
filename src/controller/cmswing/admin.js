// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

module.exports = class extends think.Controller {
  async __before() {
    // 登陆验证
    const is_login = await this.islogin();
    if (!is_login) {
      return this.redirect('/admin/public/signin');
    }

    // 用户信息
    this.user = await this.session('userInfo');
    this.assign('userinfo', this.user);
    this.roleid = await this.model('auth_user_role').where({user_id: this.user.uid}).getField('role_id', true);
    // 网站配置
    // this.setup = await this.model("setup").getset();
    // console.log(this.setup);
    this.is_admin = await this.isadmin();
    // 后台菜单
    this.adminmenu = await this.model('cmswing/menu').getallmenu(this.user.uid, this.is_admin);
    const allmenu = this.config('setup.MENU_GROUP');
    this.MenuGroup = {};
    for (const key in this.adminmenu) {
      this.MenuGroup[key] = allmenu[key];
    }
    /** 菜单当前状态
     *  权限验证超级管理员
     */
    const url = `${this.ctx.controller}/${this.ctx.action}`;
    // console.log(url);
    if (!this.is_admin) {
      const auth = this.service('cmswing/rbac', this.user.uid);
      const res = await auth.check(url);
      if (!res) {
        const error = this.controller('cmswing/error');
        return error.noAction('未授权访问!');
      }
    }
    this.active = this.ctx.controller + '/' + this.ctx.action;
    // 后台提示
    // 审核提示
    const notifications = {};
    notifications.count = 0;
    notifications.data = [];
    const approval = await this.model('approval').count();
    if (approval > 0) {
      notifications.count = notifications.count + Number(approval);
      notifications.data.push({type: 'approval', info: `有 ${approval} 条内容待审核`, url: '/admin/approval/index', ico: 'fa-umbrella'});
    }

    // console.log(notifications);
    this.assign({
      'navxs': false,
      'bg': 'bg-black',
      'notifications': notifications
    });
  }

  /**
     * 判断是否登录
     * @returns {boolean}
     */
  async islogin() {
    // 判断是否登录
    const user = await this.session('userInfo');
    const res = think.isEmpty(user) ? false : user.uid;
    return res;
  }

  /**
     * 检查当前用户是否为管理员
     * @param uid
     * @returns {*|boolean}
     */
  async isadmin(uid) {
    uid = uid || null;
    uid = think.isEmpty(uid) ? await this.islogin() : uid;
    return uid && (in_array(parseInt(uid), this.config('user_administrator')));
  }
  /**
     * 对数据表中的单行或多行记录执行修改 GET参数id为数字或逗号分隔的数字
     *
     * @param {String} model 模型名称,供M函数使用的参数
     * @param {Object}  data  修改的数据
     * @param {Object}  where 查询时的where()方法的参数
     * @param {Object}  msg   执行正确和错误的消息 {'success':'','error':'', 'url':'','ajax':false}
     *                      url为跳转页面,ajax是否ajax方式(数字则为倒数计时秒数)
     *
     * @author arterli <arterli@qq.com>
     */
  async editRow(model, data, where, msg) {
    // let id = this.para('id');
    // id = think.isArray(id) ? id : id;
    // 如存在id字段，则加入该条件
    // let fields = await this.model(model).getSchema();
    // console.log(fields);
    // if (in_array('id', fields) && !think.isEmpty(id)) {
    //     where = think.extend({ 'id': ['IN', id] }, where);
    // }

    msg = think.extend({ 'success': '操作成功！', 'error': '操作失败！', 'url': '', 'ajax': this.isAjax() }, msg);
    const res = await this.model(model).where(where).update(data);
    if (res) {
      console.log(model);
      switch (model) {
        case 'channel':// 更新频道缓存信息
          await update_cache('channel');// 更新频道缓存信息
          break;
        case 'category':// 更新全站分类缓存
          await update_cache('category');// 更新栏目缓存
          break;
        case 'model':
          await update_cache('model');// 更新栏目缓存
          break;
        case 'ext':
          await update_cache('ext');
      }
      return this.success({ name: msg.success, url: msg.url });
    } else {
      return this.fail(msg.error, msg.url);
    }
  }

  /**
     * 禁用条目
     * @param {String} model 模型名称,供D函数使用的参数
     * @param {Object}  where 查询时的 where()方法的参数
     * @param {Object}  msg   执行正确和错误的消息,可以设置四个元素 {'success':'','error':'', 'url':'','ajax':false}
     *                     url为跳转页面,ajax是否ajax方式(数字则为倒数计时秒数)
     *
     * @author arterli <arterli@qq.com>
     */
  async forbid(model, where, msg) {
    where = where || {}, msg = msg || { 'success': '状态禁用成功！', 'error': '状态禁用失败！' };
    const data = { 'status': 0 };
    await this.editRow(model, data, where, msg);
  }

  /**
     * 恢复条目
     * @param {String} model 模型名称,供D函数使用的参数
     * @param {Object}  where 查询时的where()方法的参数
     * @param {Object}  msg   执行正确和错误的消息 {'success':'','error':'', 'url':'','ajax':false}
     *                     url为跳转页面,ajax是否ajax方式(数字则为倒数计时秒数)
     *
     * @author arterli <arterli@qq.com>
     */
  async resume(model, where, msg) {
    where = where || {}, msg = msg || { 'success': '状态恢复成功！', 'error': '状态恢复失败！' };
    const data = { 'status': 1 };
    await this.editRow(model, data, where, msg);
  }

  /**
     * 还原条目
     * @param {string} model 模型名称,供D函数使用的参数
     * @param {array}  where 查询时的where()方法的参数
     * @param {array}  msg   执行正确和错误的消息 {'success':'','error':'', 'url':'','ajax':false}
     *                     url为跳转页面,ajax是否ajax方式(数字则为倒数计时秒数)
     * @author arterli <arterli@qq.com>
     */
  async restore(model, where, msg) {
    where = where || {}, msg = msg || { 'success': '状态还原成功！', 'error': '状态还原失败！' };
    const data = { 'status': 1 };
    where = think.extend({ 'status': -1 }, where);
    await this.editRow(model, data, where, msg);
  }

  /**
     * 条目假删除
     * @param {string} model 模型名称,供D函数使用的参数
     * @param {array}  where 查询时的where()方法的参数
     * @param {array} msg   执行正确和错误的消息 {'success':'','error':'', 'url':'','ajax':false}
     *                     url为跳转页面,ajax是否ajax方式(数字则为倒数计时秒数)
     *
     * @author arterli <arterli@qq.com>
     */
  async delete(model, where, msg) {
    where = where || {}, msg = msg || { 'success': '删除成功！', 'error': '删除失败！' };
    const data = { 'status': -1 };
    await this.editRow(model, data, where, msg);
  }

  /**
     * 设置一条或者多条数据的状态
     */
  async setstatusAction(model, pk = 'id') {
    if (think.isEmpty(this.ctx.param('model'))) {
      model = model || this.ctx.controller.substring(6);
    } else {
      model = this.para('model');
    }

    const ids = this.para('ids');
    let status = this.para('status');
    status = parseInt(status);
    if (think.isEmpty(ids)) {
      return this.fail('请选择要操作的数据');
    }
    const map = {};
    if (!think.isEmpty(this.para('pk'))) {
      pk = this.para('pk');
    }
    map[pk] = ['IN', ids];
    // return this.fail(model);

    switch (status) {
      case -1:
        await this.delete(model, map, { 'success': '删除成功', 'error': '删除失败' });
        break;
      case 0:
        await this.forbid(model, map, { 'success': '禁用成功', 'error': '禁用失败' });
        break;
      case 1:
        await this.resume(model, map, { 'success': '启用成功', 'error': '启用失败' });
        break;
      default:
        this.fail('参数错误');
        break;
    }
  }

  /**
     * 排序
     */
  async sortAction(model, id = 'id') {
    model = model || this.ctx.controller.substring(6);
    const param = this.para('sort');
    const sort = JSON.parse(param);
    const data = [];
    for (const v of sort) {
      const map = {};
      map[id] = v.id;
      map.sort = v.sort;
      data.push(map);
    }
    const res = await this.model(model).updateMany(data);
    if (res > 0) {
      // 更新缓存
      switch (model) {
        case 'channel':// 更新频道缓存信息
          update_cache('channel');// 更新频道缓存信息
          break;
        case 'category':// 更新全站分类缓存
          update_cache('category');// 更新栏目缓存
          break;
      }
      return this.success({ name: '更新排序成功！'});
    } else {
      return this.success({ name: '更新排序成功！'});
      // return this.fail('排序失败！');
    }
  }
  async puliccacheAction(model) {
    let type = this.para('type');
    if (think.isEmpty(type)) {
      type = model || this.ctx.controller.substring(6);
    }
    let res = false;
    let msg = '未知错误！';
    switch (type) {
      case 'channel':// 更新频道缓存信息
        update_cache('channel');// 更新频道缓存信息
        res = true;
        msg = '更新导航缓存成功！';
        break;
      case 'category':// 更新全站分类缓存
        update_cache('category');// 更新栏目缓存
        res = true;
        msg = '更新栏目缓存成功！';
        break;
      case 'model':
        update_cache('model');// 更新模型缓存
        res = true;
        msg = '更新栏目缓存成功！';
        break;
    }
    if (res) {
      return this.success({ name: msg});
    } else {
      return this.fail(msg);
    }
  }
  /**
     * 返回后台节点数据
     * @param {boolean} tree    是否返回多维数组结构(生成菜单时用到),为false返回一维数组(生成权限节点时用到)
     * @retrun {array}
     *
     * 注意,返回的主菜单节点数组中有'controller'元素,以供区分子节点和主节点
     *
     * @author
     */
  async returnnodes(tree) {
    tree = tree || true;
    // let modelname = http.module;
    let tree_nodes = [];
    if (tree && !think.isEmpty(tree_nodes)) {
      return tree_nodes;
    }
    let nodes;
    if (tree) {
      var list = await this.model('menu').field('id,pid,title,url,tip,hide').order('sort asc').select();
      nodes = get_children(list, 0);
    } else {
      nodes = await this.model('menu').field('title,url,tip,pid').order('sort asc').select();
    }
    tree_nodes = nodes;
    return nodes;
  }

  /**
     * 处理文档列表显示
     * @param {array} list 列表数据
     * @param {integer} model_id 模型id
     */
  async parseDocumentList(list, model_id) {
    model_id = model_id || 1;
    const attrList = await this.model('cmswing/attribute').get_model_attribute(model_id, false, 'id,name,type,extra');
    // attrList=attrList[model_id];
    // this.end(attrList);
    // console.log(attrList);
    if (think.isArray(list)) {
      list.forEach((data, k) => {
        // console.log(data);
        for (const key in data) {
          // console.log(key)
          if (!think.isEmpty(attrList[key])) {
            const extra = attrList[key]['extra'];
            const type = attrList[key]['type'];
            // console.log(extra);
            if (type == 'select' || type == 'checkbox' || type == 'radio' || type == 'bool') {
              // 枚举/多选/单选/布尔型
              const options = parse_config_attr(extra);
              const oparr = Object.keys(options);
              if (options && in_array(data[key], oparr)) {
                data[key] = options[data[key]];
              }
            } else if (type == 'date') { // 日期型
              data[key] = dateformat('Y-m-d', data[key]);
            } else if (type == 'datetime') { // 时间型
              data[key] = dateformat('Y-m-d H:i', data[key]);
            } else if (type === 'pics') {
              data[key] = `<span class="thumb-sm"><img alt="..." src="${data[key]}" class="img-responsive img-thumbnail"></span>`;
            }
          }
        }
        data.model_id = model_id;
        list[k] = data;
      });
      // console.log(222)
      return list;
    }
  }
  /**
     * 后台栏目权限验证方法
     * await this.admin_priv("init",cid,error) 查看
     * @param ac //init:查看,add:添加,edit:编辑,delete:删除,listorder:排序,push:推送,move:移动，examine：审核，disable：禁用
     * @param cid //栏目id
     * @param error //错误提示
     * @returns {PreventPromise}
     */
  async admin_priv(ac, cid, errors = '您所在的用户组,禁止本操作！') {
    if (!this.is_admin) {
      // 访问控制
      const priv = await this.model('cmswing/category_priv').priv(cid, this.roleid, ac, 1);
      return priv;
      // if (!priv) {
      //   console.log('fdsfs');
      //   const error = this.controller('cmswing/error');
      //   return error.noAction(errors);
      // }
    }
  }
  // 获取分类信息
  /**
   * 获取分类信息
   * await this.sort();
   * @param cate_id
   * @param sortid
   * @returns {Promise.<void>}
   */
  async sort(cate_id = this.get('cate_id'), sortid) {
    if (think.isEmpty(sortid)) {
      sortid = this.get('sortid') || 0;
    }
    let sort = await this.model('cmswing/category').get_category(cate_id, 'documentsorts');
    if (sort) {
      sort = JSON.parse(sort);
      if (sortid == 0) {
        sortid = sort.defaultshow;
      }
      const typevar = await this.model('typevar').where({sortid: sortid}).select();
      for (const val of typevar) {
        val.option = await this.model('typeoption').where({optionid: val.optionid}).find();
        if (val.option.type == 'select' || val.option.type == 'radio') {
          if (!think.isEmpty(val.option.rules)) {
            val.option.rules = JSON.parse(val.option.rules);
            val.rules = parse_type_attr(val.option.rules.choices);
            val.option.rules.choices = parse_config_attr(val.option.rules.choices);
          }
        } else if (val.option.type == 'checkbox') {
          if (!think.isEmpty(val.option.rules)) {
            val.option.rules = JSON.parse(val.option.rules);
            val.rules = parse_type_attr(val.option.rules.choices);
            console.log(val.rules);
            for (const v of val.rules) {
              v.id = 'l>' + v.id;
            }
            val.option.rules.choices = parse_config_attr(val.option.rules.choices);
            // console.log(val.rules);
          }
        } else if (val.option.type == 'range') {
          if (!think.isEmpty(val.option.rules)) {
            const searchtxt = JSON.parse(val.option.rules).searchtxt;
            const searcharr = [];
            if (!think.isEmpty(searchtxt)) {
              const arr = searchtxt.split(',');
              const len = arr.length;
              for (var i = 0; i < len; i++) {
                const obj = {};
                if (!think.isEmpty(arr[i - 1])) {
                  if (i == 1) {
                    obj.id = 'd>' + arr[i];
                    obj.name = '低于' + arr[i] + val.option.unit;
                    obj.pid = 0;
                    searcharr.push(obj);
                  } else {
                    obj.id = arr[i - 1] + '>' + arr[i];
                    obj.name = arr[i - 1] + '-' + arr[i] + val.option.unit;
                    obj.pid = 0;
                    searcharr.push(obj);
                  }
                }
              }
              searcharr.push({
                id: 'u>' + arr[len - 1],
                name: '高于' + arr[len - 1] + val.option.unit,
                pid: 0
              });
            }
            // console.log(searcharr);
            val.option.rules = JSON.parse(val.option.rules);
            val.rules = searcharr;
            // val.option.rules.choices = parse_config_attr(val.option.rules.choices);
          }
        }
      }
      // console.log(typevar);
      this.assign('typevar', typevar);
    }
    // console.log(sort);
    this.assign('sort', sort);
    this.assign('sortid', sortid);
  }

  // 分类信息条件
  /**
   * 分类信息条件
   * this.mapsort(map)
   * @param map
   */
  mapsort(map) {
    let nsobj = {};
    if (!think.isEmpty(this.get('sortval'))) {
      const sortval = this.get('sortval').split('|');
      nsobj = {};
      for (const v of sortval) {
        const qarr = v.split('_');
        nsobj[qarr[0]] = qarr[1];
        if (qarr[1] != 0) {
          const vv = qarr[1].split('>');
          // console.log(vv);
          if (vv[0] == 'd' && !think.isEmpty(vv[1])) {
            map['t.' + qarr[0]] = ['<', vv[1]];
          } else if (vv[0] == 'u' && !think.isEmpty(vv[1])) {
            map['t.' + qarr[0]] = ['>', vv[1]];
          } else if (vv[0] == 'l' && !think.isEmpty(vv[1])) {
            map['t.' + qarr[0]] = ['like', `%"${vv[1]}"%`];
          } else if (!think.isEmpty(vv[0]) && !think.isEmpty(vv[1])) {
            map['t.' + qarr[0]] = ['BETWEEN', Number(vv[0]), Number(vv[1])];
          } else {
            map['t.' + qarr[0]] = qarr[1];
          }
        }
      }
    }
    this.assign('nsobj', nsobj);
  }

  /**
   * 分组
   * await this.groups()
   * @param cate_id
   * @returns {Promise.<void>}
   */
  async groups(cate_id = this.get('cate_id'), group_id) {
    if (think.isEmpty(group_id)) {
      group_id = this.get('group_id') || 0;
    }
    // 获取分组
    let groups = await this.model('cmswing/category').get_category(cate_id, 'groups');
    if (groups) {
      groups = parse_config_attr(groups);
    }
    this.assign('groups', groups);
    this.assign('group_id', group_id);
  }

  /**
   * 获取面包屑信息
   * await this.breadcrumb()
   * @param cate_id
   * @returns {Promise.<void>}
   */
  async breadcrumb(cate_id = this.get('cate_id')) {
    // 获取面包屑信息
    const nav = await this.model('cmswing/category').get_parent_category(cate_id);
    this.assign('breadcrumb', nav);
  }
};
