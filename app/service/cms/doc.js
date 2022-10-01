'use strict';
const Service = require('egg').Service;
const { Op } = require('sequelize');
class DocService extends Service {
  // 父级文档
  async pdoc(pid) {
    const breadcrumb = [];
    if (!pid) return breadcrumb;
    while (pid != 0) {
      const nav = await this.ctx.model.CmsDoc.findOne({ where: { id: { [Op.eq]: pid } } });
      breadcrumb.push(nav);
      pid = nav.pid;
    }
    return breadcrumb.reverse();
  }
  // 子文档
  async getSubDocIds(pid, ids = [], paranoid) {
    ids.push(Number(pid));
    const items = await this.ctx.model.CmsDoc.findAll({ where: { pid }, paranoid });
    for (const v of items) {
      await this.getSubDocIds(v.id, ids, paranoid);
    }
    return ids;
  }
  // 删除文档
  async destroy(id, force = false) {
    const doc = await this.ctx.model.CmsDoc.findOne({ where: { id }, paranoid: !force });
    if (!doc) return false;
    const ids = await this.getSubDocIds(id, [], !force);
    await this.ctx.model.CmsDoc.destroy({ where: { id: { [Op.in]: ids } }, force });
    const data = await this.ctx.model.SysModels.findOne({ where: { uuid: doc.models_uuid } });
    const className = this.ctx.helper._.upperFirst(this.ctx.helper._.camelCase(data.name));
    await this.ctx.model[className].destroy({ where: { doc_id: { [Op.in]: ids } }, force });
    if (force) {
      const comments = await this.ctx.model.CmsComments.findAll({ where: { doc_id: id } });
      for (const v of comments) {
        await this.ctx.model.CmsComments.destroy({ where: { id: v.id } });
        await this.ctx.model.CmsCommentsReply.destroy({ where: { comments_id: v.id } });
      }
    }
  }
  // 获取上级 ids
  async getpdids(id, pid) {
    const ids = [ id ];
    if (!pid) return ids;
    while (pid !== 0) {
      const nav = await this.ctx.model.CmsDoc.findOne({ where: { id: { [Op.eq]: pid } }, paranoid: false });
      ids.push(nav.id);
      pid = nav.pid;
    }
    return ids.reverse();
  }
  // 恢复文档
  async restore(id) {
    const doc = await this.ctx.model.CmsDoc.findOne({ where: { id }, paranoid: false });
    if (!doc) return false;
    const ids = await this.getpdids(doc.id, doc.pid);
    await this.ctx.model.CmsDoc.restore({ where: { id: { [Op.in]: ids } } });
    const data = await this.ctx.model.SysModels.findOne({ where: { uuid: doc.models_uuid } });
    const className = this.ctx.helper._.upperFirst(this.ctx.helper._.camelCase(data.name));
    await this.ctx.model[className].restore({ where: { doc_id: { [Op.in]: ids } } });
  }
}
module.exports = DocService;
