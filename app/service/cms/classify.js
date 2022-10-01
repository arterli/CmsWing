'use strict';
const Service = require('egg').Service;
const { Op } = require('sequelize');
class classifyService extends Service {
  async subQuery(classifyId, data) {
    if (classifyId && classifyId !== '0') {
      const classify = await this.ctx.model.CmsClassify.findByPk(classifyId);
      const sub = classify.sub ? JSON.parse(classify.sub) : [];
      const subarr = sub.map(item => `${item.name}${classifyId}`);
      const subobj = {};
      for (const v of sub) {
        subobj[`${v.name}${classifyId}`] = v.type;
      }
      // console.log(subarr);
      const where = {};
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          if (subarr.includes(key)) {
            // console.log(key);
            // console.log(subobj[key]);
            if (subobj[key] === 'radios') {
              if (data[key] && data[key] !== 'all') {
                where[key] = { op_eq: data[key] };
              }

            } else {
              const { Sequelize } = this.app;
              if (data[key]) {
                const orarr = [];
                for (const v of data[key].split(',')) {
                  orarr.push(Sequelize.where(Sequelize.fn('FIND_IN_SET', v, Sequelize.fn('json_unquote', Sequelize.fn('json_extract', Sequelize.col('classify_sub'), Sequelize.literal(`'$."${key}"'`)))), '>', 0));
                  // orarr.push({ op_in: v });
                  // orarr.push(Sequelize.where(Sequelize.fn('JSON_CONTAINS', Sequelize.col('cms_doc.classify_sub'), Sequelize.literal(`'${v}'`), Sequelize.literal(`'$.\"${key}\"'`)), 1));
                }
                where[key] = { op_or: orarr };
                // where[key] = { op_or: data[key].split(',') };
              }
            }
          }
        }
      }
      return where;
    }
    return {};

  }
  // 获取最顶级栏目id
  async getTopId(cid) {
    const n = await this.ctx.model.CmsClassify.findOne({ where: { id: { [Op.eq]: cid } } });
    if (n.pid === 0) return n.id;
    let id = 0;
    while (n.pid !== 0) {
      const nav = await this.ctx.model.CmsClassify.findOne({ where: { id: { [Op.eq]: n.pid } } });
      if (nav.pid === 0) {
        id = nav.id;
      }
      n.pid = nav.pid;
    }
    return id;
  }
  // 获取面包屑
  async breadcrumb(cid) {
    const n = await this.ctx.model.CmsClassify.findOne({ where: { id: { [Op.eq]: cid } } });
    const barr = [];
    const no = {};
    no.name = n.title;
    no.url = `/cms/list/${n.name ? n.name : n.id}`;
    const nn = await this.ctx.model.SysNavigation.findOne({ where: { [Op.or]: [
      { url: `/cms/list/${n.name}` },
      { url: `/cms/list/${n.id}` },
    ] } });
    if (nn) {
      no.name = nn.title;
    }
    barr.push(no);
    while (n.pid !== 0) {
      const nav = await this.ctx.model.CmsClassify.findOne({ where: { id: { [Op.eq]: n.pid } } });
      const obj = {};
      obj.name = nav.title;
      obj.url = `/cms/list/${nav.name ? nav.name : nav.id}`;
      const navn = await this.ctx.model.SysNavigation.findOne({ where: { [Op.or]: [
        { url: `/cms/list/${nav.name}` },
        { url: `/cms/list/${nav.id}` },
      ] } });
      if (navn) {
        obj.name = navn.title;
      }
      barr.push(obj);
      n.pid = nav.pid;
    }
    barr.push({ name: '首页', url: '/' });
    return barr.reverse();
  }
  // 获取子栏目包括本栏目
  async getSubClassifyIds(pid, ids = []) {
    ids.push(Number(pid));
    const items = await this.ctx.model.CmsClassify.findAll({ where: { pid } });
    for (const v of items) {
      await this.getSubClassifyIds(v.id, ids);
    }
    return ids;
  }
  // 获取分类
  async info(id) {
    const breadcrumb = [];
    if (!id) return breadcrumb;
    const n = await this.ctx.model.CmsClassify.findOne({ where: { id: { [Op.eq]: id } } });
    if (!n) return breadcrumb;
    breadcrumb.push(n.title);
    while (n.pid !== 0) {
      const nav = await this.ctx.model.CmsClassify.findOne({ where: { id: { [Op.eq]: n.pid } } });
      breadcrumb.push(nav.title);
      n.pid = nav.pid;
    }
    const pathTitle = breadcrumb.reverse().join('/');
    return { pathTitle };
  }
  getUrl(url) {
    const { ctx } = this;
    let pageUrl = url;
    if (pageUrl) {
      let prefix = '?';
      const querys = [];
      for (const name in ctx.query) {
        if (name === 'orderby') {
          continue;
        }
        querys.push(ctx.helper.escapeHtml(name) + '=' + ctx.helper.escapeHtml(ctx.query[name]));
      }
      prefix += querys.join('&');
      if (querys.length) {
        prefix += '&';
      }
      pageUrl += prefix + 'orderby=__ORDER__';
    }
    return pageUrl;
  }
}
module.exports = classifyService;
