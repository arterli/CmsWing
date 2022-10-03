
'use strict';
module.exports = {
  CmsTemplateList: {
  async cms_template(root, params, ctx) {
    const map = {};
    map.where = { uuid: root.template_uuid };
    return await ctx.connector.cms_template.findOne(map);
  },
 },
    
  Query: {
    async CmsTemplateList_findAll(_root, params, ctx) {
      return await ctx.connector.cms_template_list.findAll(params);
    },
    async CmsTemplateList_findByPk(_root, params, ctx) {
      return await ctx.connector.cms_template_list.findByPk(params);
    },
    async CmsTemplateList_findOne(_root, params, ctx) {
      return await ctx.connector.cms_template_list.findOne(params);
    },
    async CmsTemplateList_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.cms_template_list.findAndCountAll(params);
    },
  },
  Mutation: {
    async CmsTemplateList_create(_root, params, ctx) {
      return await ctx.connector.cms_template_list.create(params);
    },
    async CmsTemplateList_destroy(_root, params, ctx) {
      return await ctx.connector.cms_template_list.destroy(params);
    },
    async CmsTemplateList_update(_root, params, ctx) {
      return await ctx.connector.cms_template_list.update(params);
    },
  },
};
