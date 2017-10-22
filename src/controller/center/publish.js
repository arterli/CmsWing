// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------
module.exports = class extends think.cmswing.center {
  async __before() {
    await super.__before();
    // 判断是否登陆
    // await this.weblogin();
    if (!this.is_login) {
      // 判断浏览客户端
      if (this.isMobile) {
        // 手机端直接跳转到登录页面
        return this.redirect('/center/public/login');
      } else {
        return this.redirect('/cmswing/error/login');
      }
    }
  }
  /**
   * index action
   * @return {Promise} []
   */
  // 在线投稿
  async indexAction() {
    // await this.weblogin();

    let cate_id = this.get('cate_id') || null;
    // console.log(cate_id);
    // 权限控制
    const priv = await this.priv(cate_id);
    console.log(priv);
    if (priv) {
      const error = this.controller('cmswing/error');
      return error.noAction('网站禁止投稿！');
    }

    // let [model_id=null,position=null,group_id=null,sortid=null,sortval=null]=[this.get('model_id'),this.get('position'),this.get('group_id'),this.get('sortid'),this.get('sortval')];

    let model_id = this.get('model_id') || null;
    const position = this.get('position') || null;
    const group_id = this.get('group_id') || 0;
    let sortid = this.get('sortid') || 0;
    const sortval = this.get('sortval') || null;
    let models, groups, model, _model;
    // let groups;
    // let model;
    // let _model;
    if (!think.isEmpty(cate_id)) {
      // 获取分类信息
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
                searcharr.push({id: 'u>' + arr[len - 1], name: '高于' + arr[len - 1] + val.option.unit, pid: 0});
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
      const pid = this.get('pid') || 0;
      // 获取列表绑定的模型
      if (pid == 0) {
        models = await this.model('cmswing/category').get_category(cate_id, 'model');
        // 获取分组定义
        groups = await this.model('cmswing/category').get_category(cate_id, 'groups');
        if (groups) {
          groups = parse_config_attr(groups);
        }
      } else { // 子文档列表
        models = await this.model('cmswing/category').get_category(cate_id, 'model_sub');
      }
      // 获取面包屑信息
      const nav = await this.model('cmswing/category').get_parent_category(cate_id || 0);
      this.assign('breadcrumb', nav);
      if (think.isEmpty(model_id) && !think.isNumberString(models)) {
        // 绑定多个模型 取基础模型的列表定义
        model = await this.model('model').where({name: 'document'}).find();
        // console.log(model);
      } else {
        model_id = model_id || models;
        // 获取模型信息
        model = await this.model('model').where({id: ['IN', [model_id]]}).find();

        if (think.isEmpty(model['list_grid'])) {
          const data = await this.model('model').field('list_grid').where({name: 'document'}).find();
          model.list_grid = data.list_grid;
          // console.log(33);
        }
      }
      this.assign('model', models.split(','));
      _model = models.split(',');
    } else { // 子文档列表
      // 获取模型信息
      model = await this.model('model').where({name: 'document'}).find();
      model_id = null;
      cate_id = 0;
      this.assign('model', null);
      _model = null;
    }
    // 解析列表规则
    let fields = [];
    const ngrids = [];
    // console.log(model);
    const grids = model.list_grid.split('\r\n');
    for (let value of grids) {
      // 字段:标题:链接
      const val = value.split(':');
      // 支持多个字段显示
      const field = val[0].split(',');
      value = {field: field, title: val[1]};

      if (!think.isEmpty(val[2])) {
        value.href = val[2];
      }
      // console.log(222);
      if (val[1]) {
        if (val[1].indexOf('|') > -1) {
          // 显示格式定义
          [values.title, values.format] = val[1].split('|');
        }
      }
      // console.log(field);
      for (const val of field) {
        const array = val.split('|');
        fields.push(array[0]);
      }
      ngrids.push(value);
    }
    // 文档模型列表始终要获取的数据字段 用于其他用途
    fields.push('category_id');
    fields.push('model_id');
    fields.push('pid');
    // 过滤重复字段
    fields = unique(fields);
    // console.log(fields);
    // console.log(model_id);
    let list = await this.getDocumentList(cate_id, model_id, position, fields, group_id, sortval, sortid);
    for (const val of list) {
      if (val.pics) {
        // val.pics = await get_pics_one(val.pics,"path");
        val.pics = await get_pic(val.pics.split(',')[0], 1, 100);
      } else {
        val.pics = '/static/noimg.jpg';
      }
    }
    // console.log(list);
    list = await this.parseDocumentList(list, model_id);
    // 获取模型信息
    let modellist = [];
    // console.log(111111111)
    if (think.isEmpty(_model)) {
      modellist = null;
    } else {
      for (const val of _model) {
        const modelobj = {};
        modelobj.id = val;
        modelobj.title = await this.model('cmswing/model').get_document_model(val, 'title');
        modellist.push(modelobj);
      }
    }
    this.meta_title = '在线投稿';
    this.assign('modellist', modellist);
    this.assign('cate_id', cate_id);
    this.assign('model_id', model_id);
    this.assign('group_id', group_id);
    this.assign('sortid', sortid);
    this.assign('position', position);
    this.assign('groups', groups);
    this.assign('list', list);
    this.assign('list_grids', ngrids);
    this.assign('model_list', model);
    return this.display();
  }
  /**
   * 新增投稿
   */
  async addAction() {
    const cate_id = this.get('cate_id') || 0;
    // 权限控制
    const priv = await this.priv(cate_id);
    if (priv) {
      const error = this.controller('cmswing/error');
      return error.noAction('您所在的会员组,禁止在本栏目投稿！');
    }
    const model_id = this.get('model_id') || 0;
    const group_id = this.get('group_id') || '';
    let sortid = this.get('sortid') || 0;
    think.isEmpty(cate_id) && this.fail('参数不能为空');
    think.isEmpty(model_id) && this.fail('该分类未绑定模型');
    // 获取分组定义
    let groups = await this.model('cmswing/category').get_category(cate_id, 'groups');
    if (groups) {
      groups = parse_config_attr(groups);
    }
    // 获取分类信息
    let sort = await this.model('cmswing/category').get_category(cate_id, 'documentsorts');
    if (sort) {
      sort = JSON.parse(sort);
      if (sortid == 0) {
        sortid = sort.defaultshow;
      }
      const typevar = await this.model('typevar').where({sortid: sortid}).select();
      for (const val of typevar) {
        val.option = await this.model('typeoption').where({optionid: val.optionid}).find();
        if (val.option.type == 'select') {
          if (!think.isEmpty(val.option.rules)) {
            val.option.rules = JSON.parse(val.option.rules);
            val.rules = parse_type_attr(val.option.rules.choices);
            val.option.rules.choices = parse_config_attr(val.option.rules.choices);
          }
        } else if (val.option.type == 'radio' || val.option.type == 'checkbox') {
          if (!think.isEmpty(val.option.rules)) {
            val.option.rules = JSON.parse(val.option.rules);
            val.option.rules.choices = parse_config_attr(val.option.rules.choices);
          }
        } else {
          if (!think.isEmpty(val.option.rules)) {
            val.option.rules = JSON.parse(val.option.rules);
          }
        }
      }
      // console.log(typevar);
      this.assign('typevar', typevar);
    }
    // console.log(sort);
    this.assign('sort', sort);
    // 检查该分类是否允许发布
    const allow_publish = await this.model('cmswing/category').check_category(cate_id);
    // console.log(allow_publish);
    if (!allow_publish) {
      const error = this.controller('cmswing/error');
      return error.noAction('本栏目不允许发布内容！');
    }
    // 获取当先的模型信息
    const model = await this.model('cmswing/model').get_document_model(model_id);

    // 处理结果
    const info = {};
    info.pid = this.get('pid') ? this.get('pid') : 0;
    info.model_id = model_id;
    info.category_id = cate_id;
    info.group_id = group_id;

    if (info.pid) {
      const article = await this.model('document').field('id,title,type').find(info.pid);
      this.assign('article', article);
    }
    // 获取表单字段排序
    const fields = await this.model('cmswing/attribute').get_model_attribute(model.id, true);
    // think.log(fields);
    // 获取当前分类文档的类型
    const type_list = await this.model('cmswing/category').get_type_bycate(cate_id);
    // console.log(type_list);
    // 获取面包屑信息
    const nav = await this.model('cmswing/category').get_parent_category(cate_id);
    // console.log(model);
    this.assign('groups', groups);
    this.assign('breadcrumb', nav);
    this.assign('info', info);
    this.assign('fields', fields);
    this.assign('type_list', type_list);
    this.assign('model', model);
    this.meta_title = '新增' + model.title;
    this.active = 'admin/article/index';
    for (const key in parse_config_attr(model.field_group)) {
      for (const f of fields[key]) {
        if (f.type === 'editor') {
          // 添加编辑器钩子
          if (model.editor === '0') {
            await this.hook('homeEdit', f.name, f.value, {$hook_key: f.name});
          } else {
            await this.hook('homeEdit', f.name, f.value, {$hook_key: f.name, $hook_type: model.editor});
          }
        } else if (f.type === 'picture') {
          await this.hook('homeUpPic', f.name, 0, {$hook_key: f.name});
        } else if (f.type === 'pics') {
          await this.hook('homeUpPics', f.name, '', {$hook_key: f.name});
        } else if (f.type === 'file') {
          await this.hook('homeUpFile', f.name, 0, {$hook_key: f.name});
        };
      };
    };
    return this.display();
  }

  // 编辑文档
  async editAction() {
    const id = this.get('id') || '';
    const sortid = this.get('sortid') || 0;
    if (think.isEmpty(id)) {
      return this.fail('参数不能为空');
    }
    // 获取详细数据；
    const document = this.model('cmswing/document');
    const data = await document.details(id);
    // 安全验证
    if (data.uid != this.user.uid) {
      this.http.error = new Error('只能编辑自己的稿件哦(*^_^*)!');
      return think.statusAction(702, this.http);
    }
    // let model =  this.model("cmswing/model").getmodel(2);
    if (data.pid != 0) {
      // 获取上级文档
      const article = document.field('id,title,type').find(data.pid);
      this.assign('article', article);
    }
    const model = await this.model('cmswing/model').get_document_model(data.model_id);

    // 获取分组定义
    let groups = await this.model('cmswing/category').get_category(data.category_id, 'groups');
    if (groups) {
      groups = parse_config_attr(groups);
    }
    this.assign('groups', groups);
    // 获取分类信息
    let sort = await this.model('cmswing/category').get_category(data.category_id, 'documentsorts');
    if (sort) {
      sort = JSON.parse(sort);
      if (sortid != 0) {
        data.sort_id = sortid;
      } else if (data.sort_id == 0) {
        data.sort_id = sort.defaultshow;
      }
      const typevar = await this.model('typevar').where({sortid: data.sort_id}).select();
      for (const val of typevar) {
        val.option = await this.model('typeoption').where({optionid: val.optionid}).find();
        if (val.option.type == 'select') {
          if (!think.isEmpty(val.option.rules)) {
            val.option.rules = JSON.parse(val.option.rules);
            val.option.rules.choices = parse_config_attr(val.option.rules.choices);
            val.option.value = await this.model('typeoptionvar').where({sortid: data.sort_id, tid: data.id, fid: data.category_id, optionid: val.option.optionid}).getField('value', true) || '';
          }
        } else if (val.option.type == 'radio' || val.option.type == 'checkbox') {
          if (!think.isEmpty(val.option.rules)) {
            val.option.rules = JSON.parse(val.option.rules);
            val.option.rules.choices = parse_config_attr(val.option.rules.choices);
            val.option.value = await this.model('typeoptionvar').where({sortid: data.sort_id, tid: data.id, fid: data.category_id, optionid: val.option.optionid}).getField('value', true) || '';
          }
        } else {
          if (!think.isEmpty(val.option.rules)) {
            val.option.rules = JSON.parse(val.option.rules);
            val.option.value = await this.model('typeoptionvar').where({sortid: data.sort_id, tid: data.id, fid: data.category_id, optionid: val.option.optionid}).getField('value', true) || '';
          }
        }
      }
      // console.log(typevar);
      this.assign('typevar', typevar);
    }
    // console.log(sort);
    this.assign('sort', sort);
    // 获取表单字段排序
    const fields = await this.model('cmswing/attribute').get_model_attribute(model.id, true);
    this.assign('fields', fields);
    // 获取当前分类文档的类型
    const type_list = await this.model('cmswing/category').get_type_bycate(data.category_id);
    // 获取suk tags
    const tags = await this.model('tags').where({model_id: data.model_id}).select();
    this.assign('tags', tags);
    // 获取面包屑信息
    const nav = await this.model('cmswing/category').get_parent_category(data.category_id);
    // console.log(model);
    this.assign('breadcrumb', nav);
    // console.log(model);
    this.assign('type_list', type_list);
    this.meta_title = '编辑' + model.title;
    this.active = 'admin/article/index';
    this.assign({
      'navxs': true
    });
    // console.log(data);
    this.assign('data', data);
    this.assign('model_id', data.model_id);
    this.assign('model', model);
    const editor = !think.isEmpty(data.editor) ? data.editor : await this.model('cmswing/model').get_model(data.model_id, 'editor');
      for (const key in parse_config_attr(model.field_group)) {
      for (const f of fields[key]) {
        if (f.type === 'editor') {
          // 添加编辑器钩子
          if (editor === '0') {
            await this.hook('homeEdit', f.name, data[f.name], {$hook_key: f.name});
          } else {
            await this.hook('homeEdit', f.name, data[f.name], {$hook_key: f.name, $hook_type: editor});
          }
        } else if (f.type === 'picture') {
          await this.hook('homeUpPic', f.name, data[f.name], {$hook_key: f.name});
        } else if (f.type === 'pics') {
          await this.hook('homeUpPics', f.name, data[f.name], {$hook_key: f.name});
        } else if (f.type === 'file') {
          await this.hook('homeUpFile', f.name, data[f.name], {$hook_key: f.name});
        };
      };
    };
    this.assign('editor', editor);
    return this.display();
  }
  /**
   * 更新或者添加数据
   */
  async updateAction() {
    const data = this.post();
    // 绑定发布者id
    data.uid = this.user.uid;
    // 安全验证
    if (data.is_ajax != 'true') {
      return this.fail('非法提交！');
    }
    // 验证权限
    if (think.isEmpty(data.id)) { // 发布
      data.uid = this.user.uid;
      data.ip = this.ip;
      // 检查本栏目发布是否需要审核
      const roleid = await this.model('member').where({id: this.is_login}).getField('groupid', true);
      const addexa = await this.model('cmswing/category_priv').priv(data.category_id, roleid, 'addexa');
      if (addexa) {
        const addp = await this.model('cmswing/approval').adds(data.model_id, this.user.uid, data.title, data);
        if (addp) {
          return this.success({name: '发布成功, 请等待管理员审核...', url: '/center/publish/index/?cate_id=' + data.category_id});
        } else {
          return this.fail('操作失败！');
        }
      }
    } else { // 修改
      data.uid = this.user.uid;
      data.ip = this.ip;
      // 检查本栏目编辑是否需要审核
      const roleid = await this.model('member').where({id: this.is_login}).getField('groupid', true);
      const addexa = await this.model('cmswing/category_priv').priv(data.category_id, roleid, 'editexa');
      if (addexa) {
        const addp = await this.model('cmswing/approval').adds(data.model_id, this.user.uid, data.title, data);
        if (addp) {
          return this.success({name: '编辑成功, 请等待管理员审核...', url: '/center/publish/index/?cate_id=' + data.category_id});
        } else {
          return this.fail('操作失败！');
        }
      }
    }
    // console.log(data);
    // return false;
    const res = await this.model('cmswing/document').updates(data);
    // let res ={ data:
    // { name: '',
    //     title: '1111',
    //     description: '',
    //     type: '2',
    //     cover_id: '',
    //     file: '',
    //     link_id: '0',
    //     display: '1',
    //     deadline: '',
    //     view: '0',
    //     comment: '0',
    //     level: '0',
    //     create_time: 1470888723186,
    //     template: '',
    //     bookmark: '0',
    //     id: null,
    //     pid: '0',
    //     model_id: '2',
    //     category_id: '39',
    //     uid: 2,
    //     is_ajax: 'true',
    //     update_time: 1470888723186,
    //     status: 1 },
    //     id: 248 }
    // console.log(res);
    if (res) {
      // 行为记录
      if (!res.data.id) {
        // await this.model("action").log("add_document", "document", res.id, this.user.uid, this.ip(), this.http.url);//添加行为日志
        return this.success({name: '添加成功', url: '/center/publish/index/?cate_id=' + res.data.category_id});
      } else {
        return this.success({name: '更新成功', url: '/center/publish/index/?cate_id=' + res.data.category_id});
      }
    } else {
      return this.fail('操作失败！');
    }
  }

  /**
   * 默认文档列表方法
   * @param integer $cate_id 分类id
   * @param integer $model_id 模型id
   * @param integer $position 推荐标志
   * @param mixed $field 字段列表
   * @param integer $group_id 分组id
   */
  async getDocumentList(cate_id, model_id, position, field, group_id, sortval, sortid) {
    // console.log(2222222);
    /* 查询条件初始化 */
    cate_id = cate_id || 0, field = field || true;
    const map = {};
    // 获取当前用户的信息
    map.uid = this.user.uid;
    let status;
    if (!think.isEmpty(this.get('title'))) {
      map.title = ['like', '%' + this.param('title') + '%'];
    }
    if (!think.isEmpty(this.get('status'))) {
      map.status = this.param('status');
      status = map.status;
    } else {
      status = null;
      map.status = ['IN', '0,1,2'];
    }
    if (!think.isEmpty(this.get('time-start'))) {
      map.update_time = {'>=': new Date(this.param('time-start').valueOf())};
    }
    if (!think.isEmpty(this.get('time-end'))) {
      map.update_time = {'<=': 24 * 60 * 60 + new Date(this.param('time-end').valueOf())};
    }
    if (!think.isEmpty(this.get('nickname'))) {
      map.uid = await this.model('member').where({'nickname': this.param('nickname')}).getField('uid');
    }

    // 构建列表数据
    const Document = this.model('cmswing/document');

    if (cate_id) {
      // 获取当前分类的所有子栏目
      const subcate = await this.model('cmswing/category').get_sub_category(cate_id);
      // console.log(subcate);
      subcate.push(cate_id);
      map.category_id = ['IN', subcate];
    }
    // console.log(map);
    map.pid = this.para('pid') || 0;
    // console.log(map.pid);
    if (map.pid != 0) { // 子文档列表忽略分类
      delete map.category_id;
    }

    // console.log(array_diff(tablefields,field));
    if (!think.isEmpty(model_id)) {
      map.model_id = model_id;
      await Document.select();
      const tablefields = Object.keys(await Document.getSchema());
      // console.log(array_diff(tablefields,field));
      // console.log(field);
      // return
      if (think.isArray(field) && array_diff(tablefields, field)) {
        const modelName = await this.model('model').where({id: model_id}).getField('name');
        // console.log('__DOCUMENT_'+modelName[0].toUpperCase()+'__ '+modelName[0]+' ON DOCUMENT.id='+modelName[0]+'.id');
        // let sql = Document.parseSql(sql)
        // console.log(`${this.config('db.prefix')}document_${modelName[0]} ${modelName[0]} ON DOCUMENT.id=${modelName[0]}.id`);
        // return
        // Document.join('__DOCUMENT_'+modelName[0].toUpperCase()+'__ '+modelName[0]+' ON DOCUMENT.id='+modelName[0]+'.id');
        // Document.alias('DOCUMENT').join(`${this.config('db.prefix')}document_${modelName[0]} ${modelName[0]} ON DOCUMENT.id=${modelName[0]}.id`);
        // console.log(3333333333);
        Document.alias('DOCUMENT').join({
          table: `document_${modelName[0]}`,
          join: 'inner',
          as: modelName[0],
          on: ['id', 'id']
        });
        const key = array_search(field, 'id');
        // console.log(key)
        if (key !== false) {
          delete field[key];
          field[key] = 'DOCUMENT.id';
        }
      }
    }
    // console.log(field);
    // console.log(1111111);
    if (!think.isEmpty(position)) {
      map['position'] = position;
    }
    if (!think.isEmpty(group_id)) {
      map['group_id'] = group_id;
    }
    if (!think.isEmpty(sortid)) {
      map.sort_id = ['IN', [sortid, 0]];
    }
    let nsobj = {};
    if (!think.isEmpty(sortval)) {
      sortval = decodeURI(sortval).split('|');
      nsobj = {};
      const optionidarr = [];
      const valuearr = [];
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
      map.fid = cate_id;
      // where.optionid = ["IN",optionidarr];
      // where['value'] = ["IN",valuearr];
      // let type= await this.model("typeoptionvar").where(where).select();
      //  console.log(type);
      // console.log(map);
    }
    // console.log(map);
    let list;
    if (!think.isEmpty(sortval)) {
      list = await Document.alias('DOCUMENT').join({
        table: 'type_optionvalue' + sortid,
        join: 'left', // 有 left,right,inner 3 个值
        as: 't',
        on: ['id', 'tid']

      }).where(map).order('level DESC,DOCUMENT.id DESC').field(field.join(',')).page(this.get('page'), 20).countSelect();
    } else {
      list = await Document.alias('DOCUMENT').where(map).order('level DESC,DOCUMENT.id DESC').field(field.join(',')).page(this.get('page'), 20).countSelect();
    }
    // let list=await this.model('document').where(map).order('level DESC').field(field.join(",")).page(this.get("page")).countSelect();
    const page = this.pagination(list);
    if (map['pid'] != 0) {
      // 获取上级文档
      const article = await Document.field('id,title,type').find(map['pid']);
      this.assign('article', article);
      // console.log(article);
    }

    // 检查该分类是否允许发布内容
    const allow_publish = await this.model('cmswing/category').get_category(cate_id, 'allow_publish');
    this.assign('nsobj', nsobj);
    this.assign('_total', list.count);// 该分类下的文档总数
    this.assign('pagerData', page); // 分页展示使用
    this.assign('status', status);
    this.assign('allow', allow_publish);
    this.assign('pid', map.pid);
    // console.log(list.data);
    this.meta_title = '文档列表';
    return list.data;
  }
  // 权限验证
  async priv(cate_id) {
    const cate = cate_id || await this.model('cmswing/category').get_all_category({mold: 0});
    const roleid = await this.model('member').where({id: this.user.uid}).getField('groupid', true);
    let cates = [];
    if (cate_id) {
      const priv = await this.model('cmswing/category_priv').priv(cate_id, roleid, 'add', 0, false);
      if (priv == 1) {
        cates.push(priv);
      }
    } else {
      // let priv = await this.model("category_priv").where({catid:39,is_admin:0,roleid:2,action:'add'}).select();
      // console.log(priv);
      // 前台投稿分类
      // TODO 权限控制(管理员)
      const parr = [];
      for (const val of cate) {
        const priv = await this.model('cmswing/category_priv').priv(val.id, roleid, 'add', 0, false);
        val.priv = priv;
        if (priv == 1) {
          parr.push(val.pid);
        }
      }
      cates = parr;
      // if (think.isEmpty(parr)) {
      //   cates = parr;
      // } else {
      //   for (const val of cate) {
      //     if (in_array(val.id, parr)) {
      //       val.priv = 1;
      //     }
      //   }
      //
      //   for (const val of cate) {
      //     if (val.priv == 1) {
      //       cates.push(val);
      //     }
      //   }
      // }
    }
    console.log(cates);
    return think.isEmpty(cates);
  }

  /**
     * 待审稿件
     * @returns {Promise.<void>}
     */
  async approvalAction() {
    const map = {};
    map.uid = this.user.uid;
    if (!think.isEmpty(this.get('model'))) {
      map.model = this.get('model');
    }
    const list = await this.model('approval').where(map).page(this.get('page'), 20).order('time DESC').countSelect();
    const page = this.pagination(list);
    this.assign('pagerData', page); // 分页展示使用
    this.assign('list', list);
    const modlist = await this.model('cmswing/model').get_model(null, null, {is_approval: 1});
    for (const val of modlist) {
      val.count = await this.model('approval').where({model: val.id}).count();
    }
    // console.log(modlist);
    this.assign('model', modlist);
    this.assign('count', await this.model('approval').where({uid: this.user.uid}).count());
    this.meta_title = '待审稿件';
    return this.display();
  }
  /**
     * 查看待审稿件详情
     */
  async approvaldetailsAction() {
    const id = this.get('id');
    const details = await this.model('approval').where({uid: this.user.uid}).find(id);
    const info = JSON.parse(details.data);
    this.assign('info', info);
    this.meta_title = '查看详情';
    return this.display();
  }

  /**
     * 删除撤销审核
     *
     */
  async approvaldelAction() {
    const id = this.get('id');
    const res = await this.model('approval').where({uid: this.user.uid, id: id}).delete();
    if (res) {
      return this.success({name: '删除成功!'});
    } else {
      return this.fail('操作失败!');
    }
  }
  /**
   * 显示左边菜单，进行权限控制
   * @author
   */

  async getmenuAction() {
    const cate = await this.model('cmswing/category').get_all_category({mold: 0});
    const roleid = await this.model('member').where({id: this.user.uid}).getField('groupid', true);
    // console.log(roleid);
    // let priv = await this.model("category_priv").where({catid:39,is_admin:0,roleid:2,action:'add'}).select();
    // console.log(priv);
    // 前台投稿分类
    // TODO 权限控制(管理员)
    const parr = [];
    for (const val of cate) {
      val.url = `/center/publish/index/?cate_id=${val.id}`;
      val.target = '_self';
      delete val.icon;
      const priv = await this.model('cmswing/category_priv').priv(val.id, roleid, 'add', 0, false);
      val.priv = priv;
      if (priv == 1 && val.pid != 0) {
        parr.push(val.pid);
      }
    }
    const cates = [];
    if (think.isEmpty(parr)) {
      for (const val of cate) {
        if (val.priv == 1) {
          cates.push(val);
        }
      }
    } else {
      for (const val of cate) {
        if (in_array(val.id, parr)) {
          val.priv = 1;
        }
      }

      for (const val of cate) {
        if (val.priv == 1) {
          cates.push(val);
        }
      }
    }

    // console.log(cates);
    // think.log(cate);
    return this.json(arr_to_tree(cates, 0));
  }
  // ajax添加tags
  async ajaxaddtagsAction() {
    const data = this.post();
    data.model_id = Number(data.model_id);
    const model = this.model('tags');
    const res = await model.where({name: data.name}).thenAdd(data);
    if (res.type == 'exist') {
      await model.where({id: res.id}).increment('num');
      return this.fail('已经存在，不要重复添加，请直接选择！');
    }
    const rdata = {
      errno: 0,
      id: res.id,
      name: data.name
    };
    return this.json(rdata);
  }
  async ajaxgettagsAction() {
    const map = this.get();
    const model = this.model('tags');
    const res = await model.where(map).select();
    return this.json(res);
  }
  // 删除投稿/软删除
  async setstatusAction() {
    const res = await this.model('document').where({id: this.get('ids')}).update({ 'status': -1 });
    if (res) {
      return this.success({name: '删除成功!'});
    } else {
      return this.fail('操作失败!');
    }
  }
};
