'use strict';
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
/**
* @controller cms回收站
*/
class RecycleController extends Controller {
  /**
  * @summary 回收站列表
  * @description 回收站列表
  * @router get /admin/cms/recycle/index
  * @request query integer field_name desc
  * @response 200 baseRes desc
  */
  async index() {
    const { ctx } = this;
    const data = ctx.query;
    const map = {};
    map.paranoid = false;
    map.where = {};
    map.where.deletedAt = { [Op.not]: null };
    // console.log(ctx.query);
    const page = data.page || 1;
    const limit = data.perPage || 15;
    map.offset = (Number(page) - 1) * limit;
    map.limit = Number(limit);
    map.order = [[ 'level', 'DESC' ], [ 'sort', 'ASC' ], [ 'id', 'DESC' ]];
    if (data.orderBy && data.orderDir) {
      map.order = [[ data.orderBy, data.orderDir ]];
    }
    if (data.doc_title) {
      map.where.title = { [Op.like]: `%${data.doc_title}%` };
    }
    const list = await ctx.model.CmsDoc.findAndCountAll(map);
    for (const v of list.rows) {
      v.dataValues.positionarr = v.position ? v.position.split(',') : [];
      const models = await ctx.model.SysModels.findOne({ where: { uuid: v.models_uuid } });
      const className = ctx.helper._.upperFirst(ctx.helper._.camelCase(models.name));
      v.dataValues[models.name] = await ctx.model[className].findOne({ where: { doc_id: v.id } });
      v.dataValues.modelName = models.desc;
      v.dataValues.pathTitle = (await ctx.service.cms.classify.info(v.classify_id)).pathTitle;
    }
    this.success({ items: list.rows, total: list.count });
  }
  /**
  * @summary 删除文档
  * @description 删除文档
  * @router get /admin/cms/recycle/del
  * @request query integer id desc
  * @response 200 baseRes desc
  */
  async del() {
    const { ctx } = this;
    const { id } = ctx.query;
    await this.service.cms.doc.destroy(id, true);
    this.success(1);
  }
  /**
  * @summary 批量删除
  * @description 批量删除
  * @router post /admin/cms/recycle/bulkDel
  * @request body cms_doc_edit *body desc
  * @response 200 baseRes desc
  */
  async bulkDel() {
    const { ctx } = this;
    const data = ctx.request.body;
    for (const v of data.selectedItems) {
      await this.service.cms.doc.destroy(v.id, true);
    }
    this.success(1);
  }
  /**
  * @summary 回复文档
  * @description 回复文档
  * @router get /admin/cms/recycle/restore
  * @request query integer id desc
  * @response 200 baseRes desc
  */
  async restore() {
    const { ctx } = this;
    const { id } = ctx.query;
    await this.service.cms.doc.restore(id);
    this.success(1);
  }
  /**
  * @summary 批量恢复
  * @description 批量恢复
  * @router post /admin/cms/recycle/bulkRestore
  * @request body cms_doc_edit *body desc
  * @response 200 baseRes desc
  */
  async bulkRestore() {
    const { ctx } = this;
    const data = ctx.request.body;
    for (const v of data.selectedItems) {
      await this.service.cms.doc.restore(v.id);
    }
    this.success(1);
  }
}
module.exports = RecycleController;
