/* eslint-disable jsdoc/require-param-description */
'use strict';
const Service = require('egg').Service;
const { Op } = require('sequelize');
class RbacService extends Service {
  /**
   * check auth
   * @param  {String} name [auth type]
   * @param {String} uuid 用户id
   * @return {Promise}      []
   */
  async check(name, uuid) {
    if (!name || !uuid) return false;
    const { helper } = this.ctx;
    const map = {};
    map.include = [{
      model: this.ctx.model.SysRole,
    }];
    map.where = {};
    map.where.uuid = uuid;
    map.where.state = true;
    const userInfo = await this.ctx.model.SysUser.findOne(map);
    if (userInfo) {
      if (userInfo.admin) return true;
      const ids = [];
      for (const v of userInfo.sys_roles) {
        console.log(v.r_uuids);
        if (v.r_uuids) {
          for (const vv of v.r_uuids.split(',')) {
            ids.push(vv);
          }
        }
      }
      const roleIds = helper._.uniq(ids);
      const role = await this.ctx.model.Routes.findOne({ where: { path: { [Op.eq]: name }, id: { [Op.in]: roleIds } } });
      return !!role;
    }
    return false;
  }
  async getRoleIds(uuid) {
    if (!uuid) return [];
    const { helper } = this.ctx;
    const map = {};
    map.include = [{
      model: this.ctx.model.SysRole,
    }];
    map.where = {};
    map.where.uuid = uuid;
    const userInfo = await this.ctx.model.SysUser.findOne(map);
    console.log(JSON.stringify(userInfo, null, 2));
    if (!userInfo) return [];
    // if (userInfo.admin) return [];
    const ids = [];
    for (const v of userInfo.sys_roles) {
      console.log(v.r_uuids);
      if (v.r_uuids) {
        for (const vv of v.r_uuids.split(',')) {
          ids.push(vv);
        }
      }
    }
    return helper._.uniq(ids);
  }
}
module.exports = RbacService;
