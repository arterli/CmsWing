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
        if (v.r_uuids) {
          for (const vv of v.r_uuids.split(',')) {
            ids.push(vv);
          }
        }
      }
      const roleIds = helper._.uniq(ids);
      const role = await this.ctx.model.SysRoutes.findOne({ where: { path: { [Op.eq]: name }, uuid: { [Op.in]: roleIds } } });
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
    if (!userInfo) return [ '1' ];
    if (userInfo.admin) return [];
    const ids = [];
    for (const v of userInfo.sys_roles) {
      if (v.r_uuids) {
        for (const vv of v.r_uuids.split(',')) {
          ids.push(vv);
        }
      }
    }
    return helper._.uniq(ids);
  }
  // 判断 graphql 权限
  async graphql(query, uuid) {
    if (!query || !uuid) return false;
    const map = {};
    map.include = [{
      model: this.ctx.model.SysRole,
    }];
    map.where = {};
    map.where.uuid = uuid;
    const userInfo = await this.ctx.model.SysUser.findOne(map);
    if (!userInfo) return false;
    if (userInfo.admin) return true;
    let res = false;
    for (const v of userInfo.sys_roles) {
      if (v.g_uuids) {
        for (const vv of v.g_uuids.split(',')) {
          if (vv !== 'mutationType' || vv !== 'queryType') {
            if (query.indexOf(vv) !== -1) {
              res = true;
              break; // 跳出循环
            }
          }
        }
      }
    }
    return res;
  }
  // 判断 graphql 权限
  async openApi(query) {
    if (!query) return false;
    const apirole = await this.ctx.model.SysOpenApi.findOne();
    if (!apirole) return false;
    let res = false;
    if (apirole.open_uuids) {
      for (const vv of apirole.open_uuids.split(',')) {
        if (vv !== 'mutationType' || vv !== 'queryType') {
          if (query.indexOf(vv) !== -1) {
            res = true;
            break; // 跳出循环
          }
        }
      }
    }
    return res;
  }
}
module.exports = RbacService;
