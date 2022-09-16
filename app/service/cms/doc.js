'use strict';
const Service = require('egg').Service;
const { Op } = require('sequelize');
class DocService extends Service {
  async pdoc(pid) {
    const breadcrumb = [];
    if (!pid) return breadcrumb;
    while (pid !== 0) {
      const nav = await this.ctx.model.CmsDoc.findOne({ where: { id: { [Op.eq]: pid } } });
      breadcrumb.push(nav);
      pid = nav.pid;
    }
    return breadcrumb.reverse();
  }
  async getSubDocIds(pid, ids = []) {
    ids.push(Number(pid));
    const items = await this.ctx.model.CmsDoc.findAll({ where: { pid } });
    for (const v of items) {
      await this.getSubDocIds(v.id, ids);
    }
    return ids;
  }
}
module.exports = DocService;
