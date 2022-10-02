
'use strict';
module.exports = {
  
  Query: {
    async CmsTemplate_findAll(_root, params, ctx) {
      return await ctx.connector.cms_template.findAll(params);
    },
    async CmsTemplate_findByPk(_root, params, ctx) {
      return await ctx.connector.cms_template.findByPk(params);
    },
    async CmsTemplate_findOne(_root, params, ctx) {
      return await ctx.connector.cms_template.findOne(params);
    },
    async CmsTemplate_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.cms_template.findAndCountAll(params);
    },
  },
  Mutation: {
    async CmsTemplate_create(_root, params, ctx) {
      return await ctx.connector.cms_template.create(params);
    },
    async CmsTemplate_destroy(_root, params, ctx) {
      return await ctx.connector.cms_template.destroy(params);
    },
    async CmsTemplate_update(_root, params, ctx) {
      return await ctx.connector.cms_template.update(params);
    },
  },
};
