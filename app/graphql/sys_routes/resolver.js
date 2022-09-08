
'use strict';
module.exports = {
  SysRoutes: {
  async sys_routes_classify(root, params, ctx) {
    const map = {};
    map.where = { uuid: root.class_uuid };
    return await ctx.connector.sys_routes_classify.findOne(map);
  },
 },
    
  Query: {
    async SysRoutes_findAll(_root, params, ctx) {
      return await ctx.connector.sys_routes.findAll(params);
    },
    async SysRoutes_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_routes.findByPk(params);
    },
    async SysRoutes_findOne(_root, params, ctx) {
      return await ctx.connector.sys_routes.findOne(params);
    },
    async SysRoutes_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_routes.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysRoutes_create(_root, params, ctx) {
      return await ctx.connector.sys_routes.create(params);
    },
    async SysRoutes_destroy(_root, params, ctx) {
      return await ctx.connector.sys_routes.destroy(params);
    },
    async SysRoutes_update(_root, params, ctx) {
      return await ctx.connector.sys_routes.update(params);
    },
  },
};
