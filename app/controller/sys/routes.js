/* eslint-disable jsdoc/check-tag-names */
'use strict';
/**
* @controller 路由管理
*/
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs/promises');
class RoutesController extends Controller {
  async index() {
    this.success(1);
  }

  /**
  * @summary 路由列表
  * @description 路由列表
  * @router get /admin/sys/routes/routesList
  * @request query string class_uuid desc
  * @request query string s_name desc
  * @response 200 baseRes desc
  */
  async routesList() {
    const { ctx } = this;
    const data = ctx.query;
    // console.log(ctx.query);
    const map = {};
    if (!data.class_uuid) {
      const classify = await ctx.model.SysRoutesClassify.findOne({ order: [[ 'sort', 'ASC' ]] });
      data.class_uuid = classify.uuid;
    }
    map.order = [[ 'sort', 'ASC' ], [ 'id', 'ASC' ]];
    map.where = {};
    if (data.s_name) {
      map.where.name = { [Op.like]: `%${data.s_name}%` };
    }
    if (data.app && data.app !== 'all') {
      map.where.app = data.app;
    }
    map.where.class_uuid = data.class_uuid;
    const list = await ctx.model.SysRoutes.findAll(map);
    let tree;
    if (data.s_name || (data.app && data.app !== 'all')) {
      tree = list;
    } else {
      tree = ctx.helper.arr_to_tree(list, 0, 'uuid', 'puuid');
    }
    this.success({ items: tree });
  }

  /**
  * @summary 添加路由
  * @description 添加路由
  * @router post /admin/sys/routes/addRoutes
  * @request body sys_routes_add body desc
  * @response 200 baseRes desc
  */
  async addRoutes() {
    const { ctx } = this;
    const data = ctx.request.body;
    const add = await ctx.model.SysRoutes.create(data.sys_routes);
    await ctx.service.sys.generate.routes();
    await ctx.service.sys.generate.pages(data.sys_routes);
    this.success(add);
  }

  /**
  * @summary 编辑路由
  * @description 编辑路由
  * @router post /admin/sys/routes/editRoutes
  * @request body sys_routes_edit body desc
  * @response 200 baseRes desc
  */
  async editRoutes() {
    const { ctx } = this;
    const data = ctx.request.body;
    const edit = await ctx.model.SysRoutes.update(data.SysRoutes_findOne, { where: { uuid: data.SysRoutes_findOne.uuid } });
    await ctx.service.sys.generate.routes();
    await ctx.service.sys.generate.pages(data.SysRoutes_findOne);
    this.success(edit);
  }
  /**
  * @summary 删除路由
  * @description 删除路由
  * @router get /admin/sys/routes/delRoutes
  * @request query string uuid desc
  * @response 200 baseRes desc
  */
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
    this.success({ options: [{ label: '一级节点', value: 0 }, ...tree ] });
  }
  // 编辑页面

  async editPages() {
    const { ctx } = this;
    const data = ctx.request.body;
    if (!data.schema) return this.fail('系统错误');
    if (!data.uuid) return this.fail('系统错误');
    const routes = await ctx.model.SysRoutes.findOne({ where: { uuid: data.uuid } });
    const link = routes.link;
    if (!link) return this.fail('系统错误');
    const url = link.split(':');
    if (url[0] !== 'get') return this.fail('系统错误');
    const mulu = path.join(this.app.baseDir, 'app', path.dirname(url[1]));
    ctx.helper.mkdirsSync(mulu);
    const wenjian = path.join(mulu, path.basename(url[1]));
    try {
      const schemaData = new Uint8Array(Buffer.from(decodeURIComponent(data.schema)));
      await fs.writeFile(wenjian, schemaData);
      // Abort the request before the promise settles.
    } catch (err) {
      // When a request is aborted - err is an AbortError
      console.error(err);
    }

    this.success(1);
  }
  // 排序
  async saveOrder() {
    const { ctx } = this;
    const data = ctx.request.body;
    const paixun = async rows => {
      for (let index = 0; index < rows.length; index++) {
        const element = rows[index];
        await ctx.model.SysRoutes.update({ sort: index }, { where: { id: element.id } });
        if (element.children) {
          paixun(element.children);
        }
      }
    };
    await paixun(data.rows);
    this.success(1);
  }
  // 添加分类
  async addClassify() {
    const { ctx } = this;
    const data = ctx.request.body;
    const add = await ctx.model.SysRoutesClassify.create(data);
    await ctx.service.sys.generate.routes();
    this.success(add);
  }
  // 编辑分类
  async editClassify() {
    const { ctx } = this;
    const data = ctx.request.body;
    const edit = await ctx.model.SysRoutesClassify.update(data, { where: { uuid: data.uuid } });
    await ctx.service.sys.generate.routes();
    this.success(edit);
  }
  /**
  * @summary 获取应用
  * @description 获取应用
  * @router get /admin/sys/routes/application
  * @request query string type desc
  * @response 200 baseRes desc
  */
  async application() {
    const { ctx } = this;
    const { type } = ctx.query;
    const map = {};
    map.order = [[ 'id', 'ASC' ]];
    map.where = {};
    map.attributes = [[ 'name', 'label' ], [ 'name', 'value' ]];
    map.raw = true;
    const list = await ctx.model.SysApplication.findAll(map);
    let res = list;
    if (type === 'all') {
      res = { options: [{ label: '全部模型', value: 'all' }, ...list ] };
    }
    this.success(res);
  }
}
module.exports = RoutesController;
