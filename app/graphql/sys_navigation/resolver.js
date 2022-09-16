
'use strict';
module.exports = {
  
  Query: {
    async SysNavigation_findAll(_root, params, ctx) {
      return await ctx.connector.sys_navigation.findAll(params);
    },
    async SysNavigation_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_navigation.findByPk(params);
    },
    async SysNavigation_findOne(_root, params, ctx) {
      return await ctx.connector.sys_navigation.findOne(params);
    },
    async SysNavigation_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_navigation.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysNavigation_create(_root, params, ctx) {
      return await ctx.connector.sys_navigation.create(params);
    },
    async SysNavigation_destroy(_root, params, ctx) {
      return await ctx.connector.sys_navigation.destroy(params);
    },
    async SysNavigation_update(_root, params, ctx) {
      return await ctx.connector.sys_navigation.update(params);
    },
  },
};
