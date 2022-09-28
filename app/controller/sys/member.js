/* eslint-disable jsdoc/check-tag-names */
// Routing node

'use strict';
/**
* @controller 会员管理
*/
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
class MemberController extends Controller {
  /**
  * @summary 会员列表
  * @description 会员列表
  * @router get /admin/sys/member/list
  * @request query integer field_name desc
  * @response 200 baseRes desc
  */
  async list() {
    const { ctx } = this;
    this.success(1);
  }
  /**
  * @summary 分组列表
  * @description 分组列表
  * @router get /admin/sys/user/groupList
  * @response 200 baseRes desc
  */
  async groupList() {
    const { ctx } = this;
    const map = {};
    map.order = [[ 'sort', 'ASC' ]];
    const list = await ctx.model.SysUserGroup.findAll(map);
    const tree = ctx.helper.arr_to_tree(list, 0, 'uuid', 'puuid');
    this.success({ options: [{ name: '全部分组', uuid: '0', creatable: false, removable: false, editable: false }, ...tree ] });
  }

  /**
  * @summary 添加分组
  * @description 添加分组
  * @router post /admin/sys/user/groupAdd
  * @request body sys_user_group_add body desc
  * @response 200 baseRes desc
  */
  async groupAdd() {
    const { ctx } = this;
    const data = ctx.request.body;
    const addData = {};
    addData.name = data.name;
    if (data.parent) {
      addData.puuid = data.parent.uuid;
    } else {
      addData.puuid = 0;
    }
    if (data.sort) {
      addData.sort = data.sort;
    }
    const add = await ctx.model.SysUserGroup.create(addData);
    this.success(add);
  }

  /**
  * @summary 更新分组
  * @description 更新分组
  * @router post /admin/sys/user/groupEdit
  * @request body sys_user_group_edit body desc
  * @response 200 baseRes desc
  */
  async groupEdit() {
    const { ctx } = this;
    const data = ctx.request.body;
    const update = await ctx.model.SysUserGroup.update(data, { where: { uuid: data.uuid } });
    this.success(update);
  }

  /**
  * @summary 删除分组
  * @description 删除分组
  * @router get /admin/sys/user/groupDel
  * @request query string uuid desc
  * @response 200 baseRes desc
  */
  async groupDel() {
    const { ctx } = this;
    const { uuid } = ctx.query;
    const del = await ctx.model.SysUserGroup.destroy({ where: { uuid: { [Op.eq]: uuid } } });
    await ctx.model.SysUserGroup.destroy({ where: { puuid: { [Op.eq]: uuid } } });
    this.success(del);
  }

  /**
  * @summary 用户列表
  * @description 用户列表
  * @router get /admin/sys/user/userList
  * @request query integer page desc
  * @request query integer perPage desc
  * @request query string group desc
  * @request query string username desc
  * @request query string orderBy desc
  * @request query string orderDir desc
  * @response 200 baseRes desc
  */
  async userList() {
    const { ctx } = this;
    const data = ctx.query;
    const page = data.page || 1;
    const limit = data.perPage || 15;
    const map = {};
    map.where = {};
    if (data.group && data.group !== '0') {
      map.where.group_uuid = data.group;
    }
    if (data.username) {
      map.where.username = { [Op.like]: `%${data.username}%` };
    }
    map.order = [[ 'id', 'desc' ]];
    if (data.orderBy && data.orderDir) {
      map.order = [[ data.orderBy, data.orderDir ]];
    }
    map.offset = (Number(page) - 1) * limit;
    map.limit = Number(limit);
    map.include = [{
      model: ctx.model.SysRole,
    }];
    map.distinct = true;
    const list = await ctx.model.SysUser.findAndCountAll(map);
    for (const v of list.rows) {
      v.dataValues.role_ids = (v.sys_roles.map(item => item.uuid)).join(',');
    }
    // console.log(list);
    this.success({ items: list.rows, total: list.count });
  }

  /**
  * @summary 添加用户
  * @description 添加用户
  * @router post /admin/sys/user/userAdd
  * @request body sys_user_add body desc
  * @response 200 baseRes desc
  */
  async userAdd() {
    const { ctx } = this;
    const data = ctx.request.body;
    data.password = ctx.helper.cipher(data.password);
    const add = await ctx.model.SysUser.create(data);
    if (data.role_ids) {
      const roleList = data.role_ids.split(',');
      for (const v of roleList) {
        await ctx.model.SysUserRole.create({ user_uuid: add.uuid, role_uuid: v });
      }
    }
    this.success(add);
  }

  /**
  * @summary 编辑用户
  * @description 编辑用户
  * @router post /admin/sys/user/userEdit
  * @request body sys_user_edit body desc
  * @response 200 baseRes desc
  */
  async userEdit() {
    const { ctx } = this;
    const data = ctx.request.body;
    if (data.newpassword) {
      data.password = ctx.helper.cipher(data.newpassword);
    }
    const edit = await ctx.model.SysUser.update(data, { where: { uuid: { [Op.eq]: data.uuid } } });
    if (data.role_ids) {
      const roleList = data.role_ids.split(',');
      await ctx.model.SysUserRole.destroy({ where: { user_uuid: data.uuid } });
      for (const v of roleList) {
        await ctx.model.SysUserRole.create({ user_uuid: data.uuid, role_uuid: v });
      }
    }
    this.success(edit);
  }

  /**
  * @summary 删除用户
  * @description 删除用户
  * @router get /admin/sys/user/userDel
  * @request query string uuid desc
  * @response 200 baseRes desc
  */
  async userDel() {
    const { ctx } = this;
    const { uuid } = ctx.query;
    const del = await ctx.model.SysUser.destroy({ where: { uuid: { [Op.eq]: uuid } } });
    await ctx.model.SysUserRole.destroy({ where: { user_uuid: uuid } });
    this.success(del);
  }

  /**
  * @summary 获取角色
  * @description 获取角色
  * @router get /admin/sys/user/roleList
  * @response 200 baseRes desc
  */
  async roleList() {
    const { ctx } = this;
    const list = await ctx.model.SysRole.findAll();
    this.success({ options: list });
  }
}
module.exports = MemberController;
