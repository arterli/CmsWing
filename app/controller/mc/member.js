/* eslint-disable jsdoc/check-tag-names */
// Routing node

'use strict';
/**
* @controller MCenter 会员管理
*/
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
class MemberController extends Controller {
  /**
  * @summary 会员列表
  * @description 会员列表
  * @router get /admin/mc/member/list
  * @request query integer field_name desc
  * @response 200 baseRes desc
  */
  async list() {
    const { ctx } = this;
    const data = ctx.query;
    const page = data.page || 1;
    const limit = data.perPage || 15;
    const map = {};
    map.where = {};
    if (data.username) {
      map.where.username = { [Op.like]: `%${data.username}%` };
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
    const list = await ctx.model.McMember.findAndCountAll(map);
    this.success({ items: list.rows, total: list.count });
  }
  /**
  * @summary 用户注册
  * @description 用户中心注册
  * @router post /admin/mc/member/add
  * @request body mc_member_add *body desc
  * @response 200 baseRes desc
  */
  async add() {
    const { ctx } = this;
    const data = ctx.request.body;
    data.password = ctx.helper.cipher(data.password);
    const [ member, created ] = await ctx.model.McMember.findOrCreate({
      where: { username: data.username, email: data.email, mobile: data.mobile },
      defaults: data,
    });
    if (created) {
      this.success(member, '恭喜您注册成功，请登录！');
    } else {
      this.fail('用户名，手机号，邮箱 重复,请重试！');
    }
  }
  /**
  * @summary 编辑会员
  * @description 编辑会员
  * @router post /admin/mc/member/edit
  * @request body mc_member_add body desc
  * @response 200 baseRes desc
  */
  async edit() {
    const { ctx } = this;
    const data = ctx.request.body;
    if (data.newpassword) {
      data.password = ctx.helper.cipher(data.newpassword);
    }
    const exist = await ctx.model.McMember.findOne({ where: { [Op.or]: [{ username: data.username }, { mobile: data.mobile }, { email: data.email }], uuid: { [Op.ne]: data.uuid } } });
    if (exist) {
      return this.fail('已存在相同的用户名或电话或邮箱，请重试！');
    }
    const edit = await ctx.model.McMember.update(data, { where: { uuid: { [Op.eq]: data.uuid } } });
    this.success(edit);
  }
  /**
  * @summary 删除会员
  * @description 删除会员
  * @router get /admin/mc/member/del
  * @request query string *uuid desc
  * @response 200 baseRes desc
  */
  async del() {
    const { ctx } = this;
    const { uuid } = ctx.query;
    const del = ctx.model.McMember.destroy({ where: { uuid } });
    this.success(del);
  }
}
module.exports = MemberController;
