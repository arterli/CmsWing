// Routing node

'use strict';
/**
* @controller admin/sys/server 系统服务
*/
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
class RoleController extends Controller {
  async index() {
    this.success(1);
  }
  // 角色列表
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
  // 添加角色
  async addRole() {
    const { ctx } = this;
    const data = ctx.request.body;
    const add = await ctx.model.SysRole.create(data);
    this.success(add);
  }
  // 更新角色
  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const update = await ctx.model.SysRole.update(data, { where: { uuid: data.uuid } });
    this.success(update);
  }
  // 删除角色
  async del() {
    const { ctx } = this;
    const { uuid } = ctx.query;
    const del = await ctx.model.SysRole.destroy({ where: { uuid: { [Op.eq]: uuid } } });
    this.success(del);
  }
  // 路由节点
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
