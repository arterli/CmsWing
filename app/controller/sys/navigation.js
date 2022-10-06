/* eslint-disable jsdoc/check-tag-names */
'use strict';
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
/**
* @controller 系统导航
*/
class NavigationController extends Controller {
  /**
  * @summary 导航列表
  * @description 导航列表
  * @router get /admin/sys/navigation/index
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
    map.where.type = data.cat;
    if (data.title) {
      map.where.title = { [Op.like]: `%${data.title}%` };
    }
    const list = await ctx.model.SysNavigation.findAll(map);
    let tree;
    if (data.title) {
      tree = list;
    } else {
      tree = ctx.helper.arr_to_tree(list, 0);
    }
    this.success({ items: tree });
  }
  /**
  * @summary 获取全部导航节点
  * @description 获取全部导航节点
  * @router get /admin/sys/navigation/topNavigation
  * @response 200 baseRes errorCode:0成功
  */
  async topNavigation() {
    const { ctx } = this;
    const map = {};
    map.order = [[ 'sort', 'ASC' ]];
    map.where = {};
    map.attributes = [[ 'title', 'label' ], [ 'id', 'value' ], 'id', 'pid' ];
    const list = await ctx.model.SysNavigation.findAll(map);
    const tree = ctx.helper.arr_to_tree(list, 0);
    this.success({ options: [{ label: '一级导航', value: 0 }, ...tree ] });
  }
  /**
  * @summary 添加导航
  * @description 添加导航
  * @router post /admin/sys/navigation/navigationAdd
  * @request body sys_navigation_add body desc
  * @response 200 baseRes desc
  */
  async navigationAdd() {
    const { ctx } = this;
    const data = ctx.request.body;
    data.sub = JSON.stringify(data.sub);
    const add = await ctx.model.SysNavigation.create(data);
    this.success(add);
  }
  /**
  * @summary 编辑导航
  * @description 编辑导航
  * @router post /admin/sys/navigation/navigationEdit
  * @request body sys_navigation_edit body desc
  * @response 200 baseRes desc
  */
  async navigationEdit() {
    const { ctx } = this;
    const data = ctx.request.body;
    const edit = await ctx.model.SysNavigation.update(data, { where: { id: data.id } });
    this.success(edit);
  }
  /**
  * @summary 删除导航
  * @description 删除导航
  * @router get /admin/sys/navigation/navigationDel
  * @request query integer id desc
  * @response 200 baseRes desc
  */
  async navigationDel() {
    const { ctx } = this;
    const { id } = ctx.query;
    const ids = await ctx.service.sys.navigation.getSubNavigationIds(id);
    const del = await ctx.model.SysNavigation.destroy({ where: { id: { [Op.in]: ids } } });
    this.success(del);
  }
  /**
  * @summary 排序
  * @description 排序
  * @router post /admin/sys/navigation/saveOrder
  * @request body sys_navigation_add body desc
  * @response 200 baseRes desc
  */
  async saveOrder() {
    const { ctx } = this;
    const data = ctx.request.body;
    const paixun = async rows => {
      for (let index = 0; index < rows.length; index++) {
        const element = rows[index];
        await ctx.model.SysNavigation.update({ sort: index }, { where: { id: element.id } });
        if (element.children) {
          paixun(element.children);
        }
      }
    };
    await paixun(data.rows);
    this.success(1);
  }
}
module.exports = NavigationController;
