/* eslint-disable no-undef */
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
    this.tactive = 'article';
  }

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let cate_id = this.get('cate_id') || null;
    let model_id = this.get('model_id') || null;
    const position = this.get('position') || null;
    const group_id = this.get('group_id') || 0;
    let sortid = this.get('sortid') || 0;
    const sortval = this.get('sortval') || null;
    let models;
    let groups;
    let model;
    let _model;
    // console.log(2222);
    // console.log(cate_id);
    if (!think.isEmpty(cate_id)) {
      // 权限验证
      await this.admin_priv('init', cate_id, '您没有权限查看本栏目！');
      // 获取分类信息
      let sort = await this.model('cmswing/category').get_category(cate_id, 'documentsorts');
      if (sort) {
        sort = JSON.parse(sort);
        if (Number(sortid) === 0) {
          sortid = sort.defaultshow;
        }
        const typevar = await this.model('typevar').where({sortid: sortid}).select();
        for (const val of typevar) {
          val.option = await this.model('typeoption').where({optionid: val.optionid}).find();
          if (val.option.type === 'select' || val.option.type === 'radio') {
            if (!think.isEmpty(val.option.rules)) {
              val.option.rules = JSON.parse(val.option.rules);
              val.rules = parse_type_attr(val.option.rules.choices);
              val.option.rules.choices = parse_config_attr(val.option.rules.choices);
            }
          } else if (val.option.type === 'checkbox') {
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
          } else if (val.option.type === 'range') {
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
      // console.log(models);
      // console.log(!think.isNumberString(models));
      // console.log(think.isEmpty(model_id));
      if (think.isEmpty(model_id) && !think.isNumberString(models)) {
        // 绑定多个模型 取基础模型的列表定义
        model = await this.model('model').where({name: 'document'}).find();
        // console.log(model);
      } else {
        model_id = model_id || models;
        // 获取模型信息
        model = await this.model('model').where({id: ['IN', [model_id]]}).find();
        ;

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
    // console.log(list);
    // 获取面包屑信息
    const nav = await this.model('cmswing/category').get_parent_category(cate_id);
    this.assign('breadcrumb', nav);
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
    // console.log(this.setup.DOCUMENT_POSITION)
    // console.log(groups);
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
    this.meta_title = '内容管理';
    this.assign({
      'navxs': true
    });
    return this.display();
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
    let status;
    if (!think.isEmpty(this.get('title'))) {
      map.title = ['like', '%' + this.ctx.param('title') + '%'];
    }
    if (!think.isEmpty(this.get('status'))) {
      map.status = this.param('status');
      status = map.status;
    } else {
      status = null;
      map.status = ['IN', '0,1,2'];
    }
    if (!think.isEmpty(this.get('time-start'))) {
      map.update_time = {'>=': new Date(this.ctx.param('time-start').valueOf())};
    }
    if (!think.isEmpty(this.get('time-end'))) {
      map.update_time = {'<=': 24 * 60 * 60 + new Date(this.ctx.param('time-end').valueOf())};
    }
    if (!think.isEmpty(this.get('nickname'))) {
      map.uid = await this.model('member').where({'nickname': this.ctx.param('nickname')}).getField('uid');
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
    map.pid = this.ctx.param('pid') || 0;
    // console.log(map.pid);
    if (map.pid != 0) { // 子文档列表忽略分类
      delete map.category_id;
    }

    if (!think.isEmpty(model_id)) {
      map.model_id = model_id;
      await Document.select();
      const tablefields = Object.keys(await Document.getSchema());
      const df = think._.difference(field, tablefields);
      // return
      if (think.isArray(field) && !think.isEmpty(df)) {
        const modelName = await this.model('model').where({id: model_id}).getField('name');
        Document.alias('DOCUMENT').join({
          table: `document_${modelName[0]}`,
          join: 'inner',
          as: modelName[0],
          on: ['id', 'id']
        });
        for (const d of df) {
          const key = think._.indexOf(field, d);
          if (key !== -1) {
            delete field[key];
            field[key] = `${modelName[0]}.${d}`;
          }
        }
        const key = think._.indexOf(field, 'id');
        if (key !== -1) {
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
    console.log(field);
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
    const html = this.pagination(list);
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
    this.assign('pagerData', html); // 分页展示使用
    this.assign('status', status);
    this.assign('allow', allow_publish);
    this.assign('pid', map.pid);
    // console.log(list.data);
    this.meta_title = '文档列表';
    return list.data;
  }

  /**
   * 显示左边菜单，进行权限控制
   * @author
   */

  async getmenuAction() {
    const cate = await this.model('cmswing/category').get_all_category();
    if (!this.is_admin) {
      const parr = [];
      // 后台分类
      for (const val of cate) {
        switch (val.mold) {
          case 1:
            val.url = `/admin/mod/${val.id}`;
            break;
          case 2:
            val.url = `/admin/sp/index?cate_id=${val.id}`;
            break;
          default:
            val.url = `/admin/article/index?cate_id=${val.id}`;
        }

        val.target = '_self';
        delete val.icon;
        const priv = await this.model('cmswing/category_priv').priv(val.id, this.roleid, 'init', 1);
        val.priv = priv;
        if (priv == 1 && val.pid != 0) {
          parr.push(val.pid);
        }
      }
      let cates = [];
      if (think.isEmpty(parr)) {
        cates = cate;
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

      // think.log(cate);
      return this.json(arr_to_tree(cates, 0));
    } else {
      for (const val of cate) {
        switch (val.mold) {
          case 1:
            val.url = `/admin/mod/${val.id}`;
            break;
          case 2:
            val.url = `/admin/sp/index?cate_id=${val.id}`;
            break;
          default:
            val.url = `/admin/article/index?cate_id=${val.id}`;
        }

        val.target = '_self';
        delete val.icon;
      }
      return this.json(arr_to_tree(cate, 0));
    }
  }

  /**
   * 新增文档
   */
  async addAction() {
    const cate_id = this.get('cate_id') || 0;
    const model_id = this.get('model_id') || 0;
    const group_id = this.get('group_id') || '';
    let sortid = this.get('sortid') || 0;
    // think.isEmpty(cate_id) && this.fail("参数不能为空");
    // think.isEmpty(model_id) && this.fail("该分类未绑定模型");
    // 权限验证
    await this.admin_priv('add', cate_id);

    // 获取分组定义
    let groups = await this.model('cmswing/category').get_category(cate_id, 'groups');
    if (groups) {
      groups = parse_config_attr(groups);
    }
    // console.log(groups);
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
    !allow_publish && this.fail('该分类不允许发布内容');

    // 获取当先的模型信息
    const model = await this.model('cmswing/model').get_document_model(model_id);

    // 处理结果
    const info = {};
    info.pid = this.get('pid') ? this.get('pid') : 0;
    info.model_id = model_id;
    info.category_id = cate_id;
    info.group_id = group_id;
    let topid = 0;
    if (info.pid != 0) {
      let i = info.pid;
      //
      while (i != 0) {
        const nav = await this.model('document').where({id: i}).find();
        if (nav.pid == 0) {
          topid = nav.id;
        }
        i = nav.pid;
      }
      const article = await this.model('document').field('id,title,type').find(info.pid);
      this.assign('article', article);
    }
    // console.log(topid);
    // this.assign("topid",topid);
    info.topid = topid;
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
    this.assign({
      'navxs': true
    });
    for (const key in parse_config_attr(model.field_group)) {
      for (const f of fields[key]) {
        if (f.type === 'editor') {
          // 添加编辑器钩子
          if (model.editor === '0') {
            await this.hook('adminEdit', f.name, f.value, {$hook_key: f.name});
          } else {
            await this.hook('adminEdit', f.name, f.value, {$hook_key: f.name, $hook_type: model.editor});
          }
        } else if (f.type === 'picture') {
          await this.hook('adminUpPic', f.name, 0, {$hook_key: f.name});
        } else if (f.type === 'pics') {
          await this.hook('adminUpPics', f.name, '', {$hook_key: f.name});
        } else if (f.type === 'file') {
          await this.hook('adminUpFile', f.name, 0, {$hook_key: f.name});
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
    // 权限验证
    await this.admin_priv('edit', data.category_id);
    // let model =  this.model("model").getmodel(2);
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
            val.option.value = await this.model('typeoptionvar').where({
              sortid: data.sort_id,
              tid: data.id,
              fid: data.category_id,
              optionid: val.option.optionid
            }).getField('value', true) || '';
          }
        } else if (val.option.type == 'radio' || val.option.type == 'checkbox') {
          if (!think.isEmpty(val.option.rules)) {
            val.option.rules = JSON.parse(val.option.rules);
            val.option.rules.choices = parse_config_attr(val.option.rules.choices);
            val.option.value = await this.model('typeoptionvar').where({
              sortid: data.sort_id,
              tid: data.id,
              fid: data.category_id,
              optionid: val.option.optionid
            }).getField('value', true) || '';
          }
        } else {
          if (!think.isEmpty(val.option.rules)) {
            val.option.rules = JSON.parse(val.option.rules);
            val.option.value = await this.model('typeoptionvar').where({
              sortid: data.sort_id,
              tid: data.id,
              fid: data.category_id,
              optionid: val.option.optionid
            }).getField('value', true) || '';
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
            await this.hook('adminEdit', f.name, data[f.name], {$hook_key: f.name});
          } else {
            await this.hook('adminEdit', f.name, data[f.name], {$hook_key: f.name, $hook_type: editor});
          }
        } else if (f.type === 'picture') {
          await this.hook('adminUpPic', f.name, data[f.name], {$hook_key: f.name});
        } else if (f.type === 'pics') {
          await this.hook('adminUpPics', f.name, data[f.name], {$hook_key: f.name});
        } else if (f.type === 'file') {
          await this.hook('adminUpFile', f.name, data[f.name], {$hook_key: f.name});
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
    // console.log(data);
    // return this.fail("dddd");
    const res = await this.model('cmswing/document').updates(data);

    if (res) {
      // 行为记录
      if (!res.data.id) {
        // await this.model("cmswing/action").log("add_document", "document", res.id, this.user.uid, this.ip(), this.http.url);
        this.success({name: '添加成功', url: data.backurl});
      } else {
        this.success({name: '更新成功', url: data.backurl});
      }
    } else {
      this.fail('操作失败！');
    }
  }

  /**
   * 设置一条或者多条数据的状态
   */
  async setstatusAction() {
    const ids = this.para('ids');
    if (think.isEmpty(ids)) {
      return this.fail('请选择要操作的数据');
    }
    const data = await this.model('document').where({id: ['IN', ids]}).select();
    switch (Number(this.para('status'))) {
      case -1:
        for (const v of data) {
          // 权限验证
          await this.admin_priv('delete', v.category_id);
        }
        break;
      case 1:
        for (const v of data) {
          // 权限验证
          await this.admin_priv('examine', v.category_id);
        }
        break;
      case 0:
        for (const v of data) {
          // 权限验证
          await this.admin_priv('disable', v.category_id);
        }
        break;
    }
    await super.setstatusAction('document');
    if (this.para('status') == -1 || this.para('status') == 0) {
      for (const v of data) {
        // 删除
        await this.model('cmswing/search').delsearch(v.model_id, v.id);
        if (!think.isEmpty(v.keyname)) {
          await this.model('cmswing/keyword').delkey(v.id, v.model_id);
        }
      }
    } else if (this.para('status') == 1) {
      for (const v of data) {
        // 添加到搜索
        await this.model('cmswing/search').addsearch(v.model_id, v.id, v);
        console.log(v.keyname);
        if (!think.isEmpty(v.keyname)) {
          await this.model('cmswing/keyword').addkey(v.keyname, v.id, v.uid, v.model_id, 0);
        }
      }
    }
  }

  /**
   * 回收站列表
   */
  async recycleAction() {
    const map = {status: -1};
    if (this.is_admin) {
      // TODO
    }

    const list = await this.model('document').where(map).order('update_time desc').field('id,title,uid,type,category_id,update_time').page(this.get('page') || 1, 20).countSelect();
    const html = this.pagination(list);
    for (const val of list.data) {
      val.category = await this.model('cmswing/category').get_category(val.category_id, 'title');
      val.username = await this.model('cmswing/member').get_nickname(val.uid);
    }

    this.assign('_total', list.count);
    this.assign('pagerData', html); // 分页展示使用
    this.assign('list', list.data);
    this.meta_title = '回收站';
    return this.display();
  }

  async clearAction() {
    // 获取回收站的所有信息
    const clist = await this.model('document').where({status: -1}).select();
    if (think.isEmpty(clist)) {
      return this.success({name: '回收站没有内容！'});
    }
    // console.log(clist);
    // 查出模型内容并删除
    for (const v of clist) {
      // 模型表
      const table = await this.model('cmswing/model').get_table_name(v.model_id);
      // console.log(table);
      await this.model(table).where({id: v.id}).delete();
    }
    // 删除主表内容
    const res = await this.model('document').delete({where: {status: -1}});

    if (res) {
      return this.success({name: '清空回收站成功'});
    }
  }
};
