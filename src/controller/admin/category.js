// +----------------------------------------------------------------------
// | CmsWing [ 网站内容管理框架 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2015-2115 http://www.cmswing.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: arterli <arterli@qq.com>
// +----------------------------------------------------------------------

const Base = require('../cmswing/admin');
module.exports = class extends Base {
  /**
     * index action
     * @return {Promise} []
     */

  constructor(ctx) {
    super(ctx); // 调用父级的 constructor 方法，并把 ctx 传递进去
    // 其他额外的操作
    this.db = this.model('cmswing/category');
    this.tactive = 'article';
  }
  async indexAction() {
    const where = {};
    if (this.get('mold')) {
      where.mold = this.get('mold');
    }
    // console.log(where);
    // auto render template file index_index.html
    const tree = await this.db.gettree(0, 'id,name,title,sort,pid,allow_publish,status,model,mold,isapp', where);
    // console.log(tree)
    this.assign('active', this.get('mold') || null);
    this.assign('list', tree);
    this.meta_title = '栏目管理';
    return this.display();
  }
  async gettreeAction() {
    const tree = await this.db.gettree(0, 'id,name,title,sort,pid,allow_publish,status');
    return this.json(tree);
  }

  /**
     * 添加栏目
     */
  async addAction() {
    if (this.isPost) {
      const data = this.post();
      if (data.mold != 2) {
        // 表单验证
        if (think.isEmpty(data.model)) {
          return this.fail('至少要绑定一个模型！');
        }
        if (data.mold == 0) {
          if (think.isEmpty(data.type)) {
            return this.fail('允许文档类型，至少要选项一个！');
          }
        }
      }

      // console.log(data);

      // return false;
      data.status = 1;
      // console.log(data);
      if (!think.isEmpty(data.name)) {
        const check = await this.model('category').where({name: data.name}).find();
        if (!think.isEmpty(check)) {
          return this.fail('同节点下,栏目标示不能重复');
        }
      }
      const res = await this.model('cmswing/category').updates(data);
      if (res) {
        this.success({name: '新增成功！', url: '/admin/category/index/mold/' + data.mold});
      } else {
        this.fail('更新失败！');
      }
    } else {
      const mold = this.get('mold');
      let sortid = await this.model('typevar').getField('sortid');
      let type;
      if (!think.isEmpty(sortid)) {
        sortid = unique(sortid);
        // console.log(sortid);
        // 获取分类信息
        type = await this.model('type').where({typeid: ['IN', sortid]}).order('displayorder ASC').select();
      }

      this.assign('typelist', type);
      // 获取模型信息；
      let model;
      if (mold == 0) {
        model = await this.model('model').get_model(null, null, {extend: 1});
      } else if (mold == 1) {
        model = await this.model('model').get_model(null, null, {extend: 0});
      }
      console.log(model);
      // console.log(obj_values(model));
      this.assign('models', model);

      // 获取运行的文档类型
      this.active = 'admin/category/index';
      this.action = '/admin/category/add';
      // 获取模版列表（pc）
      const temp_pc = await this.model('cmswing/temp').gettemp(1);
      console.log(temp_pc);
      this.assign('temp_pc', temp_pc);
      // 获取手机端模版
      const temp_m = await this.model('cmswing/temp').gettemp(2);
      console.log(temp_m);
      this.assign('temp_m', temp_m);
      // template_lists
      // 会员组

      const group = await this.model('member_group').order('sort ASC').select();
      this.assign('group', group);
      const role = await this.model('auth_role').order('sort ASC').select();
      this.assign('role', role);
      switch (Number(mold)) {
        case 0:
          this.meta_title = '添加栏目(系统模型)';
          break;
        case 1:
          this.meta_title = '添加栏目(独立模型)';
          break;
        case 2:
          this.meta_title = '添加栏目(单页面)';
          break;
        default:
          this.meta_title = '添加栏目';
      }

      return this.display();
    }
  }

  /** 编辑分类
     *
     */
  async editAction() {
    const category = this.model('category');
    if (this.isPost) {
      const data = this.post();
      data.status = 1;
      // console.log(data);
      // 检查同节点下分类标示是否重复
      if (!think.isEmpty(data.name)) {
        const check = await this.model('category').where({id: ['!=', data.id], name: data.name}).find();
        if (!think.isEmpty(check)) {
          return this.fail('同节点下,栏目标示不能重复');
        }
      }
      const res = await this.model('cmswing/category').updates(data);
      if (res) {
        this.success({name: '更新成功！', url: '/admin/category/index'});
      } else {
        this.fail('更新失败！');
      }
    } else {
      const id = this.get('cid');
      // console.log(id);
      // 获取分类信息
      const info = await category.find(id);
      this.assign('info', info);
      // console.log(info);
      if (!think.isEmpty(info.documentsorts)) {
        const types = JSON.parse(info.documentsorts);
        const typeobj = {};
        for (const val of types.types) {
          typeobj[val.enable] = val;
        }
        this.assign('typeobj', typeobj);
      }

      let sortid = await this.model('typevar').getField('sortid');
      let type;
      if (!think.isEmpty(sortid)) {
        sortid = unique(sortid);
        // console.log(sortid);
        // 获取分类信息
        type = await this.model('type').where({typeid: ['IN', sortid]}).order('displayorder ASC').select();
      }

      this.assign('typelist', type);
      // 获取模型信息；
      let model;
      if (info.mold == 0) {
        model = await this.model('cmswing/model').get_model(null, null, {extend: 1});
      } else if (info.mold == 1) {
        model = await this.model('cmswing/model').get_model(null, null, {extend: 0});
      }

      // console.log(obj_values(model));
      this.assign('models', model);
      if (info.mold == 1) {
        const mod = await this.model('cmswing/model').get_model(info.model);
        console.log(mod);
        this.assign('mod', mod);
      } else {
        this.assign('mod', {temp_show: 1,
          type_show: 1,
          priv_show: 1,
          groups_show: 1});
      }
      this.active = 'admin/category/index';
      this.action = '/admin/category/edit';
      this.meta_title = '编辑栏目';
      // 获取模版列表
      // 获取模版列表（pc）
      const temp_pc = await this.model('cmswing/temp').gettemp(1);
      // console.log(temp_pc);
      this.assign('temp_pc', temp_pc);
      // 获取手机端模版
      const temp_m = await this.model('cmswing/temp').gettemp(2);
      // console.log(temp_m);
      this.assign('temp_m', temp_m);
      // template_lists
      // 会员组
      const group = await this.model('member_group').order('sort ASC').select();
      this.assign('group', group);
      const role = await this.model('auth_role').order('sort ASC').select();
      this.assign('role', role);
      // 提取权限
      const priv = await this.model('category_priv').where({catid: id}).select();
      // console.log(priv);
      const priv_roleid = {};
      const priv_groupid = {};

      for (const v of priv) {
        if (v.is_admin == 1) {
          priv_roleid[v.roleid] = [];
        } else {
          priv_groupid[v.roleid] = [];
        }
      }
      for (const v in priv_groupid) {
        const arr = [];
        for (const m of priv) {
          if (v == m.roleid && m.is_admin == 0) {
            arr.push(m.action);
          }
        }
        priv_groupid[v] = arr;
      }
      for (const v in priv_roleid) {
        const arr = [];
        for (const m of priv) {
          if (v == m.roleid && m.is_admin == 1) {
            arr.push(m.action);
          }
        }
        priv_roleid[v] = arr;
      }
      // console.log(priv_groupid);
      // console.log(priv_roleid);
      this.assign('priv_groupid', priv_groupid);
      this.assign('priv_roleid', priv_roleid);
      return this.display();
    }
  }
  // 删除栏目
  async delAction() {
    const id = this.get('id');
    const confirm = this.get('confirm');
    const type = this.get('type');
    if (confirm == 1) {
      // 查询该栏目是否包含子栏目
      const pid = await this.model('cmswing/category').get_sub_category(id);
      // console.log(pid);

      const l = pid.length;
      if (l > 0) {
        return this.json({ok: 2, info: `该栏目含有${l}子栏目`});
      }
      const count = await this.model('document').where({category_id: id}).count('id');
      if (count == 0) {
        await this.model('category').delete({where: {id: id}});
        // 删除分类权限
        await this.model('category_priv').delete({where: {catid: id}});
        think.cache('sys_category_list', null);
        think.cache('all_category', null);
        return this.json({ok: 0, info: '删除成功!'});
      } else {
        return this.json({ok: 1, info: `该栏目含有${count}条内容`});
      }
    }
    if (type == 'one') {
      await this.delcate(id);
      return this.json({ok: 0, info: '删除成功!'});
    } else if (type == 'all') {
      const pid = await this.model('cmswing/category').get_sub_category(id);
      // console.log(pid);

      for (const v of pid) {
        await this.delcate(v);
      }
      await this.delcate(id);
      return this.json({ok: 0, info: '删除成功!'});
    }
    // await this.delcate(id);
    // console.log(ids);
  }
  async delcate(id) {
    // 查处要删除的该栏目内容的id
    const ids = await this.model('document').where({category_id: id}).getField('id');
    if (!think.isEmpty(ids)) {
      // 查出该栏目的管理的模型
      const model_id = await this.model('cmswing/category').get_category(id, 'model');
      for (const v of model_id.split(',')) {
        // 获取该模型的表明
        const table = await this.model('cmswing/model').get_table_name(v);
        // 删除模型内容
        await this.model(table).where({id: ['IN', ids]}).delete();
      }
    }
    // 删除分类信息
    const sort = await this.model('cmswing/category').get_category(id, 'documentsorts');
    if (!think.isEmpty(sort)) {
      await this.model('typeoptionvar').where({fid: id}).delete();
      if (!think.isEmpty(JSON.parse(sort).types)) {
        for (const v of JSON.parse(sort).types) {
          const table = `type_optionvalue${v.enable}`;
          await this.model(table).where({fid: id}).delete();
        }
      }
    }
    await this.model('category').delete({where: {id: id}});
    // 删除分类权限
    await this.model('category_priv').delete({where: {catid: id}});
    await this.model('document').delete({where: {category_id: id}});
    update_cache('category');// 更新栏目缓存
    // 查处要删除的该栏目内容的id
  }
  // 移动/合并栏目
  async moveAction() {
    if (this.isPost) {
      const data = this.post();
      console.log(data);
      // return false;
      // 检查要移动的栏目是否包含子栏目
      const pid = await this.model('cmswing/category').get_sub_category(data.source);
      // console.log(pid);
      const l = pid.length;
      if (l > 0) {
        return this.fail(`源栏目含有${l}个子栏目，前先删除或者移走子栏目，再进行操作！`);
      }
      // 检查源栏目是否 跟目标栏目重复
      if (data.source == data.target) {
        return this.fail('源栏目不能与目标栏目重复！');
      }
      if (data.target == 0) {
        return this.fail('请选择目标栏目！');
      }
      const source = await this.model('category').find(data.source);
      const target = await this.model('category').find(data.target);
      // 获取栏目模型信息
      console.log(target);
      let s_model_id = [];
      if (!think.isEmpty(source.model)) {
        s_model_id = source.model.split(',');
      }
      let t_model_id = [];
      if (!think.isEmpty(target.model)) {
        t_model_id = target.model.split(',');
      }
      const ntarget = target;
      // 检查源栏目与目标栏目的模型，如果相等，直接复制，如果不相等合并。
      if (!a2a(s_model_id, t_model_id)) {
        ntarget.model = unique(t_model_id.concat(s_model_id)).sort().join(',');
      };
      // console.log(2222222);
      if (!think.isEmpty(source.groups) && think.isEmpty(target.groups)) {
        ntarget.groups = source.groups;
      }
      if (!think.isEmpty(source.documentsorts) && think.isEmpty(target.documentsorts)) {
        ntarget.documentsorts = source.documentsorts;
      }
      if (!think.isEmpty(source.documentsorts) && !think.isEmpty(target.documentsorts)) {
        const a1 = JSON.parse(source.documentsorts);
        const a2 = JSON.parse(target.documentsorts);
        const o1 = {};
        for (const v of a1.types) {
          o1[v.enable] = v;
        }
        const o2 = {};
        for (const v of a2.types) {
          o2[v.enable] = v;
        }
        // console.log(o1);
        // console.log(o2);
        const o3 = think.extend(o1, o2);
        // console.log(o3);
        const na = [];
        for (const k in o3) {
          na.push(o3[k]);
        }
        a2.types = na;
        // console.log(na);
        ntarget.documentsorts = JSON.stringify(a2);
      }

      // 检查源栏目是否有分类信息和分组，如果有跳转到处理页面

      if (!think.isEmpty(source.groups) && source.groups != target.groups && !think.isEmpty(target.groups)) {
        // 如果源栏目和目标栏目都有分类信息和分组，并且不相等，跳转配置页面
        // 记录栏目信息
        await this.session('ntarget', ntarget);
        let url = `/admin/category/moveinfo/?source=${data.source}&target=${data.target}`;
        if (data.merge == 1) {
          url = `/admin/category/moveinfo/?merge=1&source=${data.source}&target=${data.target}`;
        }
        return this.success({'name': '源栏目与目标栏目存在不同的分组或者分类信息，转入处理页面。', 'url': url});
      } else {
        // console.log(ntarget);
        this.model('category').update(ntarget);// 复制栏目信息
        this.model('document').where({category_id: source.id}).update({category_id: ntarget.id});// 移动文章
        // 如果存在分类信息移动分类信息内容
        if (!think.isEmpty(source.documentsorts)) {
          const documentsorts = JSON.parse(source.documentsorts);
          if (!think.isEmpty(documentsorts.types)) {
            for (const v of documentsorts.types) {
              this.model('type_optionvalue' + v.enable).where({fid: source.id}).update({fid: ntarget.id});
              this.model('typeoptionvar').where({fid: source.id, sortid: v.enable}).update({fid: ntarget.id});
            }
          }
        }
        if (data.merge == 1) { // 如果合并删除源栏目
          await this.model('category').delete({where: {id: data.source}});
        }
        update_cache('category');// 更新栏目缓存
        return this.success({name: '成功！', url: '/admin/category/index'});
      }
    } else {
      const from = this.get('from');
      this.assign('from', from);
      this.active = 'admin/category/index';
      if (this.get('merge') == 1) {
        this.meta_title = '合并栏目';
      } else {
        this.meta_title = '移动栏目';
      }

      return this.display();
    }
  }
  async moveinfoAction() {
    if (this.isPost) {
      const data = this.post();
      console.log(data);
      // return false;
      const source = await this.model('category').find(data.source_id);
      const ntarget = await this.session('ntarget');
      console.log(source);
      if (data.option == 2) {
        const arr = [];
        for (const v of JSON.parse(data.data)) {
          arr.push(`\r\n${v.nid}:${v.name}`);
        }
        ntarget.groups = ntarget.groups + arr.join('');
      }
      // console.log(ntarget);
      await this.model('category').update(ntarget);// 复制栏目信息

      this.model('document').where({category_id: source.id}).update({category_id: ntarget.id});// 移动文章
      // 如果存在分类信息移动分类信息内容
      if (!think.isEmpty(source.documentsorts)) {
        const documentsorts = JSON.parse(source.documentsorts);
        if (!think.isEmpty(documentsorts.types)) {
          for (const v of documentsorts.types) {
            this.model('type_optionvalue' + v.enable).where({fid: source.id}).update({fid: ntarget.id});
            this.model('typeoptionvar').where({fid: source.id, sortid: v.enable}).update({fid: ntarget.id});
          }
        }
      }
      // 移动分组
      const groups = JSON.parse(data.data);
      for (const v of groups) {
        if (v.oid != v.nid) {
          this.model('document').where({group_id: v.oid}).update({group_id: v.nid});// 移动文章
        }
      }

      if (data.merge == 1) { // 如果合并删除源栏目
        await this.model('category').delete({where: {id: data.source_id}});
      }
      update_cache('category');// 更新栏目缓存
      return this.success({name: '成功！', url: '/admin/category/index'});
    } else {
      const data = this.get();
      console.log(data);
      const source = await this.model('category').find(data.source);
      const target = await this.session('ntarget');
      this.assign({
        source_groups: parse_type_attr(source.groups),
        target_groups: parse_type_attr(target.groups),
        source_g_s: JSON.stringify(parse_type_attr(source.groups)),
        source_name: source.title,
        target_name: target.title,
        source_id: source.id
      });
      console.log(parse_type_attr(source.groups));
      console.log(target);
      this.active = 'admin/category/index';

      if (data.merge == 1) {
        this.meta_title = '合并栏目';
      } else {
        this.meta_title = '移动栏目';
      }

      return this.display();
    }
  }
  // 是否在手机端显示
  async isappAction() {
    const up = await this.model('category').where({id: this.get('ids')}).update({isapp: this.get('isapp')});
    if (up) {
      update_cache('category');// 更新栏目缓存
      return this.success({name: '操作成功!'});
    } else {
      return this.fail('操作失败!');
    }
  }
};
