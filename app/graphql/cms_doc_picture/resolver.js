
'use strict';
module.exports = {
  CmsDocPicture: {
  async cms_doc(root, params, ctx) {
    const map = {};
    map.where = { id: root.doc_id };
    return await ctx.connector.cms_doc.findOne(map);
  },
 },
    
  Query: {
    async CmsDocPicture_findAll(_root, params, ctx) {
      return await ctx.connector.cms_doc_picture.findAll(params);
    },
    async CmsDocPicture_findByPk(_root, params, ctx) {
      return await ctx.connector.cms_doc_picture.findByPk(params);
    },
    async CmsDocPicture_findOne(_root, params, ctx) {
      return await ctx.connector.cms_doc_picture.findOne(params);
    },
    async CmsDocPicture_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.cms_doc_picture.findAndCountAll(params);
    },
  },
  Mutation: {
    async CmsDocPicture_create(_root, params, ctx) {
      return await ctx.connector.cms_doc_picture.create(params);
    },
    async CmsDocPicture_destroy(_root, params, ctx) {
      return await ctx.connector.cms_doc_picture.destroy(params);
    },
    async CmsDocPicture_update(_root, params, ctx) {
      return await ctx.connector.cms_doc_picture.update(params);
    },
  },
};
