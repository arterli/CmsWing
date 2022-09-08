// Routing node

'use strict';
/**
* @controller 角色管理
*/
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
class RoleController extends Controller {
  async index() {
    this.success(1);
  }
  /**
  * @summary 角色列表
  * @description 角色列表
  * @router get /admin/sys/role/roleList
  * @request query integer page desc
  * @request query integer perPage desc
  * @request query string name desc
  * @response 200 baseRes desc
  */
  async roleList() {
    const { ctx } = this;
    const data = ctx.query;
    const page = data.page || 1;
    const limit = data.perPage || 15;
    const map = {};
    map.where = {};
    if (data.name) {
      map.where.name = { [Op.like]: `%${data.name}%` };
    }
    map.offset = (Number(page) - 1) * limit;
    map.limit = Number(limit);
    const list = await ctx.model.SysRole.findAndCountAll(map);

    this.success({ items: list.rows, total: list.count });
  }
  /**
  * @summary 添加角色
  * @description 添加角色
  * @router post /admin/sys/role/addRole
  * @request body sys_role_add body desc
  * @response 200 baseRes desc
  */
  async addRole() {
    const { ctx } = this;
    const data = ctx.request.body;
    const add = await ctx.model.SysRole.create(data);
    this.success(add);
  }

  /**
  * @summary 更新角色
  * @description 更新角色
  * @router post /admin/sys/role/update
  * @request body sys_role_edit body desc
  * @response 200 baseRes desc
  */
  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const update = await ctx.model.SysRole.update(data, { where: { uuid: data.uuid } });
    this.success(update);
  }
  /**
  * @summary 删除角色
  * @description 删除角色
  * @router get /admin/sys/role/del
  * @request query string uuid desc
  * @response 200 baseRes desc
  */
  async del() {
    const { ctx } = this;
    const { uuid } = ctx.query;
    const del = await ctx.model.SysRole.destroy({ where: { uuid: { [Op.eq]: uuid } } });
    this.success(del);
  }

  /**
  * @summary 路由节点
  * @description 路由节点
  * @router get /admin/sys/role/routingNode
  * @response 200 baseRes desc
  */
  async routingNode() {
    const { ctx } = this;
    const map = {};
    map.order = [[ 'sort', 'ASC' ]];
    map.where = {};
    map.where.role = true;
    map.attributes = [[ 'name', 'label' ], [ 'uuid', 'value' ], 'uuid', 'puuid' ];
    const list = await ctx.model.SysRoutes.findAll(map);
    const tree = ctx.helper.arr_to_tree(list, 0, 'uuid', 'puuid');
    this.success({ options: tree });
  }
  // graphQL节点
  async graphQL() {
    const q = { query: `{
      __schema {
        queryType {
          name
          fields{
            name
            description
          }
        }
        mutationType{
          name
          fields{
            name
            description
          }
        }
      }
    }
    ` };
    const res = await this.ctx.graphqlQuery(JSON.stringify(q));
    const nodes = [];
    for (const key in res.data.__schema) {
      if (Object.hasOwnProperty.call(res.data.__schema, key)) {
        // console.log(element);
        const pobj = {};
        pobj.label = key === 'queryType' ? '查询' : '修改';
        pobj.value = key;
        pobj.children = [];
        for (const v of res.data.__schema[key].fields) {
          const cobj = {};
          cobj.label = `${v.name}[${v.description}]`;
          cobj.value = v.name;
          pobj.children.push(cobj);
        }
        nodes.push(pobj);
      }
    }
    // console.log(nodes);
    this.success({ options: nodes });
  }
}
module.exports = RoleController;
