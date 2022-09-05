'use strict';
/**
* @controller
*/
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
class routesController extends Controller {
  async index() {
    this.success(1);
  }
  // 路由列表
  async routesList() {
    const { ctx } = this;
    const data = ctx.query;
    console.log(ctx.query);
    const map = {};
    if (!data.class_uuid) {
      const classify = await ctx.model.SysRoutesClassify.findOne({ order: [[ 'sort', 'ASC' ]] });
      data.class_uuid = classify.uuid;
    }
    map.order = [[ 'sort', 'ASC' ]];
    map.where = {};
    if (data.s_name) {
      map.where.name = { [Op.like]: `%${data.s_name}%` };
    }
    map.where.class_uuid = data.class_uuid;
    const list = await ctx.model.SysRoutes.findAll(map);
    let tree;
    if (data.s_name) {
      tree = list;
    } else {
      tree = ctx.helper.arr_to_tree(list, 0, 'uuid', 'puuid');
    }
    this.success({ items: tree });
  }
  // 添加路由
  async addRoutes() {
    const { ctx } = this;
    const data = ctx.request.body;
    const add = await ctx.model.SysRoutes.create(data.sys_routes);
    await ctx.service.sys.generate.routes();
    this.success(add);
  }
  // 编辑路由
  async editRoutes() {
    const { ctx } = this;
    const data = ctx.request.body;
    const edit = await ctx.model.SysRoutes.update(data.SysRoutes_findOne, { where: { uuid: data.SysRoutes_findOne.uuid } });
    await ctx.service.sys.generate.routes();
    this.success(edit);
  }
  // 删除路由
  async delRoutes() {
    const { ctx } = this;
    const uuid = ctx.query.uuid;
    const del = await ctx.model.SysRoutes.destroy({ where: { uuid } });
    await ctx.model.SysRoutes.destroy({ where: { puuid: uuid } });
    await ctx.service.sys.generate.routes();
    this.success(del);
  }
  /**
  * @summary 获取全部树路由节点
  * @description 获取全部树路由节点
  * @router get /admin/sys/routes/topRoutes
  * @request query string *class_uuid 模块id
  * @response 200 baseRes errorCode:0成功
  */
  async topRoutes() {
    const { ctx } = this;
    const { class_uuid } = ctx.query;
    const map = {};
    map.order = [[ 'sort', 'ASC' ]];
    map.where = {};
    map.where.class_uuid = class_uuid;
    map.attributes = [[ 'name', 'label' ], [ 'uuid', 'value' ], 'uuid', 'puuid' ];
    const list = await ctx.model.SysRoutes.findAll(map);
    const tree = ctx.helper.arr_to_tree(list, 0, 'uuid', 'puuid');
    this.success([{ label: '一级节点', value: 0 }, ...tree ]);
  }
}
module.exports = routesController;
