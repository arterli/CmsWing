
'use strict';
module.exports = {
  
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
