/* eslint-disable jsdoc/check-tag-names */
'use strict';
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
class ConfigController extends Controller {
  // 获取对象储存配置
  /**
  * @summary 获取系统配置
  * @description 获取系统配置
  * @router get /admin/sys/config/info
  * @response 200 baseRes desc
  */
  async info() {
    const { ctx } = this;
    const { name } = ctx.params;
    const data = await ctx.model.SysConfig.findOne({ where: { name } });
    this.success(data.value);
  }
  /**
  * @summary 修改系统配置
  * @description 修改系统配置
  * @router post /admin/sys/config/edit
  * @response 200 baseRes desc
  */
  async edit() {
    const { ctx } = this;
    const { name } = ctx.params;
    const data = ctx.request.body;
    console.log(data);
    await ctx.model.SysConfig.update({ value: data }, { where: { name } });
    this.success(data);
  }
  /**
  * @summary 配置管理
  * @description 配置管理
  * @router get /admin/sys/setup
  * @request query integer field_name desc
  * @response 200 baseRes desc
  */
  async setup() {
    const { ctx } = this;
    const data = ctx.query;
    const map = {};
    const page = data.page || 1;
    const limit = data.perPage || 15;
    map.offset = (Number(page) - 1) * limit;
    map.limit = Number(limit);
    map.order = [[ 'id', 'DESC' ]];
    const list = await ctx.model.SysConfig.findAndCountAll(map);
    this.success({ items: list.rows, total: list.count });
  }
  /**
  * @summary 添加配置
  * @description 添加配置
  * @router POST /admin/sys/setupAdd
  * @request body sys_config_add *body desc
  * @response 200 baseRes desc
  */
  async setupAdd() {
    const { ctx } = this;
    const data = ctx.request.body;
    data.value = {};
    const isc = await ctx.model.SysConfig.findOne({ where: { name: data.name } });
    if (isc) return this.fail('name 已经存在');
    const add = await ctx.model.SysConfig.create(data);
    this.success(add);
  }
  /**
 * @summary 编辑配置
 * @description 编辑配置
 * @router POST /admin/sys/setupEdit
 * @request body sys_config_edit *body desc
 * @response 200 baseRes desc
 */
  async setupEdit() {
    const { ctx } = this;
    const data = ctx.request.body;
    const isc = await ctx.model.SysConfig.findOne({ where: { name: data.name, id: { [Op.ne]: data.id } } });
    if (isc) return this.fail('name 已经存在');
    const edit = await ctx.model.SysConfig.update(data, { where: { id: data.id } });
    this.success(edit);
  }
  /**
  * @summary 删除配置
  * @description 删除配置
  * @router get /admin/sys/setupDel
  * @request query integer *id desc
  * @response 200 baseRes desc
  */
  async setupDel() {
    const { ctx } = this;
    const { id } = ctx.query;
    if (!id) return this.fail('id不能为空');
    const del = await ctx.model.SysConfig.destroy({ where: { id } });
    this.success(del);
  }
}
module.exports = ConfigController;
