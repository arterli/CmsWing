
'use strict';
module.exports = {
  CmsDocArticle: {
  async cms_doc(root, params, ctx) {
    const map = {};
    map.where = { id: root.doc_id };
    return await ctx.connector.cms_doc.findOne(map);
  },
 },
    
  Query: {
    async CmsDocArticle_findAll(_root, params, ctx) {
      return await ctx.connector.cms_doc_article.findAll(params);
    },
    async CmsDocArticle_findByPk(_root, params, ctx) {
      return await ctx.connector.cms_doc_article.findByPk(params);
    },
    async CmsDocArticle_findOne(_root, params, ctx) {
      return await ctx.connector.cms_doc_article.findOne(params);
    },
    async CmsDocArticle_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.cms_doc_article.findAndCountAll(params);
    },
  },
  Mutation: {
    async CmsDocArticle_create(_root, params, ctx) {
      return await ctx.connector.cms_doc_article.create(params);
    },
    async CmsDocArticle_destroy(_root, params, ctx) {
      return await ctx.connector.cms_doc_article.destroy(params);
    },
    async CmsDocArticle_update(_root, params, ctx) {
      return await ctx.connector.cms_doc_article.update(params);
    },
  },
};
