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
  }
  // 首页
  async index() {
    const { ctx } = this;

    await ctx.render('cms/index_index.njk');
  }
  // 列表
  async list() {
    const { ctx } = this;
    ctx.body = '列表';
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
    map.where.id = id;
    const info = await ctx.model.CmsDoc.findOne(map);
    if (!info) return this.notFound();
    const models = await ctx.model.SysModels.findOne({ where: { uuid: info.models_uuid } });
    const className = ctx.helper._.upperFirst(ctx.helper._.camelCase(models.name));
    info[models.name] = await ctx.model[className].findOne({ where: { doc_id: info.id } });
    console.log(info);
    await ctx.render('cms/index_details.njk', { details: info });
  }

}
module.exports = WebController;
