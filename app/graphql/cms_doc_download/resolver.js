
'use strict';
module.exports = {
  CmsDocDownload: {
  async cms_doc(root, params, ctx) {
    const map = {};
    map.where = { id: root.doc_id };
    return await ctx.connector.cms_doc.findOne(map);
  },
 },
    
  Query: {
    async CmsDocDownload_findAll(_root, params, ctx) {
      return await ctx.connector.cms_doc_download.findAll(params);
    },
    async CmsDocDownload_findByPk(_root, params, ctx) {
      return await ctx.connector.cms_doc_download.findByPk(params);
    },
    async CmsDocDownload_findOne(_root, params, ctx) {
      return await ctx.connector.cms_doc_download.findOne(params);
    },
    async CmsDocDownload_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.cms_doc_download.findAndCountAll(params);
    },
  },
  Mutation: {
    async CmsDocDownload_create(_root, params, ctx) {
      return await ctx.connector.cms_doc_download.create(params);
    },
    async CmsDocDownload_destroy(_root, params, ctx) {
      return await ctx.connector.cms_doc_download.destroy(params);
    },
    async CmsDocDownload_update(_root, params, ctx) {
      return await ctx.connector.cms_doc_download.update(params);
    },
  },
};
