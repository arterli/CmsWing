
'use strict';
module.exports = {
  
  Query: {
    async SysOpenApi_findAll(_root, params, ctx) {
      return await ctx.connector.sys_openApi.findAll(params);
    },
    async SysOpenApi_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_openApi.findByPk(params);
    },
    async SysOpenApi_findOne(_root, params, ctx) {
      return await ctx.connector.sys_openApi.findOne(params);
    },
    async SysOpenApi_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_openApi.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysOpenApi_create(_root, params, ctx) {
      return await ctx.connector.sys_openApi.create(params);
    },
    async SysOpenApi_destroy(_root, params, ctx) {
      return await ctx.connector.sys_openApi.destroy(params);
    },
    async SysOpenApi_update(_root, params, ctx) {
      return await ctx.connector.sys_openApi.update(params);
    },
  },
};
