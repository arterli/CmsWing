
'use strict';
module.exports = {
  CmsClassify: {
  async cms_doc(root, params, ctx) {
    const map = {};
    map.where = { classify_id: root.id };
    if (Object.hasOwnProperty.call(params, 'limit')) {
      map.limit = params.limit;
    }
    if (Object.hasOwnProperty.call(params, 'offset')) {
      map.offset = params.offset;
    }
    if (Object.hasOwnProperty.call(params, 'order')) {
      map.order = params.order;
    }
    return await ctx.connector.cms_doc.findAll(map);
  },
},
    
  Query: {
    async CmsClassify_findAll(_root, params, ctx) {
      return await ctx.connector.cms_classify.findAll(params);
    },
    async CmsClassify_findByPk(_root, params, ctx) {
      return await ctx.connector.cms_classify.findByPk(params);
    },
    async CmsClassify_findOne(_root, params, ctx) {
      return await ctx.connector.cms_classify.findOne(params);
    },
    async CmsClassify_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.cms_classify.findAndCountAll(params);
    },
  },
  Mutation: {
    async CmsClassify_create(_root, params, ctx) {
      return await ctx.connector.cms_classify.create(params);
    },
    async CmsClassify_destroy(_root, params, ctx) {
      return await ctx.connector.cms_classify.destroy(params);
    },
    async CmsClassify_update(_root, params, ctx) {
      return await ctx.connector.cms_classify.update(params);
    },
  },
};
