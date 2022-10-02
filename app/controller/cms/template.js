'use strict';
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
/**
* @controller cms模版管理
*/
class TemplateController extends Controller {
  /**
  * @summary 模版列表
  * @description 模版列表
  * @router get /admin/cms/template
  * @request query integer field_name desc
  * @response 200 baseRes desc
  */
  async index() {
    const { ctx } = this;
    const data = ctx.query;
    const page = data.page || 1;
    const limit = data.perPage || 15;
    const map = {};
    map.where = {};
    if (data.name) {
      map.where.name = { [Op.like]: `%${data.name}%` };
    }
    if (data.email) {
      map.where.email = { [Op.like]: `%${data.email}%` };
    }
    if (data.mobile) {
      map.where.mobile = { [Op.like]: `%${data.mobile}%` };
    }
    if (data.uuid) {
      map.where.uuid = { [Op.eq]: data.uuid };
    }
    if (data.state) {
      map.where.state = { [Op.eq]: data.state === '1' };
    }
    map.order = [[ 'id', 'desc' ]];
    if (data.orderBy && data.orderDir) {
      map.order = [[ data.orderBy, data.orderDir ]];
    }
    map.offset = (Number(page) - 1) * limit;
    map.limit = Number(limit);
    map.distinct = true;
    const list = await ctx.model.CmsTemplate.findAndCountAll(map);
    this.success({ items: list.rows, total: list.count });
  }
  /**
  * @summary 添加模版
  * @description 添加模版
  * @router post /admin/cms/template/add
  * @request body cms_template_add #body desc
  * @response 200 baseRes desc
  */
  async add() {
    const { ctx } = this;
    const data = ctx.request.body;
    const add = await ctx.model.CmsTemplate.create(data);
    this.success(add);
  }
}
module.exports = TemplateController;
