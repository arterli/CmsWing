
'use strict';
module.exports = {
  
  Query: {
    async SysConfig_findAll(_root, params, ctx) {
      return await ctx.connector.sys_config.findAll(params);
    },
    async SysConfig_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_config.findByPk(params);
    },
    async SysConfig_findOne(_root, params, ctx) {
      return await ctx.connector.sys_config.findOne(params);
    },
    async SysConfig_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_config.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysConfig_create(_root, params, ctx) {
      return await ctx.connector.sys_config.create(params);
    },
    async SysConfig_destroy(_root, params, ctx) {
      return await ctx.connector.sys_config.destroy(params);
    },
    async SysConfig_update(_root, params, ctx) {
      return await ctx.connector.sys_config.update(params);
    },
  },
};
