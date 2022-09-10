
'use strict';
module.exports = {
  CmsDoc: {
  async cms_doc_article(root, params, ctx) {
    const map = {};
    map.where = { doc_id: root.id };
    return await ctx.connector.cms_doc_article.findOne(map);
  },

  async cms_doc_download(root, params, ctx) {
    const map = {};
    map.where = { doc_id: root.id };
    return await ctx.connector.cms_doc_download.findOne(map);
  },

  async cms_doc_picture(root, params, ctx) {
    const map = {};
    map.where = { doc_id: root.id };
    return await ctx.connector.cms_doc_picture.findOne(map);
  },

  async cms_classify(root, params, ctx) {
    const map = {};
    map.where = { id: root.classify_id };
    return await ctx.connector.cms_classify.findOne(map);
  },
 
  async sys_user(root, params, ctx) {
    const map = {};
    map.where = { uuid: root.user_uuid };
    return await ctx.connector.sys_user.findOne(map);
  },
 },
    
  Query: {
    async CmsDoc_findAll(_root, params, ctx) {
      return await ctx.connector.cms_doc.findAll(params);
    },
    async CmsDoc_findByPk(_root, params, ctx) {
      return await ctx.connector.cms_doc.findByPk(params);
    },
    async CmsDoc_findOne(_root, params, ctx) {
      return await ctx.connector.cms_doc.findOne(params);
    },
    async CmsDoc_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.cms_doc.findAndCountAll(params);
    },
  },
  Mutation: {
    async CmsDoc_create(_root, params, ctx) {
      return await ctx.connector.cms_doc.create(params);
    },
    async CmsDoc_destroy(_root, params, ctx) {
      return await ctx.connector.cms_doc.destroy(params);
    },
    async CmsDoc_update(_root, params, ctx) {
      return await ctx.connector.cms_doc.update(params);
    },
  },
};
