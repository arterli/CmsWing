'use strict';
const Service = require('egg').Service;
const { Op } = require('sequelize');
class navigationService extends Service {
  async getSubNavigationIds(pid, ids = []) {
    ids.push(Number(pid));
    const items = await this.ctx.model.SysNavigation.findAll({ where: { pid: { [Op.eq]: pid } } });
    for (const v of items) {
      await this.getSubNavigationIds(v.id, ids);
    }
    return ids;
  }

}
module.exports = navigationService;
