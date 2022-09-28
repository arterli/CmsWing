
'use strict';
module.exports = {
  CmsComments: {
  async cms_comments_reply(root, params, ctx) {
    const map = {};
    map.where = { comments_id: root.id };
    if (Object.hasOwnProperty.call(params, 'limit')) {
      map.limit = params.limit;
    }
    if (Object.hasOwnProperty.call(params, 'offset')) {
      map.offset = params.offset;
    }
    if (Object.hasOwnProperty.call(params, 'order')) {
      map.order = params.order;
    }
    return await ctx.connector.cms_comments_reply.findAll(map);
  },

  async mc_member(root, params, ctx) {
    const map = {};
    map.where = { uuid: root.member_uuid };
    return await ctx.connector.mc_member.findOne(map);
  },
 
  async cms_doc(root, params, ctx) {
    const map = {};
    map.where = { id: root.doc_id };
    return await ctx.connector.cms_doc.findOne(map);
  },
 },
    
  Query: {
    async CmsComments_findAll(_root, params, ctx) {
      return await ctx.connector.cms_comments.findAll(params);
    },
    async CmsComments_findByPk(_root, params, ctx) {
      return await ctx.connector.cms_comments.findByPk(params);
    },
    async CmsComments_findOne(_root, params, ctx) {
      return await ctx.connector.cms_comments.findOne(params);
    },
    async CmsComments_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.cms_comments.findAndCountAll(params);
    },
  },
  Mutation: {
    async CmsComments_create(_root, params, ctx) {
      return await ctx.connector.cms_comments.create(params);
    },
    async CmsComments_destroy(_root, params, ctx) {
      return await ctx.connector.cms_comments.destroy(params);
    },
    async CmsComments_update(_root, params, ctx) {
      return await ctx.connector.cms_comments.update(params);
    },
  },
};
