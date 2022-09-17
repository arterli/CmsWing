'use strict';
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');
// cms web前台
class WebController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.app.nunjucks.addFilter('@cms_list', async (m, callback) => {
      // console.log(m);
      const user = await ctx.model.SysUser.findOne();
      // console.log(user);
      const html = await ctx.renderString('<h1>hi, {{ user.username }}</h1>', { user });
      callback(null, html);
    }, true);
    // 系统导航标签 {{'sys'|@navigation}}
    this.app.nunjucks.addFilter('@navigation', async (m, callback) => {
      // console.log(m);
      // if (m !== 'sys') return [];
      const map = {};
      map.order = [[ 'sort', 'ASC' ], [ 'id', 'ASC' ]];
      map.where = {};
      map.status = true;
      const list = (await ctx.model.SysNavigation.findAll(map)).map(item => item.toJSON());
      const tree = ctx.helper.arr_to_tree(list, 0);
      callback(null, tree);
    }, true);
  }
  // 首页
  async index() {
    const { ctx } = this;
    await ctx.render('cms/index_index.njk');
  }
  // 列表
  async list() {
    const { ctx } = this;
    const { id } = ctx.params;
    const query = ctx.query;
    const isnum = ctx.helper.isStringNumber(id);
    const idKey = isnum ? 'id' : 'name';
    const classify = await ctx.model.CmsClassify.findOne({ where: { [idKey]: { [Op.eq]: id } } });
    const models = await ctx.model.SysModels.findOne({ where: { uuid: classify.models_uuid } });
    const map = {};
    const page = query.page || 1;
    const limit = 10;
    map.offset = (Number(page) - 1) * limit;
    map.limit = Number(limit);
    map.order = [[ 'level', 'DESC' ], [ 'id', 'DESC' ]];
    map.where = {};
    map.where.status = true;
    const ids = await ctx.service.cms.classify.getSubClassifyIds(classify.id);
    map.where.classify_id = { [Op.in]: ids };
    const list = await ctx.model.CmsDoc.findAndCountAll(map);
    const pagination = ctx.service.sys.pagination.pagination(list, { limit });
    console.log(pagination);
    for (const v of list.rows) {
      v.pathTitle = (await ctx.service.cms.classify.info(v.classify_id)).pathTitle;
    }
    let temp;
    if (models.name === 'cms_doc_article') {
      temp = 'cms/list_article.njk';
    } else if (models.name === 'cms_doc_picture') {
      temp = 'cms/list_picture.njk';
    } else if (models.name === 'cms_doc_download') {
      temp = 'cms/list_download.njk';
    }
    await ctx.render(temp, { list, pagination, classify });
  }
  // 详情
  async details() {
    const { ctx } = this;
    const { id } = ctx.params;
    if (!id) return this.notFound();
    const map = {};
    map.include = [{
      model: ctx.model.CmsClassify,
    }];
    map.where = {};
    map.where.id = { [Op.eq]: id };
    const info = await ctx.model.CmsDoc.findOne(map);
    if (!info) return this.notFound();
    const models = await ctx.model.SysModels.findOne({ where: { uuid: info.models_uuid } });
    const className = ctx.helper._.upperFirst(ctx.helper._.camelCase(models.name));
    info[models.name] = await ctx.model[className].findOne({ where: { doc_id: info.id } });
    // console.log(info);
    let temp;
    if (models.name === 'cms_doc_article') {
      temp = 'cms/details_article.njk';
    } else if (models.name === 'cms_doc_picture') {
      temp = 'cms/details_picture.njk';
    } else if (models.name === 'cms_doc_download') {
      temp = 'cms/details_download.njk';
    }
    await ctx.render(temp, { details: info });
  }

}
module.exports = WebController;
