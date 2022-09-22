/* eslint-disable jsdoc/check-tag-names */
'use strict';
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
/**
* @controller cms分类
*/
class ClassifyController extends Controller {
  /**
  * @summary 分类列表
  * @description 分类列表
  * @router get /admin/cms/classify/index
  * @request query integer field_name desc
  * @response 200 baseRes desc
  */
  async index() {
    const { ctx } = this;
    const data = ctx.query;
    // console.log(ctx.query);
    const map = {};
    map.order = [[ 'sort', 'ASC' ], [ 'id', 'ASC' ]];
    if (data.orderBy && data.orderDir) {
      map.order = [[ data.orderBy, data.orderDir ]];
    }
    map.where = {};
    if (data.name) {
      map.where.name = { [Op.like]: `%${data.name}%` };
    }
    if (data.title) {
      map.where.title = { [Op.like]: `%${data.title}%` };
    }
    const list = await ctx.model.CmsClassify.findAll(map);
    for (const v of list) {
      v.dataValues.sub = v.sub ? JSON.parse(v.sub) : v.sub;
      v.dataValues.url = `/cms/list/${v.name ? v.name : v.id}`;
    }
    let tree;
    if (data.name || data.title) {
      tree = list;
    } else {
      tree = ctx.helper.arr_to_tree(list, 0);
    }
    this.success({ items: tree });
  }
  /**
  * @summary 获取全部分类节点
  * @description 获取全部分类节点
  * @router get /admin/cms/classify/topClassify
  * @response 200 baseRes errorCode:0成功
  */
  async topClassify() {
    const { ctx } = this;
    const map = {};
    map.order = [[ 'sort', 'ASC' ]];
    map.where = {};
    map.attributes = [[ 'title', 'label' ], [ 'id', 'value' ], 'id', 'pid' ];
    const list = await ctx.model.CmsClassify.findAll(map);
    const tree = ctx.helper.arr_to_tree(list, 0);
    this.success({ options: [{ label: '一级分类', value: 0 }, ...tree ] });
  }
  /**
  * @summary 添加分类
  * @description 添加分类
  * @router post /admin/cms/classify/classifyAdd
  * @request body cms_classify_add body desc
  * @response 200 baseRes desc
  */
  async classifyAdd() {
    const { ctx } = this;
    const data = ctx.request.body;
    data.sub = JSON.stringify(data.sub);
    const add = await ctx.model.CmsClassify.create(data);
    this.success(add);
  }
  /**
  * @summary 编辑分类
  * @description 编辑分类
  * @router post /admin/cms/classify/classifyEdit
  * @request body cms_classify_edit body desc
  * @response 200 baseRes desc
  */
  async classifyEdit() {
    const { ctx } = this;
    const data = ctx.request.body;
    data.sub = JSON.stringify(data.sub);
    const edit = await ctx.model.CmsClassify.update(data, { where: { id: data.id } });
    this.success(edit);
  }
  /**
  * @summary 删除分类
  * @description 删除分类
  * @router get /admin/cms/classify/classifyDel
  * @request query integer id desc
  * @response 200 baseRes desc
  */
  async classifyDel() {
    const { ctx } = this;
    const { id } = ctx.query;
    const ids = await ctx.service.cms.classify.getSubClassifyIds(id);
    const del = ctx.model.CmsClassify.destroy({ where: { id: { [Op.in]: ids } } });
    this.success(del);
  }
  /**
  * @summary 排序
  * @description 排序
  * @router post /admin/cms/classify/saveOrder
  * @request body cms_classify_add body desc
  * @response 200 baseRes desc
  */
  async saveOrder() {
    const { ctx } = this;
    const data = ctx.request.body;
    const paixun = async rows => {
      for (let index = 0; index < rows.length; index++) {
        const element = rows[index];
        await ctx.model.CmsClassify.update({ sort: index }, { where: { id: element.id } });
        if (element.children) {
          paixun(element.children);
        }
      }
    };
    await paixun(data.rows);
    this.success(1);
  }
}
module.exports = ClassifyController;
