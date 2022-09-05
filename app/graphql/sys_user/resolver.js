
'use strict';
module.exports = {
  
  Query: {
    async SysUser_findAll(_root, params, ctx) {
      return await ctx.connector.sys_user.findAll(params);
    },
    async SysUser_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_user.findByPk(params);
    },
    async SysUser_findOne(_root, params, ctx) {
      return await ctx.connector.sys_user.findOne(params);
    },
    async SysUser_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_user.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysUser_create(_root, params, ctx) {
      return await ctx.connector.sys_user.create(params);
    },
    async SysUser_destroy(_root, params, ctx) {
      return await ctx.connector.sys_user.destroy(params);
    },
    async SysUser_update(_root, params, ctx) {
      return await ctx.connector.sys_user.update(params);
    },
  },
};
