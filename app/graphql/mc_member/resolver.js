
'use strict';
module.exports = {
  McMember: {
  async cms_comments(root, params, ctx) {
    const map = {};
    map.where = { member_uuid: root.uuid };
    if (Object.hasOwnProperty.call(params, 'limit')) {
      map.limit = params.limit;
    }
    if (Object.hasOwnProperty.call(params, 'offset')) {
      map.offset = params.offset;
    }
    if (Object.hasOwnProperty.call(params, 'order')) {
      map.order = params.order;
    }
    return await ctx.connector.cms_comments.findAll(map);
  },

  async cms_comments_reply(root, params, ctx) {
    const map = {};
    map.where = { member_uuid: root.uuid };
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
},
    
  Query: {
    async McMember_findAll(_root, params, ctx) {
      return await ctx.connector.mc_member.findAll(params);
    },
    async McMember_findByPk(_root, params, ctx) {
      return await ctx.connector.mc_member.findByPk(params);
    },
    async McMember_findOne(_root, params, ctx) {
      return await ctx.connector.mc_member.findOne(params);
    },
    async McMember_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.mc_member.findAndCountAll(params);
    },
  },
  Mutation: {
    async McMember_create(_root, params, ctx) {
      return await ctx.connector.mc_member.create(params);
    },
    async McMember_destroy(_root, params, ctx) {
      return await ctx.connector.mc_member.destroy(params);
    },
    async McMember_update(_root, params, ctx) {
      return await ctx.connector.mc_member.update(params);
    },
  },
};
