/* eslint-disable jsdoc/check-tag-names */
'use strict';
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
/**
* @controller 应用管理
*/
class ApplicationController extends Controller {
  /**
  * @summary 应用列表
  * @description 应用列表
  * @router get /admin/sys/application
  * @request query string keywords desc
  * @response 200 baseRes desc
  */
  async index() {
    const { ctx } = this;
    const data = ctx.query;
    const page = data.page || 1;
    const limit = data.perPage || 15;
    // console.log(ctx.query);
    const map = {};
    map.offset = (Number(page) - 1) * limit;
    map.limit = Number(limit);
    map.order = [[ 'id', 'ASC' ]];
    map.where = {};
    if (data.keywords) {
      map.where.op_or = [{ name: { [Op.like]: `%${data.keywords}%` } }, { title: { [Op.like]: `%${data.keywords}%` } }];
    }
    // map.raw = true;
    const list = await ctx.model.SysApplication.findAndCountAll(map);
    for (const v of list.rows) {
      console.log(v);
      v.dataValues.version = v.version === 'sys' ? this.config.pkg.version : v.version;
    }
    this.success({ items: list.rows, total: list.count });
  }
  /**
  * @summary 添加应用
  * @description 添加应用
  * @router post /admin/sys/application/add
  * @request body sys_application_add *body desc
  * @response 200 baseRes desc
  */
  async add() {
    const { ctx } = this;
    const data = ctx.request.body;
    const isc = await ctx.model.SysApplication.findOne({ where: { name: data.name } });
    if (isc) return this.fail('应用标识不能重复');
    const add = await ctx.model.SysApplication.create(data);
    this.success(add);
  }
  /**
  * @summary 编辑应用
  * @description 编辑应用
  * @router post /admin/sys/application/edit
  * @request body sys_application_edit *body desc
  * @response 200 baseRes desc
  */
  async edit() {
    const { ctx } = this;
    const data = ctx.request.body;
    const edit = await ctx.model.SysApplication.update(data, { where: { name: data.name } });
    this.success(edit);
  }
}
module.exports = ApplicationController;
