
'use strict';
module.exports = {
  CmsCommentsReply: {
  async cms_comments(root, params, ctx) {
    const map = {};
    map.where = { id: root.comments_id };
    return await ctx.connector.cms_comments.findOne(map);
  },
 
  async mc_member(root, params, ctx) {
    const map = {};
    map.where = { uuid: root.member_uuid };
    return await ctx.connector.mc_member.findOne(map);
  },
 },
    
  Query: {
    async CmsCommentsReply_findAll(_root, params, ctx) {
      return await ctx.connector.cms_comments_reply.findAll(params);
    },
    async CmsCommentsReply_findByPk(_root, params, ctx) {
      return await ctx.connector.cms_comments_reply.findByPk(params);
    },
    async CmsCommentsReply_findOne(_root, params, ctx) {
      return await ctx.connector.cms_comments_reply.findOne(params);
    },
    async CmsCommentsReply_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.cms_comments_reply.findAndCountAll(params);
    },
  },
  Mutation: {
    async CmsCommentsReply_create(_root, params, ctx) {
      return await ctx.connector.cms_comments_reply.create(params);
    },
    async CmsCommentsReply_destroy(_root, params, ctx) {
      return await ctx.connector.cms_comments_reply.destroy(params);
    },
    async CmsCommentsReply_update(_root, params, ctx) {
      return await ctx.connector.cms_comments_reply.update(params);
    },
  },
};
