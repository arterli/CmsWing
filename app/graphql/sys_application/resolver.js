
'use strict';
module.exports = {
  
  Query: {
    async SysApplication_findAll(_root, params, ctx) {
      return await ctx.connector.sys_application.findAll(params);
    },
    async SysApplication_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_application.findByPk(params);
    },
    async SysApplication_findOne(_root, params, ctx) {
      return await ctx.connector.sys_application.findOne(params);
    },
    async SysApplication_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_application.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysApplication_create(_root, params, ctx) {
      return await ctx.connector.sys_application.create(params);
    },
    async SysApplication_destroy(_root, params, ctx) {
      return await ctx.connector.sys_application.destroy(params);
    },
    async SysApplication_update(_root, params, ctx) {
      return await ctx.connector.sys_application.update(params);
    },
  },
};
